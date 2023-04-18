import React, { useState, useRef } from "react";
import { IconButton, Typography, Box, Grid } from '@mui/material';
import {
    FilePreviewContainer,
    ImagePreview,
    PreviewContainer,
    FileMetaData
} from "./styles";

import DownloadIcon from '@mui/icons-material/Download';

const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 5000000;
const KILO_BYTES_PER_BYTE = 1000;

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

const FileDownload = ({
    label,
    maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
    setFieldValue,
    values,
    element,
    ...otherProps
}) => {
    const [files, setFiles] = useState(element || {});
    const ref = useRef(null);

    const downloadFile = (file, fileName) => {
        ref.current?.click();
    }

    return (
        <Box>
            <Typography
                variant='h5'
                color="textPrimary"
                sx={{ py: 1 }}
            >
                {label}
            </Typography>

            <FilePreviewContainer>
                <Grid container spacing={1} sx={{ maxWidth: '1570px' }}>
                    {Object.keys(files).map((fileName, index) => {
                        let fileObj = files[fileName];
                        const file = fileObj.file || fileObj;
                        let isImageFile = file.type.split("/")[0] === "image";
                        const url = fileObj.url || URL.createObjectURL(file);

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
                                                <IconButton sx={{ p: 0 }} onClick={() => downloadFile(file, fileName)}>
                                                    <DownloadIcon color='black' />
                                                </IconButton>
                                            </aside>
                                            <a href={url} download={name} className="hidden" target='_blank' ref={ref}/>
                                        </FileMetaData>
                                    </div>
                                </PreviewContainer>
                            </Grid>
                        );
                    })}
                </Grid>
            </FilePreviewContainer>
        </Box>
    );
}

export default FileDownload;