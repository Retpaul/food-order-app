import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  const res = await fetch(url, config);
  const resData = await res.json();

  if (!res.ok) {
    throw new Error(
      resData.message || "Something went wrong , sending request failed"
    );
  }
  return resData;
}

export default function useHttp(url,config,initialData) {
  const [error, setError] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();

  const sendRequest = useCallback(async function sendRequest(data) {
    setIsLoading(true);
    try {
      const resData = await sendHttpRequest(url,{...config,body:data});
      setData(resData);
    } catch (error) {
      setError(error.message || "Something went Wrong");
    }
    setIsLoading(false);
  }, [url,config]);

  useEffect(() => {
    if(config && ( config.method === 'GET'|| !config.method|| !config)){
       sendRequest(); 
    }
    
  }, [sendRequest]);
  return {
    data,
    isLoading,
    error,
    sendRequest
  };
}
