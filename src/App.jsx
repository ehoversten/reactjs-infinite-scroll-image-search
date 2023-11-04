import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'

function App() {

  let [results, setResults] = useState({});
  // let [page, setPage] = useState(0);
  let [pageNum, setPageNum] = useState(1);
  let [perPage, setPerPage] = useState(15);
  let [search, setSearch] = useState('nature');
  
  useEffect(() => {
    loadImages();
  }, [pageNum]) 
  
  const loadImages = (e) => {
    console.log('Click...');
    // console.log(e.target);
    
    let url = `https://api.pexels.com/v1/search?query=${search}&page=${pageNum}&per_page=${perPage}`;
    let headers = {
      "content-type": "application/json",
      "Authorization": import.meta.env.VITE_IMAGE_API
    }
    // let url = `https://api.pexels.com/v1/search`
    
    axios.get(url, { headers })
        .then(res => {
          console.log("Response: ", res);
          console.log("Data: ", res.data);
          setResults(res.data);
        })
        .catch(err => {
          console.log(err);
        })
  }
  
  const prevPage = (e) => {
    console.log(e.target);
    if(pageNum !== 1) {
      setPageNum(prev => prev - 1);
    }
    // loadImages();
  }
  
  const nextPage = (e) => {
    console.log(e.target);
    setPageNum(prev => prev + 1);
    // loadImages();
  }
  

  return (
    <>
      <div>
        <h1>Vite + React</h1>
        <button onClick={prevPage}>Previous</button>
        <button onClick={loadImages}>Load Images</button>
        <button onClick={nextPage}>Next</button>
      </div>
    </>
  )
}

export default App
