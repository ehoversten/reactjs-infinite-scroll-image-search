import React, { useState } from 'react'
import ImageCard from './ImageCard'

function ImageGrid({ data }) {

    let [imageData, setImageData] = useState(data)

  return (
    <div className='image-grid'>
        { imageData.map((data) => (
            <ImageCard data={data} />
        )) }
    </div>
  )
}

export default ImageGrid