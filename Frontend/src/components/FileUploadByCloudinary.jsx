import React, { useState } from "react";
import axios from "axios";

function FileUploadByCloudinary() {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0); // State for progress percentage

  const uploadImageToCloudinary = async (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "CleanMyStreet");
    formData.append("cloud_name", "dlbnvaqmm");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dlbnvaqmm/image/upload",
        formData,
        {
          onUploadProgress: (event) => {
            const percentCompleted = Math.round(
              (event.loaded * 100) / event.total
            );
            setProgress(percentCompleted); // Update progress state
          },
        }
      );
      console.log("Image URL:", response.data.url);
      setImage(response.data.url);
      setProgress(0); // Reset progress after upload is complete
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleImageUpload = (event) => {
    const imageFile = event.target.files[0];
    uploadImageToCloudinary(imageFile);
  };

  return (
    <div className="upload-container" style={{ maxWidth: "300px", margin: "0 auto", textAlign: "center" }}>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {progress > 0 && (
        <div style={{ margin: "10px 0" }}>
          <div
            style={{
              height: "10px",
              background: "#ddd",
              borderRadius: "5px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "#4caf50",
                transition: "width 0.3s ease",
              }}
            ></div>
          </div>
          <p style={{ marginTop: "5px" }}>{progress}%</p>
        </div>
      )}
      {image && <img src={image} alt="Uploaded" style={{ marginTop: "10px", maxWidth: "100%" }} />}
    </div>
  );
}

export default FileUploadByCloudinary;
