import React, { useState, useRef } from "react";
import { IconButton, Typography, Button, Box, Grid } from '@mui/material';
import {
    FileUploadContainer,
    FormField,
    DragDropText,
    UploadFileBtn,
    FilePreviewContainer,
    ImagePreview,
    PreviewContainer,
    PreviewList,
    FileMetaData,
    RemoveFileIcon,
    InputLabel
} from "./styles";

import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/Upload';

const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 5000000;
const KILO_BYTES_PER_BYTE = 1000;

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

const FileUpload = ({
    label,
    updateFilesCb = () => {},
    maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
    setFieldValue,
    values,
    element,
    ...otherProps
}) => {
    const fileInputField = useRef(null);
    const [files, setFiles] = useState(element || {});
    const handleUploadBtnClick = () => {
        fileInputField.current.click();
    };

    const addNewFiles = (newFiles) => {
        for (let file of newFiles) {
            if (file.size <= maxFileSizeInBytes) {
                if (!otherProps.multiple) {
                    return { file };
                }
                files[file.name] = file;
            }
        }
        return { ...files };
    };

    const removeFile = (fileName) => {
        delete files[fileName];
        setFiles({ ...files });
        callUpdateFilesCb({ ...files });
    };

    const convertNestedObjectToArray = (nestedObj) =>
        Object.keys(nestedObj).map((key) => nestedObj[key]);

    const callUpdateFilesCb = (files) => {
        const filesAsArray = convertNestedObjectToArray(files);
        setFieldValue(otherProps.name, filesAsArray);
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

    return (
        <Box {...(!otherProps.multiple ? { sx: { display: 'flex', gap: 5, my: 2 } } : { my: 2 })}>
            <FileUploadContainer>
                <Typography
                    component='label'
                    variant='h5'
                    sx={{
                        position: 'absolute',
                        left: 0,
                        top: '-22px'
                    }}
                >
                    {label}
                </Typography>
                <Typography component='p' sx={{ fontWeight: 'bold', py: 1 }}>Плъзнете и пуснете вашите файлове или</Typography>
                {/* <DragDropText>Drag and drop your files anywhere or</DragDropText> */}
                {/* <UploadFileBtn type="button" onClick={handleUploadBtnClick}>
                    <i className="fas fa-file-upload" />
                    <span> Upload {otherProps.multiple ? "files" : "a file"}</span>
                </UploadFileBtn> */}

                <Button
                    variant="outlined"
                    type="button"
                    startIcon={<UploadIcon />}
                    size='large'
                    sx={{ zIndex: 1 }}
                    onClick={handleUploadBtnClick}
                >
                    {otherProps.multiple ? 'Качи файлове' : 'Качи файл'}
                </Button>

                <FormField
                    type="file"
                    ref={fileInputField}
                    onChange={handleNewFileUpload}
                    title=""
                    value=""
                    {...otherProps}
                />
            </FileUploadContainer>

            {otherProps.multiple ? (
                <FilePreviewContainer>
                    <Typography component='span'>За качване</Typography>

                    <Grid container spacing={1} sx={{ maxWidth: '1570px' }}>
                        {Object.keys(files).map((fileName, index) => {
                            let file = files[fileName];
                            let isImageFile = file.type.split("/")[0] === "image";
                            return (
                                <Grid
                                    item
                                    sm={12} md={6} lg={3}
                                    key={fileName}
                                >
                                    <PreviewContainer>
                                        <div>
                                            {isImageFile && (
                                                <ImagePreview
                                                    src={URL.createObjectURL(file)}
                                                    alt={`file preview ${index}`}
                                                />
                                            )}
                                            <FileMetaData isImageFile={isImageFile}>
                                                <span>{file.name}</span>
                                                <aside>
                                                    <span>{convertBytesToKB(file.size)} kb</span>
                                                    <IconButton sx={{ p: 0 }} onClick={() => removeFile(fileName)}>
                                                        <DeleteIcon color='error' />
                                                    </IconButton>
                                                </aside>
                                            </FileMetaData>
                                        </div>
                                    </PreviewContainer>
                                </Grid>
                            );
                        })}
                    </Grid>
                </FilePreviewContainer>
            ) : (
                <FilePreviewContainer>
                    <Typography component='span'>За качване</Typography>

                    {Object.keys(files).map((fileName, index) => {
                        let file = files[fileName];
                        let isImageFile = file.type.split("/")[0] === "image";
                        return (

                            <PreviewContainer key={index}>
                                <div>
                                    {isImageFile && (
                                        <ImagePreview
                                            src={URL.createObjectURL(file)}
                                            alt={`file preview ${index}`}
                                        />
                                    )}
                                    <FileMetaData isImageFile={isImageFile}>
                                        <span>{file.name}</span>
                                        <aside>
                                            <span>{convertBytesToKB(file.size)} kb</span>
                                            <IconButton sx={{ p: 0 }} onClick={() => removeFile(fileName)}>
                                                <DeleteIcon color='error' />
                                            </IconButton>
                                        </aside>
                                    </FileMetaData>
                                </div>
                            </PreviewContainer>
                        );
                    })}
                </FilePreviewContainer>
            )}

        </Box>
    );
}

export default FileUpload;