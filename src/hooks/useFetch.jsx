import { useEffect, useState } from 'react';
import axios from 'axios';

function useFetch(url) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(url)
            .then((response) => {
                setData(response.data);
            })
            .catch(err => {
                console.log(err);
                setError(err);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [url]);

    return { data, loading, error };
}


export default useFetch;