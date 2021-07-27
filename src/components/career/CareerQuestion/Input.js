import React,{useState,useEffect} from 'react';
import { Divider,PageHeader,message, Input } from 'antd';

function InputBox({state,setState}) {

    return (
        <>
        <div className="Career-Write">
          <Input id="title_txt" name="title" value={state.title} onChange={(e) => {
            setState({...state,title: e.target.value });
          }} placeholder="제목" />
          
        </div></>

    )

}

export default InputBox;