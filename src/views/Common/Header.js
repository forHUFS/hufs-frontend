import React, { useEffect, useState } from 'react';
import logo from '../../image/logo.png';
// import mainboo from '../../banner/mainboo.png';
import { Menu, Dropdown, Button, Space, Input, message } from 'antd';
import { Redirect, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import SignUp from '../../components/login/SignUp';
import Logout from '../../components/login/Logout';
import Cookies from 'js-cookie';
import axios from 'axios';
import { PUBLIC_IP } from '../../config';
import HeaderMenu from '../../components/menubox/HeaderMenu';
const { Search } = Input;

function Header(props) {
  const [login, setLogin] = useState(false);
  useEffect(async () => {
    await axios
      .get(`${PUBLIC_IP}/user`)
      .then((response) => {
        setLogin(true);
      })
      .catch((error) => {
        setLogin(false);
      });
  }, []);

  return <HeaderMenu setLogin={setLogin} login={login} />;
}

export default withRouter(Header);
