import React from 'react'

function ImageCard({ data }) {
  return (
    <div className='ImageCard'>
        <div className="card-header">
            <h2>{data.photographer}</h2>
        </div>
        <div className="card-content">
            <img src={data.src.medium} alt="" />
        </div>
    </div>
  )
}

export default ImageCard