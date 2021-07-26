import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import { PUBLIC_IP } from '../../../config';
import mdata from '../data/mock-data.json'
import CheckBox from './CheckBox';
import { Button, PageHeader, message}  from 'antd';
import MaterialTable from "material-table";
import useResponsive from '../../../hooks/useResponsive'
import {
  careerList,
  postRemove,
} from '../../../_actions/reviewPost_action'
import { useDispatch } from 'react-redux';


function CareerReview({history,match}) {
  console.log(match.params.id)
  const dispatch = useDispatch();
  //const [user1, setUser1] = useState([]); // result

 /*  useEffect(() => {
    dispatch(careerList("careerReview"))
      .then((response) => {
        if (response.status === 200) {
          let result = response.payload.reverse();
        setUser1(result.data);

        }
      })
      .catch((error) => {
        switch (error.response?.status) {
          case 401:
            message.error('로그인하지 않은 사용자');
            history.push('/');
            break;
          case 403:

            message.error('접근 권한 오류');
            history.push('/');
            break;
          default:
            break;
        }
      });

  }, []) */
  const mData = mdata.data;
  const { isMobile, Default, Mobile } = useResponsive();
  const [dataList, setDataList] = useState(mData);
  const [filtering, setFiltering] = useState({
      header:[],
  })
  const columns = [
    
    {
      title: "번호", field: "id", headerStyle: {
        color : '#030a66',fontWeight: 'bold'
      }
  },
    {
      title: "분야", field:"header",  headerStyle: {
        color : '#030a66',fontWeight: 'bold'
      }
    },
    {
        title: "제목", field: "title", render: rowData => <Link to={`/board/취창업공간/view/${rowData.id}`}>{rowData.title}</Link>,
        headerStyle: {
          color : '#030a66',fontWeight: 'bold'
        }
    },
    {
        title: "작성자", field: "User.nickname", headerStyle: {
          color : '#030a66',fontWeight: 'bold'
        }
    },
    {
        title: "작성일", field: "createdAt", render: rowData => <div>{rowData.createdAt
          ? rowData.createdAt.slice(0, 10)
          : 'none'}</div>,
          headerStyle: {
            color : '#030a66',fontWeight: 'bold'
          }
    }
];

const handleFilters = (filters, category) => {
  const newFilters = {...filtering}
  newFilters[category] = filters
  if(category === "age") {

  }
  if(category === "header") {
      showFilterResults(newFilters)
      setFiltering(newFilters)
  }
}

const showFilterResults = (filters) => {
  console.log(filters.header.length)
  if(filters.header.length === 0) {
      setDataList(mData)
  } else {
      const filteredResult = Array.from(mData).filter((mData)=>{
          return filters.header.indexOf(mData.header) !== -1
      })
      setDataList(filteredResult);
  }
}


if (isMobile) {
  const columnsMobile = [
    
    {
      title: "분야", field:"header",  headerStyle: {
        color : '#030a66',fontWeight: 'bold', paddingLeft:"20%"
      }
    },
  
    
    {
        title: "제목", field: "title", render: rowData => <Link to={`/board/취창업공간/view/${rowData.id}`}>{rowData.title}</Link>,
        headerStyle: {
          color : '#030a66',fontWeight: 'bold'
        },
        cellStyle : {
          wordBreak : 'break-word'
        }
    },
  ];

return (
  <>
            <div  >
            <PageHeader
        title={'후기'}
      /></div> 
   <CheckBox
                handleFilters = {filters => handleFilters(filters, "header")}
            /><div>
      
      <MaterialTable

          columns={columnsMobile}
          data={dataList}
          options={{
            showTitle: false,
            minBodyHeight:'300px'
       }}
       style={{
        marginTop:'50px',
        height:'500px',
        width:'450px',
        right:'200px',
        marginLeft:'220px'
      
       }}
     >
       
     </MaterialTable>
     </div>
     <div> <Button
      style={{  marginTop: 20, marginLeft: 180 }}
      onClick = {()=>{
        history.push({
          pathname: `${match.params.id}/write`,
          state: { detail: match.params.id },
        });
      }}
    >
 글 작성
    </Button></div> 
            </>
)

} 



  
   
    
/*     

    const _getListData = async function() {
        const data_list = await axios(`${PUBLIC_IP}/board/careerReview`, {
          method : 'GET',
          headers: new Headers()
        })
    
        setList(data_list);
        
      console.log(data_list)
      } */
  
        return (
            <>
             <div>
               
             <PageHeader
                  title={'후기'}
                />
                 <Button
          style={{  marginLeft: '70%', marginTop: 20 }}
          onClick = {()=>{
            history.push({
              pathname: `${match.params.id}/write`,
              state: { detail: match.params.title },
            });
          }}
        >
     글 작성
        </Button>
                
                </div>
            <CheckBox
                handleFilters = {filters => handleFilters(filters, "header")}
            />
            <div>
           
            <MaterialTable

                columns={columns}
                data={dataList}
                options={{
                  showTitle: false,
                  minBodyHeight:'500px'
             }}
             style={{
              marginTop:'30px',
              marginLeft: '180px',
              marginRight: '20px',
              height:'500px',
              width:'800px'
             }}
           >
             
           </MaterialTable>
           </div>           
           {/*  <PageHeader
        title={'후기'}
      />
      
      <CheckBox
                
                handleFilters = {filters => handleFilters(filters, "header")}
            />
       <MaterialTable
                columns={columns}
                data={userList}
            />
            <Button
          style={{  marginLeft: '70%', marginTop: 20 }}
        >
           <Link to="/career/write">
        글 작성
        </Link>
        </Button> */}
            {/* <div className='List'>
      
              <div className='list_grid list_tit'>
                <div> 번호 </div>
                <div> 제목 </div>
                <div> 작성자 </div>
                <div className='acenter'> 작성일 </div>
              </div>
      
                {userList ? userList.map( (el, key) => {
                  return(
                    <div className='list_grid list_data' key={key}>
                      <div> {el.id}</div>
                      <div> <Link to ={`/career/view/${el.id}`}>{el.title} </Link></div>
                      <div> {el.User.nickname}</div>
                      <div className='acenter'> {el.createdAt
                                ? el.createdAt.slice(0, 10)
                                : 'none'} </div>
                    </div>
                  )
                })
                  : null }
            </div> */}
            </>
      
      
      
      )
    

}

export default CareerReview;