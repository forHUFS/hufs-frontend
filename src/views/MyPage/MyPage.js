import React, { useEffect, useState } from 'react';
import { Card, Layout, Menu, message } from 'antd';
import UserScrap from '../../components/user/UserScrap';
import UserComment from '../../components/user/UserComment';
import UserInfo from '../../components/user/UserInfo';
import UserPost from '../../components/user/UserPost';
import UserWithdraw from '../../components/user/UserWithdraw';
import { withRouter } from 'react-router';
import Page404 from '../Page404/Page404';
import Header1 from '../Common/Header';
import styles from '../../css/MyPage.module.css';
import useUserInfo from '../../hooks/useUserInfo';
import Graduate from '../../components/user/Graduate';
import useErrorHandling from '../../hooks/useErrorHandling';
import useResponsive from '../../hooks/useResponsive';

function MyPage(props) {
  const errorHandling = useErrorHandling();
  const { Header, Content, Footer } = Layout;
  const { user, isError, isLoading } = useUserInfo();
  const [click, setClick] = useState('1');
  const { Mobile, Default } = useResponsive();
  const onClick = (event) => {
    setClick(event.key);
  };
  const selectedMenu = () => {
    switch (click) {
      case '1':
        return null;
      case '2':
        return <UserScrap />;
      case '3':
        return <UserPost posts={user.Posts} />;
      case '4':
        return <UserComment replies={user.Replies} />;
      case '5':
        return <UserWithdraw />;
      default:
        return <Page404 />;
    }
  };
  if (isError) {
    return errorHandling(isError.response?.data.message);
  }
  return (
    <>
      <Default>
        <div className={styles.main}>
          <div className={styles.communitymain}>
            <Layout className={styles.layout}>
              {user ? (
                <>
                  <UserInfo user={user} isLoading={isLoading} />
                </>
              ) : null}
              <Graduate />
              <Header>
                <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={[click]}
                >
                  <Menu.Item key="2" onClick={onClick}>
                    나의 스크랩
                  </Menu.Item>
                  <Menu.Item key="3" onClick={onClick}>
                    내가 쓴 글{' '}
                  </Menu.Item>
                  <Menu.Item key="4" onClick={onClick}>
                    내가 쓴 댓글
                  </Menu.Item>
                  <Menu.Item key="5" onClick={onClick}>
                    회원 탈퇴
                  </Menu.Item>
                </Menu>
              </Header>
              <Content style={{ padding: '0 50px', margin: '16px 0' }}>
                {selectedMenu()}
              </Content>
              <Footer
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  border: '1px solid white',
                }}
              >
                HUFSpace_
              </Footer>
            </Layout>
          </div>
        </div>
      </Default>
      <Mobile>
        <UserInfo user={user} isLoading={isLoading} />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[click]}>
          <Menu.Item style={{ width: '25%' }} key="2" onClick={onClick}>
            나의 스크랩
          </Menu.Item>
          <Menu.Item style={{ width: '25%' }} key="3" onClick={onClick}>
            내가 쓴 글{' '}
          </Menu.Item>
          <Menu.Item style={{ width: '25%' }} key="4" onClick={onClick}>
            내가 쓴 댓글
          </Menu.Item>
          <Menu.Item style={{ width: '25%' }} key="5" onClick={onClick}>
            회원 탈퇴
          </Menu.Item>
        </Menu>
        <Content style={{ padding: '0 50px', margin: '16px 0' }}>
          {selectedMenu()}
        </Content>
        <Footer
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            border: '1px solid white',
          }}
        >
          HUFSpace_
        </Footer>
      </Mobile>
    </>
  );
}

export default withRouter(MyPage);
