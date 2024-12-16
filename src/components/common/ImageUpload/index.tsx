import { useRef } from "react";
import { Frame } from "@/atoms";
import Image from "next/image";

interface ImageUploadProps {
  imageUrl: string;
  onImageChange: (file: File) => void;
}

const ImageUpload = ({ imageUrl, onImageChange }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageChange(file);
    }
  };

  return (
    <Frame
      w={120}
      h={120}
      radius={60}
      bg="#E8ECF2"
      alignment="center"
      onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: "none" }}
      />
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Profile"
          width={120}
          height={120}
          style={{ objectFit: "cover" }}
        />
      ) : (
        "업로드"
      )}
    </Frame>
  );
};

export default ImageUpload;
