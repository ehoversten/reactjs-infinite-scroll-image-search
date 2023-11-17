import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import ImageCard from './ImageCard';

function GridContainer() {

    // -- Initalize State
    let [search, setSearch] = useState('');
    let [results, setResults] = useState(null);
    let [photoArr, setPhotoArr] = useState([]);
    let [pageNum, setPageNum] = useState(1);
    let [perPage, setPerPage] = useState(15);
    let [hasMore, setHasMore] = useState(true);
    let [nextUrlPage, setNextUrlPage] = useState('');
    let [isLoading, setIsLoading] = useState(false)
    let [error, setError] = useState(null);

    let [prevSearches, setPrevSeaches] = useState([]);

    // - Initalize References
    const observer = useRef();
    const lastElementRef = useCallback(node => {
        if(isLoading) return;
        if(observer.current) {
            observer.current.disconnect();  
            console.log('disconnecting...')
        }
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore) {
                console.log('is Visible');
                setPageNum(prev => {
                    console.log("Prev Value: ", prev)
                    return prev + 1;
                });
            }
        })
        if(node) {
            observer.current.observe(node);
        }
   
    }, [isLoading, hasMore]);

    useEffect(() => {
        console.log("render");
        if(search !== '') {
            loadImages();
        }
        let searchStorage = localStorage.getItem('search-terms');
        if(searchStorage) setPrevSeaches(JSON.parse(searchStorage));
        // Run Cleanup functionality
        return () => {
            console.log('App Cleanup')
            // if(controllerRef.current) {
            //     controllerRef.current.about();
            //     console.log('controller cancelled');
            // }
        }
    }, [pageNum])

    // ** Eventually move this to another file ** //
    const loadImages = async () => {
        setIsLoading(true);
        let url;
        console.log('Page Num: ', pageNum);
        // if(nextUrlPage !== '') {
        //     url = nextUrlPage;
        // } else {
        //     url = `https://api.pexels.com/v1/search?query=${search}&page=${pageNum}&per_page=${perPage}`;
        // }
        url = `https://api.pexels.com/v1/search?query=${search}&page=${pageNum}&per_page=${perPage}`;
        const headers = {
          "content-type": "application/json",
          "Authorization": import.meta.env.VITE_IMAGE_API
        }
        try {
            let res = await axios.get(url, { headers })
            console.log("Data: ", res);
            setResults(res.data);
            setNextUrlPage(res.data.next_page);
            setPhotoArr(prev => [...prev, ...res.data.photos])
            setIsLoading(false);
        } catch(err) {
            console.log("Error: ", err);        
            setIsLoading(false);
            setError({ msg: err });
        }
    }

    const prevPage = (e) => {
        // console.log(e.target);
        if(pageNum !== 1) {
          setPageNum(prev => prev - 1);
          loadImages();
        }
      }
      
      const nextPage = (e) => {
        // console.log(e.target);
        setPageNum(prev => {
            console.log("Prev Value: ", prev)
            return prev + 1;
        });
        // setTimeout(loadImages, 1000);
        loadImages();
      }

      const handleChange = (e) => {
        // console.log(e.target.value);
        setSearch(e.target.value);
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        let savedSearches;
        localStorage.getItem('search-terms') ? savedSearches = JSON.parse(localStorage.getItem('search-terms')) :  savedSearches = [];
        savedSearches.push(search);
        console.log('Local Storage: ', savedSearches)
        localStorage.setItem('search-terms', JSON.stringify(savedSearches));
        setPrevSeaches(savedSearches);
        loadImages();
      }

      const handlePrevSearch = (e) => {
        // console.log("Event: ", e.target);
        console.log("Value: ", e.target.textContent);

      }

      const clearSearch = () => {
        setSearch('');
        setPageNum(1);
        setNextUrlPage('')
        setResults(null);
        setPhotoArr([]);
      }

      // --> QUESTION --> What happens when we run out of results(?)

  return (
    <div>
        <h1>Infinite Scroll Image Search</h1>

        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="search">Searching for: </label>
                <input type="text" id="search" name="search" onChange={handleChange} value={search}/>
                <button type="submit">Find</button>
            </form>
        </div>

        <div className="btn-container">
            <button onClick={clearSearch}>Clear Search</button>
            <button onClick={prevPage}>Previous</button> 
            <button onClick={nextPage}>Next</button>
        </div>
      
        { error && <h2>Error: {error.msg}</h2>}
        { isLoading && <div>Loading...</div>}

        { prevSearches && prevSearches.map((text, index) => {
            return (
                <button className="prev-search" key={index} onClick={handlePrevSearch}>{text}</button>
            )
        }) }

        { photoArr && photoArr.map((photo, index) => {
            if(photoArr.length === index + 1) {
                return (
                    <div className="card-wrapper" ref={lastElementRef} key={index}>
                        <ImageCard data={photo} key={photo.id}/>
                    </div>
                ) 
            } else {
                return <ImageCard data={photo} key={index}/>
            }
        })}
    
    </div>
  )
}

export default GridContainer