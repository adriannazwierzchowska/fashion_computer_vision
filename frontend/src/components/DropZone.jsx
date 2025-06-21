import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

function DropZone({ setState }) {
  const onDrop = useCallback(acceptedFiles => {
    setState(acceptedFiles[0])
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: {'image/*': []}
  });

  return (
    <div {...getRootProps()} className={isDragActive ? 'active' : ""}>
      <input {...getInputProps()} />
      {
        isDragActive
          ? <p>Drop the file here ...</p>
          : <p>Drag 'n' drop an image here—or click to select file</p>
      }
    </div>
  );
}

export default DropZone;