import React from "react";
import { useModal } from "../../hooks/useModal";

import { Modal, Form, Input, Button } from "antd";
import UserMetaCard from "../../components/Admin/UserMetaCard";
import UserInfoCard from "../../components/Admin/UserInfoCard";
import UserAddressCard from "../../components/Admin/UserAddressCard";
const UserProfile = () => {
  return (
    <div className="bg-white p-4 rounded-xl mb-10 space-y-6">
      <UserMetaCard />
      <UserInfoCard />
      <UserAddressCard />
    </div>
  );
};

export default UserProfile;
