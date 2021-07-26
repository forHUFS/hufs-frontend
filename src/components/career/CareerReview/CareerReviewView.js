import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { PUBLIC_IP } from '../../../config';
import mdata from '../data/mock-data.json';
import {PageHeader} from 'antd';
import useResponsive from '../../../hooks/useResponsive'

function CareerReviewView(props) {
    const {id} = props.match.params;
    const { isMobile, Default, Mobile } = useResponsive();

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
        <Mobile>
         <PageHeader
        title={'후기'}
      />
        <div className='Career-View' style = {{marginTop:"-900px", width:"500px"}}>
          {data 
          ? <div>

              <div className='top_title'>
                <input type='text' id='title_txt' name='title' defaultValue={data.title} readOnly/>

                <div className='date_div'>
                  {data.createdAt}
                </div>
              </div>
              
              <div>
                <div id='content_txt' name='contents' dangerouslySetInnerHTML = {{ __html: data.content }} readOnly></div>
              </div>
            </div>
          : null}
        </div>
        </Mobile>
        <Default>
        <PageHeader
        title={'후기'}
      />
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
                <div id='content_txt' name='contents' dangerouslySetInnerHTML = {{ __html: data.content }} readOnly></div>
              </div>
            </div>
          : null}
        </div>
        </Default>
        </>
    )
}

export default CareerReviewView;