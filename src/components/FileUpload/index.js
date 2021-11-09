import React, { useRef, useState, useEffect } from "react";
import UploadImage from '../../assets/img/admin/image_upload.png'
import UploadVideo from '../../assets/img/admin/video_upload.png'
import {
  FileUploadContainer,
  FormField,
  DragDropText,
  Description,
  UploadFileBtn,
  FilePreviewContainer,
  ImagePreview,
  PreviewContainer,
  PreviewList,
  FileMetaData,
  RemoveFileIcon,
  NoImage,
  InputLabel,
  VideoPreview,
} from "./files.styles";

const KILO_BYTES_PER_BYTE = 1000;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;

const convertNestedObjectToArray = (nestedObj) =>
  Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

const FileUpload = ({
  label,
  updateFilesCb,
  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
  ...otherProps
}) => {

  const getUrlExtension = (url) => {
    return url
      .split(/[#?]/)[0]
      .split(".")
      .pop()
      .trim();
  }

  const onImageEdit = async (imgUrl) => {
    var imgExt = getUrlExtension(imgUrl);

    const response = await fetch(imgUrl);
    const blob = await response.blob();
    const file = new File([blob], "Logo" + imgExt, {
      type: blob.type,
    });
    return file;
  }
  useEffect(() => {
    let data = {};
    (async () => {
      if (otherProps.data) {
        if (typeof otherProps.data === 'string') {
          console.log('new', otherProps.data)
          let temp = await onImageEdit(otherProps.data)
          data[temp.name] = temp
          setFiles(data)
        } else {
          data[otherProps.data.name] = otherProps.data
          setFiles(data)
        }
      }
    })()
    return () => {
      console.log('data', data)
    }
  }, [otherProps.data])
  const fileInputField = useRef(null);
  const [files, setFiles] = useState({});

  const handleUploadBtnClick = () => {
    fileInputField.current.click();
  };

  const addNewFiles = (newFiles) => {
    for (let file of newFiles) {
      if (file.size < maxFileSizeInBytes) {
        if (!otherProps.multiple) {
          return { file };
        }
        files[file.name] = file;
      }
    }
    return { ...files };
  };

  const callUpdateFilesCb = (files) => {
    const filesAsArray = convertNestedObjectToArray(files);
    updateFilesCb(filesAsArray);
  };

  const handleNewFileUpload = (e) => {
    const { files: newFiles } = e.target;
    if (newFiles.length) {
      let updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);
      callUpdateFilesCb(updatedFiles);
    }
  };

  const removeFile = (fileName) => {
    delete files[fileName];
    setFiles({ ...files });
    callUpdateFilesCb({ ...files });
  };

  return (
    <React.Fragment>
      {(Object.keys(files).length === 0 && typeof files !== 'string') ? <FileUploadContainer accept={otherProps.accept}>
        {otherProps.description && <Description>{otherProps.description}</Description>}
        <NoImage src={otherProps.accept === 'image' ? UploadImage : UploadVideo} alt="upload" />
        <DragDropText>{label}</DragDropText>
        <FormField
          type="file"
          ref={fileInputField}
          onChange={handleNewFileUpload}
          title=""
          value=""
          {...otherProps}
        />
      </FileUploadContainer>
        : <FilePreviewContainer>
          <PreviewList>
            {Object.keys(files).map((fileName, index) => {
              let file = files[fileName];
              let isImageFile = file.type.split("/")[0] === "image";
              let isVideoFile = file.type.split("/")[0] === "video";
              return (
                <PreviewContainer key={fileName}>
                  <div>
                    {isImageFile && (
                      <ImagePreview
                        src={URL.createObjectURL(file)}
                        alt={`file preview ${index}`}
                      />
                    )}
                    {isVideoFile && (
                      <VideoPreview autoPlay='autoplay' muted loop>
                        <source src={URL.createObjectURL(file)} type={file.type} />
                      </VideoPreview>
                    )}
                    <FileMetaData isImageFile={isImageFile || isVideoFile}>
                      <span>{file.name}</span>
                      <aside>
                        <span>{convertBytesToKB(file.size)} kb</span>
                        <span onClick={() => removeFile(fileName)}>
                          <RemoveFileIcon
                            className="fas fa-trash-alt"
                          />
                        </span>
                      </aside>
                    </FileMetaData>
                  </div>
                </PreviewContainer>
              );
            })}
          </PreviewList>
        </FilePreviewContainer>}
    </React.Fragment>
  );
};

export default FileUpload;