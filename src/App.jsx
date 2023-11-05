import { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import ImageGrid from './components/ImageGrid';
import './App.css'

function App() {

  let [results, setResults] = useState({});
  // let [page, setPage] = useState(0);
  let [pageNum, setPageNum] = useState(1);
  let [perPage, setPerPage] = useState(15);
  let [search, setSearch] = useState('nature');
  let [error, setError] = useState(null);

  const controllerRef = useRef();
  
  useEffect(() => {
    loadImages();
  }, [pageNum, search]) 

  
  const loadImages = (e) => {
    // console.log('Click...');
    // console.log(e.target);
  
    if(controllerRef.current) {
      controllerRef.current.abort();
    }
    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;
    
    let url = `https://api.pexels.com/v1/search?query=${search}&page=${pageNum}&per_page=${perPage}`;
    let headers = {
      "content-type": "application/json",
      "Authorization": import.meta.env.VITE_IMAGE_API
    }
    
    axios.get(url, { headers, signal })
        .then(res => {
          console.log("Response: ", res);
          console.log("Data: ", res.data);
          setResults(res.data);
        })
        .catch(err => {
          console.log(err);
          setError(err);
        })
  }
  
  const prevPage = (e) => {
    // console.log(e.target);
    if(pageNum !== 1) {
      setPageNum(prev => prev - 1);
    }
  }
  
  const nextPage = (e) => {
    // console.log(e.target);
    setPageNum(prev => prev + 1);
  }

  const handleChange = (e) => {
    // console.log(e.target.value);
    setSearch(e.target.value);
  }

  return (
    <>
      <div>
        <h1>Infinite Scroll Image Search</h1>
        <form >
          <label htmlFor="search">Searching for: </label>
          <input type="text" id="search" name="search" onChange={handleChange}/>
        </form>
        <button onClick={prevPage}>Previous</button>
        <button onClick={loadImages}>Load Images</button>
        <button onClick={nextPage}>Next</button>
        <ImageGrid data={results.photos}/>
      </div>
    </>
  )
}

export default App
