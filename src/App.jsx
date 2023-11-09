import { useState, useEffect, useRef, Suspense, useCallback } from 'react'
import axios from 'axios';
import ImageGrid from './components/ImageGrid';
import GridContainer from './components/GridContainer';
import './App.css'

function App() {

  let [results, setResults] = useState({});
  let [imagesArr, setImagesArr] = useState([]);
  // let [page, setPage] = useState(0);
  let [pageNum, setPageNum] = useState(1);
  let [perPage, setPerPage] = useState(15);
  let [hasMore, setHasMore] = useState(false);
  let [search, setSearch] = useState('birds');
  let [loading, setLoading] = useState(true)
  // let [loading, setLoading] = useState(false)
  let [error, setError] = useState(null);

  // const controllerRef = useRef();
  // const observer = useRef();
  // const lastItemRef = useCallback(node => {

  // });
  
  useEffect(() => {
    // setLoading(true);
    // loadImages();
    return () => {
      console.log('App cleanup')
      // if(controllerRef.current) {
      //   console.log('controller cancelling')
      //   controllerRef.current.abort();
      // }
      // setLoading(false);
    }
  }, [pageNum, search]) 

  
  const loadImages = (e) => {
    // console.log('Click...');
    // console.log(e.target);
  
    // if(controllerRef.current) {
    //   controllerRef.current.abort();
    // }
    // controllerRef.current = new AbortController();
    // const signal = controllerRef.current.signal;
    
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
          setImagesArr(prev => [...prev, res.data.photos])
          setHasMore(res.data.photos.length > 0);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          // if(controllerRef.current) {
          //   console.log("signal aborted...");
          //   controllerRef.current.abort();
          //   return
          // }
          if(err.code !== "ERR_CANCELED") {
            console.log("Error: ", err);
            setLoading(false);
            setError(err.message);
          } 
          // setLoading(false);
          // setError(err.message);
        });
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
        {/* <h1>Infinite Scroll Image Search</h1>
        <form >
          <label htmlFor="search">Searching for: </label>
          <input type="text" id="search" name="search" onChange={handleChange}/>
        </form>
        <button onClick={prevPage}>Previous</button>
        <button onClick={loadImages}>Load Images</button>
        <button onClick={nextPage}>Next</button>
        { error ? (<div>Error : {error}</div>) : null }
        { loading ? (<div>Loading ...</div>) :  
          <ImageGrid photos={imagesArr}/>
        } */}
        {/* <Suspense fallback={<div>Loading ...</div>}>
          <ImageGrid photos={results.photos}/>
        </Suspense> */}
        <GridContainer />
      </div>
    </>
  )
}

export default App
