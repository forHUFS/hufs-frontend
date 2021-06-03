import axios from 'axios';
import React,{useState} from 'react';
import useSWR from 'swr';
import { PUBLIC_IP } from '../config';



function useStoreReview (rstrnId) {
   /*  const fetcher = async(url) => {
        const resp = await axios.get(url).then(response => response.data);

    }
     */

    const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState([]); // result
  const [items,setItems] = useState([]); // item

    const fetcher = (url) =>
    axios
      .get(url).then((response) => {
      if (response.status === 200) {
        let result = response.payload.reverse();
        setPosts(result.slice(0,5))
        result = result.slice(5)
        //setPosts(response.payload.reverse());
        setItems(result)
        setLoading(false);
      }
      })
      .catch((error) => {
        switch (error.response?.status) {
          case 401:
            //message.error('로그인하지 않은 사용자');
            //history.push('/');
            break;
          case 403:

            //message.error('접근 권한 오류');
            //history.push('/');
            break;
          default:
            break;
        }
      });

    const { data, error } = useSWR(`${PUBLIC_IP}/store/${rstrnId}/review`, fetcher)
    let preResult = data;

    if (data !== undefined) {
        preResult = data.reverse();
    
              setPosts(preResult.slice(0,5))
              preResult = preResult.slice(5)
              //setPosts(response.payload.reverse());
              setItems(preResult)

    }
    setPosts(preResult)
          setItems(preResult)

    
          setLoading(false);
  
    return {

        data : preResult,
      posts: posts,
      items: items,
      loading: loading,
      isError: error
    }
  }

  export default useStoreReview;