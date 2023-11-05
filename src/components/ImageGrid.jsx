import React, { useState, useEffect } from 'react'
import ImageCard from './ImageCard'

function ImageGrid({ data }) {

    useEffect(() => {
        setImageData(data)
    }, [data])

    let [imageData, setImageData] = useState([])

  return (
    <div className='image-grid'>
        { imageData.map((data) => (
            <ImageCard data={data} />
        )) }
    </div>
  )
}

export default ImageGrid