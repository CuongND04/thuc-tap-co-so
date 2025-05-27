import React from "react";

const UserInfoCard = ({ userProfile }) => {
  return (
    <div>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Thông tin cá nhân
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              {/* <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  First Name
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  Musharof
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Last Name
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  Chowdhury
                </p>
              </div> */}

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Địa chỉ email
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {userProfile?.email}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Số điện thoại
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  +{userProfile?.soDienThoai}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Địa chỉ
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {userProfile?.diaChi}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Quyền truy cập
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  Quản trị viên
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;
