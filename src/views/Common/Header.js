import React, { useEffect, useState } from 'react';
import logo from '../../image/logo.png';
// import mainboo from '../../banner/mainboo.png';
import { Menu, Dropdown, Button, Space, Input, message } from 'antd';
import { Redirect, withRouter } from 'react-router';
import HeaderMenu from '../../components/menubox/HeaderMenu';
const { Search } = Input;

function Header(props) {
  const [login, setLogin] = useState(false);

  return <HeaderMenu setLogin={setLogin} login={login} />;
}

export default withRouter(Header);
