import { useState } from 'react'
import '../css/App.css'
import DropZone from '../components/DropZone'
import { API_URL } from '../config';


function Homepage() {
    const [image, setImage] = useState(null)
    const [processedImageUrl, setProcessedImageUrl] = useState(null)
    const [detectedLabels, setDetectedLabels] = useState([])

    const handleUpload = async () => {
        if (!image) return

        const formData = new FormData()
        formData.append('image', image)

        try {
          const response = await fetch(`${API_URL}/api/upload/`, {
            method: 'POST',
            body: formData,
          })

          const data = await response.json()
          console.log('Upload success:', data)
          console.log('Detected:', data.labels)

          setDetectedLabels(data.labels)
          setProcessedImageUrl(data.output_image)
        } catch (error) {
          console.error('Upload error:', error)
        }
    }


    return (
        <>
          <h1>DRESSCODE.AI</h1>
          <div className="dropzone">
              <DropZone setState={setImage}/>
              <button onClick={handleUpload}>Upload</button>
          </div>
          {processedImageUrl && <img src={processedImageUrl} alt="Processed" />}
            {detectedLabels.length > 0 && (
              <ul>
                {detectedLabels.map((label, index) => (
                  <li key={index}>{label}</li>
                ))}
              </ul>
            )}
        </>
    )
}

export default Homepage
