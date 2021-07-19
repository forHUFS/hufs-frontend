import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { PUBLIC_IP } from '../../../config';
import mdata from '../data/mock-data.json'

function CareerReviewView(props) {
    const {id} = props.match.params;

    const [data,setData] = useState(mdata.data);

    useEffect(() => {
        for (var i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                setData(mdata.data[i]);
            }
          }
        
    }, [])





    /* const _getData = async function(){
        const board_id = props.match.params.data;

        const getData = await axios(`${PUBLIC_IP}/post/${board_id}`,{
            method:'GET',
            headers:new Headers(),
            data:{id:board_id}
        });
    } */
    return (
        <>
        <div className='Career-View'>
          {data 
          ? <div>

              <div className='top_title'>
                <input type='text' id='title_txt' name='title' defaultValue={data.title} readOnly/>

                <div className='date_div'>
                  {data.createdAt}
                </div>
              </div>
              
              <div>
                <textarea id='content_txt' name='contents' defaultValue={data.content} readOnly></textarea>
              </div>
            </div>
          : null}
        </div>
        </>
    )
}

export default CareerReviewView;