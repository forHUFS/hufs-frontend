import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Button, Space, Input, message, Drawer } from 'antd';
import logo from '../../image/logo.png';
import SignUp from '../../components/login/SignUp';
import Logout from '../../components/login/Logout';
import useResponsive from '../../hooks/useResponsive';
import { MenuOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
function HeaderMenu({ setLogin, login }) {
  const { Mobile, Default } = useResponsive();
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const menu1 = (
    <Menu>
      <Menu.Item>
        <Link to="/board/자유공간" onClick={onClose}>
          자유 공간
        </Link>
      </Menu.Item>
    </Menu>
  );
  const menu2 = (
    <Menu>
      <Menu.Item>
        <Link to="/scholarship" onClick={onClose}>
          장학 공간
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/major" onClick={onClose}>
          과별 공간
        </Link>
      </Menu.Item>
    </Menu>
  );
  const menu3 = (
    <Menu>
      <Menu.Item>
        <Link to="/학교간Boo" onClick={onClose}>
          맛집 공간
        </Link>
        {/* <Link to="/3">주거 공간</Link> */}
      </Menu.Item>
    </Menu>
  );
  const menu4 = (
    <Menu>
      <Menu.Item>
        <Link to="/board/졸업생공간" onClick={onClose}>
          졸업생 공간
        </Link>
      </Menu.Item>
    </Menu>
  );
  const menu5 = (
    <Menu>
      <Menu.Item>
        <Link to="/board/진로공간" onClick={onClose}>
          진로 공간
        </Link>
      </Menu.Item>
    </Menu>
  );
  //   const signInCheck = (login) => {
  //     if (login === true) {
  //       return <Logout setLogin={setLogin} />;
  //     } else if (login === false) {
  //       return <SignUp setLogin={setLogin} />;
  //     }
  //   };
  return (
    <>
      <Mobile>
        <div>
          <MenuOutlined
            onClick={showDrawer}
            style={{
              borderRadius: 3,
              fontSize: 24,
              top: 16,
              left: 13,
              position: 'absolute',
            }}
          />
          <Drawer
            bodyStyle={{ paddingLeft: 0 }}
            title="Hufspace"
            placement="left"
            closable={true}
            onClose={onClose}
            visible={visible}
          >
            {login ? (
              <>
                <Logout setLogin={setLogin} />

                <Button type="text">
                  <Link style={{ color: 'rgba(0, 0, 0, 0.85)' }} to="/mypage">
                    My page
                  </Link>{' '}
                </Button>
              </>
            ) : (
              <SignUp setLogin={setLogin} />
            )}
            <Menu
              style={{
                width: 256,
                position: 'relative',
                left: 0,
                top: 50,
                display: 'block',
              }}
              defaultSelectedKeys={['1']}
              // defaultOpenKeys={['sub1']}
              mode="inline"
            >
              <SubMenu key="sub1" title="떠들어 boo">
                {menu1}
              </SubMenu>
              <SubMenu key="sub2" title="학교해 boo">
                {menu2}
              </SubMenu>
              <SubMenu key="sub3" title="학교 간 boo">
                {menu3}
              </SubMenu>{' '}
              <SubMenu key="sub4" title="학교 떠난 boo">
                {menu4}
              </SubMenu>{' '}
              <SubMenu key="sub5" title="정면승 boo">
                {menu5}
              </SubMenu>{' '}
              <SubMenu key="sub6" title="이거 모르면 바boo">
                <Menu.Item key="6">
                  <Link to="/board/제휴공간" onClick={onClose}>
                    제휴 혜택 & 꿀팁
                  </Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Drawer>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link to="/">
              <img src={logo} height={32} style={{ marginTop: 13 }} />
            </Link>
          </div>
        </div>
      </Mobile>
      <Default>
        <div className="Head">
          <div className="Pagename">
            <Link to="/">
              <img src={logo} />
            </Link>
          </div>

          <span className="loginbar">
            <span>
              {login ? (
                <Logout setLogin={setLogin} />
              ) : (
                <SignUp setLogin={setLogin} />
              )}
            </span>
            <span>
              {login ? (
                <Button type="text">
                  <Link style={{ color: 'rgba(0, 0, 0, 0.85)' }} to="/mypage">
                    My page
                  </Link>{' '}
                </Button>
              ) : null}
            </span>
            {/* <Button type="text">언어 선택</Button> */}
          </span>

          <Space direction="vertical">
            <Space id="Menubar">
              <Menu mode="horizontal">
                <Menu.Item key="mail">
                  <Dropdown overlay={menu1}>
                    <Link to="/board/자유공간">떠들어Boo</Link>
                    {/* {statusCheck()} */}
                  </Dropdown>
                </Menu.Item>
                <Menu.Item key="app">
                  <Dropdown overlay={menu2}>
                    <Link to="/scholarship">학교 해Boo</Link>
                  </Dropdown>
                </Menu.Item>
                <Menu.Item>
                  <Dropdown overlay={menu3}>
                    <Link to="/학교간Boo">학교 간 Boo</Link>
                  </Dropdown>
                </Menu.Item>
                <Menu.Item key="setting:4">
                  <Dropdown overlay={menu4}>
                    <Link to="/board/졸업생공간">학교 떠난 Boo</Link>
                  </Dropdown>
                </Menu.Item>
                <Menu.Item key="alipay">
                  <Dropdown overlay={menu5}>
                    <Link to="/board/진로공간">정면승Boo</Link>
                  </Dropdown>
                </Menu.Item>
                <Menu.Item>
                  <Link to="/board/제휴공간">이거 모르면 바Boo</Link>
                </Menu.Item>
              </Menu>
            </Space>
          </Space>
        </div>
      </Default>
    </>
  );
}

export default HeaderMenu;
