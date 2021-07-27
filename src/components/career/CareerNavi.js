import React from 'react';
import { Menu } from 'antd';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router'

function CareerNavi() {
  return (
    <div className="Career">
      <Menu
        className="Career-Menu"
        defaultSelectedKeys={['1']}
      >
        <Menu.Item key="1" >

          <Link to="/취창업공간">
            커리어 후기
          </Link>
        </Menu.Item>
        <Menu.Item key="2" >
          <Link to="/취창업공간/question">
            커리어 질문
          </Link>
        </Menu.Item>
        {/*       <Menu.Item key="3" >

      <Link to="/career/careerInterview">
        인터뷰
        </Link>
      </Menu.Item> */}

      </Menu>
    </div>
  );




}

export default withRouter(CareerNavi);