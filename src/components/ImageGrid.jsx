import React, { useState, useEffect, Suspense, useRef, useCallback } from 'react'
import ImageCard from './ImageCard'

function ImageGrid({ photos }) {

  // const observer = useRef();
  // const lastItemRef = useCallback(node => {
  //   console.log(node);
  // });

    // useEffect(() => {
    //     setImageData(data);
    //     return () => {
    //         console.log('Grid cleanup')
    //       }
    // }, [data])

    // let [imageData, setImageData] = useState([])

  return (
    <div className='image-grid'>

        {/* { photos.map((data, index) => {
          if(photos.length === index + 1) {
            return <ImageCard data={data} key={data.id} ref={lastItemRef}/>
          } else {
            return <ImageCard data={data} key={data.id}/>
          }

        })} */}
    
        { /* (data.length > 0) ? */ photos.map((data, index) => {
            return <ImageCard data={data} key={data.id}/>
        }
        ) /* : null */}
    </div>
  )
}

export default ImageGrid