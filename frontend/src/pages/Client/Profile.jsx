import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { Loader } from "lucide-react";
import UserMetaCard from "../../components/Admin/UserMetaCard";
import UserInfoCard from "../../components/Admin/UserInfoCard";

const Profile = () => {
  const { getProfile, isUpdatingProfile } = useAuthStore();
  const [userProfile, setUserProfile] = useState(null);
  useEffect(() => {
    const fetchProfile = async () => {
      const userProfile = await getProfile();
      setUserProfile(userProfile);
    };
    fetchProfile(); // Gọi hàm async bên trong useEffect
  }, [isUpdatingProfile]);
  console.log("userProfile: ", userProfile);
  if (isUpdatingProfile) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  return (
    <div>
      <div className="wrap-bread-crumb">
        <div className="container">
          <div className="bread-crumb">
            <a href="">Trang chủ</a>
            <span className="">Trang cá nhân</span>
          </div>
          <div className="bg-white p-4 rounded-xl mb-10 space-y-6 mt-5">
            <UserMetaCard userProfile={userProfile} />
            <UserInfoCard userProfile={userProfile} />
            {/* <UserAddressCard userProfile={userProfile} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
