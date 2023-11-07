import React, { useState, useEffect, Suspense } from 'react'
import ImageCard from './ImageCard'

function ImageGrid({ photos }) {

    // useEffect(() => {
    //     setImageData(data);
    //     return () => {
    //         console.log('Grid cleanup')
    //       }
    // }, [data])

    // let [imageData, setImageData] = useState([])

  return (
    <div className='image-grid'>
        { /* (data.length > 0) ? */ photos.map((data) => (
            <ImageCard data={data} key={data.id}/>
        )) /* : null */}
    </div>
  )
}

export default ImageGrid