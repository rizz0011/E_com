import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function ImageUpload({formData, setFormData}) {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files).map((i) =>  URL.createObjectURL(i));
    setFormData({...formData, ImgUrls: [...formData?.ImgUrls, ...files]});
  };

  console.log(formData)

  return (
    <div>
      <label htmlFor="upload-button">
        <VisuallyHiddenInput
          id="upload-button"
          type="file"
          multiple
          onChange={handleFileChange}
        />
        <Button variant="contained" component="span" startIcon={<CloudUploadIcon />}>
          Upload Images
        </Button>
      </label>


      
      {formData?.ImgUrls?.length > 0 && (
        <div>
          <h4>Selected Images:</h4>
          <div style={{width:'100px', height:'100px', display:'flex',}}>
            {formData?.ImgUrls?.map((file, index) => (
              <img style={{height:'100%', width:'100%', marginLeft:'5px'}} key={index} src={file}/>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
