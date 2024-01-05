import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone'
import { ImageForms } from "Components/UI/ImageForms";
import imageDefault from "Assets/imageupload.png"
import css from './dropzone.css';


type FileWithDataURL = {
  file: File;
  dataURL: string;

};

type DropzoneProps = {
  onFileUpload: (fileWithDataURL: FileWithDataURL) => void;
  currentImage?: string,
  name?: string,
  
}

export function Dropzone({ onFileUpload, currentImage }: DropzoneProps) {
  const [preview, setPreview] = useState("");
  const [showDefaultImage, setShowDefaultImage] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (currentImage) {
      setPreview("")
      setShowDefaultImage(false)
    } else {

      setShowDefaultImage(true);
    }
  }, [currentImage,]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': []
    },
    maxFiles: 1,
    onDrop: (files: File[]) => {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const dataURL = event.target.result as string;
        const filePreview = URL.createObjectURL(file);
        setPreview(filePreview);
        setShowDefaultImage(false);
        onFileUpload({ file, dataURL });
        setSelectedFile(file);
      };

      reader.readAsDataURL(file);
    },
  });

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {currentImage ? (
          <ImageForms src={currentImage} />
        ) : showDefaultImage ? (
          <ImageForms src={imageDefault} />
        ) : (
          <ImageForms src={preview} />
        )
        }
      </div>
    </div>
  );
}

