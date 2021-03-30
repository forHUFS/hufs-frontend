import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PUBLIC_URL } from '../../config';
import { deleteScrap } from '../../_actions/post_action';
import { message } from 'antd';
function UserScrap() {
  const dispatch = useDispatch();
  // const { scraps } = useSelector((state) => state.user);
  const [scraps, setScraps] = useState([]);
  useEffect(async () => {
    const request = await axios
      .get(`${PUBLIC_URL}/user/scrap`, null, {
        params: { directoryId: 1 },
      })
      .then((response) => {
        if (response.status === 200) {
          setScraps(request.data.data); // [스크랩 id, 포스트 id, 포스트 title]
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(error.request);
        console.log(error.response);
      });
    // }
  }, []);
  const onRemove = (e) => {
    console.log(e.target.value);
    dispatch(deleteScrap(e.target.value)).then((response) => {
      if (response.success) {
        alert('스크랩 삭제');
      } else {
        alert(response.message);
      }
    });
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>글 번호</th>
            <th>제목</th>
            <th>내용</th>
            <th>조회</th>
          </tr>
        </thead>
        {scraps
          ? scraps.map((post, index) => {
              return (
                <tr>
                  <td key={index}>{post.postId}</td>
                  <td>제목</td>
                  <td>{post.content}</td>
                  <td>
                    <button value={post.postId} onClick={onRemove}>
                      스크랩 제거
                    </button>
                  </td>
                </tr>
              );
            })
          : null}
      </table>
    </div>
  );
}

export default UserScrap;
