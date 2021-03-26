import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {
  postDellike,
  postLike,
  postRemove,
  postReport,
  postScrap,
} from '../../_actions/post_action';
import CommentEdit from '../comment/CommentEdit';
import CommentList from '../comment/CommentList';
// 상세 게시글 보기
// 게시글 내용 불러오기 ->
function PostView({ match, history }) {
  const [post, setPost] = useState();
  const dispatch = useDispatch();
  useEffect(async () => {
    const request = await axios
      .get(`/post/${+match.params.id}`)
      .then((response) => response.data);
    setPost(request);
  }, []);

  // const { posts } = useSelector((state) => state.post);
  // useEffect(() => {
  //   const matchPost = posts.find((posts) => posts.id === +match.params.id);
  //   setPost(matchPost);
  // }, [posts]);
  // console.log(typeof match.params.id);
  const onDelete = () => {
    const answer = window.confirm('게시글을 삭제하시겠습니까?');
    if (answer) {
      dispatch(postRemove(post.id))
        .then((response) => {
          if (response.removeSuccess) {
            alert('게시글이 삭제되었습니다.');
          } else {
            alert('게시글을 삭제하지 못했습니다.');
          }
        })
        .catch((error) => console.log(error));
    }
  };
  const onLike = () => {
    dispatch(postLike(post.id)).catch((error) => console.log(error));
  };
  const onDellike = () => {
    dispatch(postDellike(post.id)).catch((error) => console.log(error));
  };
  const onScrap = () => {
    dispatch(postScrap(post.id)).then((response) => {
      if (response.success) {
        alert('스크랩 성공');
      } else {
        alert(response.message);
      }
    });
  };
  console.log('postview');
  const onReport = () => {
    // 모달 창 띄워서 신고 내용 적을 필요 있음.
    let body = {
      postId: post.id,
      // content: content
    };
    dispatch(postReport(body))
      .then((response) => {
        if (response.reportSuccess) {
          alert('신고가 완료되었습니다.');
        } else {
          alert('신고에 실패하였습니다');
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      {post ? (
        <div>
          <p>{post.id}</p>
          <h2>{post.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
          <span>추천 수: {post.like}</span>
          <button onClick={onLike}> 추천하기</button>
          <button onClick={onDellike}> -1ㅎ</button>
          <span>신고 수: {post.report}</span>
          <button onClick={onReport}>신고하기</button>
          <button onClick={onDelete}> 삭제하기</button>
          <button onClick={onScrap}>스크랩하기</button>
          <Link to={`${post.id}/update`}>
            <button>수정하기</button>
          </Link>
          <CommentList comments={post.Replies ? post.Replies : []} />
          <CommentEdit match={match} />
        </div>
      ) : (
        'isLoading'
      )}
    </div>
  );
}

export default withRouter(PostView);
