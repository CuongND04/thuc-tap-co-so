package com.pet.shop.services;

import com.pet.shop.dto.*;
import com.pet.shop.exceptions.AppException;
import com.pet.shop.models.NguoiDung;
import com.pet.shop.repositories.NguoiDungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        // Validate input
        if (request.getTenDangNhap() == null || request.getTenDangNhap().trim().isEmpty()) {
            throw new IllegalArgumentException("Tên đăng nhập không được để trống");
        }
        if (request.getMatKhau() == null || request.getMatKhau().length() < 6) {
            throw new IllegalArgumentException("Mật khẩu phải có ít nhất 6 ký tự");
        }

        // Check if username exists
        Optional<NguoiDung> existing = nguoiDungRepository.findByTenDangNhap(request.getTenDangNhap());
        if (existing.isPresent()) {
            throw new RuntimeException("Tên đăng nhập đã tồn tại");
        }

        // Create new user
        NguoiDung nguoiDung = new NguoiDung();
        nguoiDung.setTenDangNhap(request.getTenDangNhap());
        nguoiDung.setHoTen(request.getHoTen());
        nguoiDung.setSoDienThoai(request.getSoDienThoai());
        nguoiDung.setEmail(request.getEmail());
        nguoiDung.setDiaChi(request.getDiaChi());
        nguoiDung.setQuyenTruyCap(request.getQuyenTruyCap());
        // Set avatar mặc định
        nguoiDung.setAvatar("https://res.cloudinary.com/dc4bgvfbj/image/upload/v1739983784/qtgyxeho0clvujaxxg7h.jpg");


        // Hash password
        String hashedPassword = BCrypt.hashpw(request.getMatKhau(), BCrypt.gensalt());
        nguoiDung.setMatKhau(hashedPassword);

        // Save user
        NguoiDung savedUser = nguoiDungRepository.save(nguoiDung);

        // Return response
        return AuthResponse.builder()
                .tenDangNhap(savedUser.getTenDangNhap())
                .hoTen(savedUser.getHoTen())
                .quyenTruyCap(savedUser.getQuyenTruyCap())
                .build();
    }

    public AuthResponse login(LoginRequest request) {
    //**TODO: đang có một vấn đề khi test postman, các ông bấm login rồi mà bấm login tiếp nó vẫn sẽ thành công
        // và token cũ cũng sẽ vẫn dùng được
        // nhưng cái việc đăng nhập liên tiếp nó chỉ xảy ra trên môi trường test api thôi
        // nên tôi sẽ ưu tiên những việc khác trước




        // Validate input
        if (request.getTenDangNhap() == null || request.getMatKhau() == null) {
            throw new IllegalArgumentException("Tên đăng nhập và mật khẩu không được để trống");
        }

        // Find user
        Optional<NguoiDung> nguoiDungOpt = nguoiDungRepository.findByTenDangNhap(request.getTenDangNhap());
        if (nguoiDungOpt.isEmpty()) {
            throw new RuntimeException("Tên đăng nhập hoặc mật khẩu không đúng");
        }

        NguoiDung nguoiDung = nguoiDungOpt.get();

        // Verify password
        if (!BCrypt.checkpw(request.getMatKhau(), nguoiDung.getMatKhau())) {
            throw new RuntimeException("Tên đăng nhập hoặc mật khẩu không đúng");
        }

        // Return response
        return AuthResponse.builder()
                .tenDangNhap(nguoiDung.getTenDangNhap())
                .hoTen(nguoiDung.getHoTen())
                .quyenTruyCap(nguoiDung.getQuyenTruyCap())
                .build();
    }


    public void changePassword(ChangePasswordRequest request) {

        // chỗ này request người dùng chỉ cần gửi lên mật khẩu thôi, còn tên đăng nhập sẽ lấy sau khi giải mã token

        System.out.println("Request change password: " + request);

        // Lấy thông tin user hiện tại từ context (đã được xác thực)
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AuthResponse user = (AuthResponse) authentication.getPrincipal();
        System.out.println("User hiện tại: " + user);

        // Lấy tên đăng nhập từ token (AuthResponse)
        String tenDangNhap = user.getTenDangNhap();

        // Validate dữ liệu đầu vào (bỏ validate tên đăng nhập trong request vì không cần)
        if (request.getMatKhauCu() == null || request.getMatKhauMoi() == null) {
            throw new IllegalArgumentException("Mật khẩu không được để trống");
        }
        if (request.getMatKhauMoi().length() < 6) {
            throw new IllegalArgumentException("Mật khẩu mới phải có ít nhất 6 ký tự");
        }

        // Kiểm tra user tồn tại dựa trên tên đăng nhập lấy từ token
        NguoiDung nguoiDung = nguoiDungRepository.findByTenDangNhap(tenDangNhap)
                .orElseThrow(() -> new UsernameNotFoundException("Tên đăng nhập không tồn tại"));

        // Kiểm tra mật khẩu cũ đúng
        if (!BCrypt.checkpw(request.getMatKhauCu(), nguoiDung.getMatKhau())) {
            throw new IllegalArgumentException("Mật khẩu cũ không đúng");
        }

        // Mã hóa mật khẩu mới
        String hashedPassword = BCrypt.hashpw(request.getMatKhauMoi(), BCrypt.gensalt());
        nguoiDung.setMatKhau(hashedPassword);

        // Lưu lại mật khẩu mới
        nguoiDungRepository.save(nguoiDung);

        System.out.println("Đổi mật khẩu thành công cho user: " + tenDangNhap);
    }




    @Transactional
    public NguoiDung updateUserInfo(UpdateUserRequest request) {

        // chỗ này request người dùng chỉ cần gửi lên mật khẩu thôi, còn tên đăng nhập sẽ lấy sau khi giải mã token

        System.out.println("UpdateUserRequest: " + request);

        // Lấy thông tin user hiện tại từ context (đã được xác thực)
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AuthResponse user = (AuthResponse) authentication.getPrincipal();
        System.out.println("User hiện tại: " + user);

        // Lấy tên đăng nhập từ token (AuthResponse)
        String tenDangNhap = user.getTenDangNhap();


        // Find user
        Optional<NguoiDung> nguoiDungOpt = nguoiDungRepository.findByTenDangNhap(tenDangNhap);
        if (nguoiDungOpt.isEmpty()) {
            throw new RuntimeException("Tên đăng nhập không tồn tại");
        }

        NguoiDung nguoiDung = nguoiDungOpt.get();

        // Cập nhật thông tin nếu có
        if (request.getHoTen() != null && !request.getHoTen().isBlank()) {
            nguoiDung.setHoTen(request.getHoTen());
        }
        if (request.getSoDienThoai() != null && !request.getSoDienThoai().isBlank()) {
            nguoiDung.setSoDienThoai(request.getSoDienThoai());
        }
        if (request.getEmail() != null && !request.getEmail().isBlank()) {
            nguoiDung.setEmail(request.getEmail());
        }
        if (request.getDiaChi() != null && !request.getDiaChi().isBlank()) {
            nguoiDung.setDiaChi(request.getDiaChi());
        }
        if (request.getAvatar() != null && !request.getAvatar().isBlank()) {
            nguoiDung.setAvatar(request.getAvatar());
        }
        // Save updated user
        NguoiDung updatedUser = nguoiDungRepository.save(nguoiDung);

        // Return response
        return updatedUser;
    }



    public NguoiDung getProfile() {
        // Lấy thông tin user hiện tại từ SecurityContext
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AuthResponse currentUser = (AuthResponse) authentication.getPrincipal();

        // Truy vấn user đầy đủ từ DB theo tên đăng nhập
        return nguoiDungRepository.findByTenDangNhap(currentUser.getTenDangNhap())
                .orElseThrow(() -> new AppException("Người dùng không tồn tại", HttpStatus.NOT_FOUND));
    }

    public AuthResponse findByTenDangNhap(String tenDangNhap) {
        // Tìm người dùng theo tên đăng nhập
        NguoiDung nguoiDung = nguoiDungRepository.findByTenDangNhap(tenDangNhap)
                .orElseThrow(() -> new AppException("Người dùng không tồn tại", HttpStatus.NOT_FOUND));

        // Trả về thông tin AuthResponse (không cần token ở đây)
        return AuthResponse.builder()
                .tenDangNhap(nguoiDung.getTenDangNhap())
                .hoTen(nguoiDung.getHoTen())
                .quyenTruyCap(nguoiDung.getQuyenTruyCap())
                .build();
    }


}

