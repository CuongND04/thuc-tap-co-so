import { CLOUD_NAME, UPLOAD_PRESET } from "../constant/index";

export const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file); // fixed name
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("cloud_name", CLOUD_NAME);
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const uploadedImage = await response.json();
    return uploadedImage;
  } catch (error) {
    console.error("Lỗi khi tải ảnh lên: ", error);
    throw error;
  }
};
