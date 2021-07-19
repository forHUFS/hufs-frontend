import React,{useState} from 'react';
import axios from 'axios';
import { Tabs, Radio } from 'antd';

const { TabPane } = Tabs;


function Category() {

    const [cat, setCat] = useState([]);


    
    return (
        <>
         <div>
     {/*    <Radio.Group style={{ marginBottom: 8 }}>
        </Radio.Group>
        <Tabs defaultActiveKey="1" tabPosition={'top'} style={{ height: 220 }}>
          {[...Array.from({ length: cat.length }, (v, i) => i)].map(i => (
            <TabPane tab={cat[i]} key={i}>
            </TabPane>
          ))}
        </Tabs> */}
      </div>
        </>
    )
}

export default Category;