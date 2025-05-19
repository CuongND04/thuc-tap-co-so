import React, { useEffect, useState } from "react";
import { useModal } from "../../hooks/useModal";
import { Loader } from "lucide-react";
import { Modal, Form, Input, Button } from "antd";
import UserMetaCard from "../../components/Admin/UserMetaCard";
import UserInfoCard from "../../components/Admin/UserInfoCard";
import UserAddressCard from "../../components/Admin/UserAddressCard";
import { useAuthStore } from "../../store/useAuthStore";
const UserProfile = () => {
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
    <div className="bg-white p-4 rounded-xl mb-10 space-y-6">
      <UserMetaCard userProfile={userProfile} />
      <UserInfoCard userProfile={userProfile} />
      {/* <UserAddressCard userProfile={userProfile} /> */}
    </div>
  );
};

export default UserProfile;
