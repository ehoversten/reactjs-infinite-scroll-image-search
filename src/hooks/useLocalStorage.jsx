import { useEffect, useState } from "react";

function getSavedValues(key, initialValue) {
    // JSON.parse is an EXPENSIVE function we only want to call it on the initial render
    const savedValue = JSON.parse(localStorage.getItem(key));
    if(savedValue) return savedValue;
    // If the initialValue is a FUNCTION
    if(initialValue instanceof Function) {
        return initialValue();
    }
    return initialValue;
}

export default function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        return getSavedValues(key, initialValue);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value]); 

    return [value, setValue];
}