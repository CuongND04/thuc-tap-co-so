export function formatValues(values, type) {
  const isPhuKien = type === "PhuKien";

  const formatted = {
    tenSanPham: values.tenSanPham?.toString(),
    hinhAnh: values.hinhAnh,
    moTa: values.moTa?.toString(),
    giaBan: values.giaBan,
    danhMuc: {
      maDanhMuc: values.maDanhMuc,
    },
  };

  if (isPhuKien) {
    formatted.phuKien = {
      soLuongTonKho: values.soLuongTonKho,
    };
  } else {
    formatted.thuCung = {
      gioiTinh: values.gioiTinh,
      tuoi: values.tuoi ? values.tuoi + " tháng" : "Không rõ",
      trangThaiTiem: values.trangThaiTiem?.toString(),
      soLuongTonKho: values.soLuongTonKho,
    };
  }

  return formatted;
}
