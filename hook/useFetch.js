import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);

    const options = {
      method: 'GET',
      url: `https://jsearch.p.rapidapi.com/${endpoint}`, // Use backticks for template literals
      headers: {
        'X-RapidAPI-Key': 'dfdde6ec82msh86fa86c5a0c2359p11aa77jsn25b10ebcc840',
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
      },
      params: { ...query },
    };

    try {
      const response = await axios.request(options);
      setData(response.data.data);
    } catch (error) {
      console.error(error);
      setError(error);
      // You can use the alert function like this:
      // alert('There is an error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
