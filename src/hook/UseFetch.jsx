import { useState, useEffect } from "react";

function UseFetch(url) {
  const [data, setData] = useState(null);
  
  useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(result => setData(result));
    }, [url]);
  
  return data;
}

export default UseFetch;