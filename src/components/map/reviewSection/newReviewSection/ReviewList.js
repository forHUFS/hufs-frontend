import React, { useEffect, useState, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import {
  postList,
  postRemove,
} from '../../../../_actions/reviewPost_action';
import {
  Button,
  List,
  Avatar,
  Rate,
  Layout,
} from 'antd';
import ReviewHead from './ReviewHead'



const { Content } = Layout;
function ReviewList({ match, history }) {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]); // result
  const [items, setItems] = useState([]); // item


  const fetchMoreData = async () => {
    setLoading(true);
    setPosts(posts.concat(items.slice(0, 5)))
    setItems(items.slice(5))
    setLoading(false)
  }

  const infiniteScroll = useCallback(() => {
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    let clientHeight = document.documentElement.clientHeight;
    scrollHeight -= 200;

    if (scrollTop + clientHeight >= scrollHeight && loading === false) {
      fetchMoreData();
    }
  }, [loading]);

  useEffect(() => {
    dispatch(postList(history.location.state.id))
      .then((response) => {
        if (response.status === 200) {
          let result = response.payload.reverse();
          setPosts(result.slice(0, 5))
          result = result.slice(5)
          //setPosts(response.payload.reverse());
          setItems(result)
          setLoading(false);
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

  }, [])


  // `getItems` 가 바뀔 때 마다 함수 실행
  useEffect(() => {
    window.addEventListener('scroll', infiniteScroll, true);
    return () => window.removeEventListener('scroll', infiniteScroll, true)
  }, [infiniteScroll])


  const onDelete = (postId) => {
    const answer = window.confirm('게시글을 삭제하시겠습니까?');

    if (answer) {
      dispatch(postRemove(postId))
        .then((response) => {
          if (response.status === 200) {
            message.success('게시글 삭제가 완료되었습니다.');
            window.location.reload();
            //history.goBack();
          }
        })
        .catch((error) => {
          switch (error.response.status) {
            case 401:
              message.error('로그인하지 않은 사용자');
              history.push('/');
              break;
            case 403:
              message.error('접근 권한 오류');
              break;
            case 404:
              message.error('존재하지 않는 게시글입니다');
              history.push('/');
              break;
            default:
              break;
          }
        });
    }
  };


  const checkNull = (nickname) => {
    if (nickname == null) {
      return (
        <>
          <a>탈퇴한 사용자</a>
        </>
      );
    } else {
      return nickname.nickname;
    }
  };

  return (
    <>

      <Content style={{
        width: '1000px',
        margin: '0 15%'
      }}>
        <ReviewHead />

        <div>
          <List
            itemLayout="vertical"
            size="small"
            dataSource={posts}
            renderItem={(item) =>
              item ? (
                <List.Item

                  actions={[
                    <Button
                      style={{

                        left: '40px',
                        borderColor: 'none',
                        border: 'none',
                        fontSize: '12px',
                        boxShadow: 'none',
                        fontWeight: 'bold',
                        color: 'navy'
                      }}

                      onClick={(e) => {
                        history.push({
                          pathname: '/3/edit',
                          state: {
                            name: item.name,

                            id: item.id
                          },
                        })
                      }}>
                      수정</Button>,
                    <Button
                      style={{
                        left: '10px',
                        borderColor: 'none',
                        border: 'none',
                        fontSize: '12px',
                        boxShadow: 'none',
                        fontWeight: 'bold',
                        color: 'navy'
                      }}
                      onClick={() => { onDelete(item.id) }}>삭제 </Button>]}

                  key={item.title}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={checkNull(item.User)}
                    description={
                      <div>
                        <div>
                          <div>
                            <p>
                              {item.createdAt
                                ? item.createdAt.slice(0, 10)
                                : 'none'}
                            </p>
                          </div>
                          <Rate disabled allowHalf value={item.score} />{' '}
                          {item.score}
                        </div>
                      </div>
                    }
                  />
                  <div style={{ marginLeft: '50px' }}>
                    <strong>{item.title}</strong>
                  </div>
                  <div
                    style={{ marginLeft: '50px', marginTop: '20px' }}
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  ></div>
                </List.Item>
              ) : (
                'none'
              )
            }
          />
        </div>

      </Content>
    </>
  );
}

export default withRouter(ReviewList);
