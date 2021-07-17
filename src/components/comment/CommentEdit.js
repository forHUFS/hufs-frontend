import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { Button, Input, message } from 'antd';
import { mutate } from 'swr';
import { PUBLIC_IP } from '../../config';
import { commentSave } from '../../functions/commentFunctions';
import useErrorHandling from '../../hooks/useErrorHandling';
import useResponsive from '../../hooks/useResponsive';
function CommentEdit({ history, match, postDetail }) {
  const { TextArea } = Input;
  const { Mobile, isMobile, Default } = useResponsive();
  const errorHandling = useErrorHandling();
  const [content, setContent] = useState();
  console.log(isMobile);
  const onSubmit = (e) => {
    e.preventDefault();
    if (content.trim().length === 0) {
      message.info('댓글을 입력하세요');
      return;
    }
    let body = {
      postId: +match.params.id,
      content: content,
    };
    commentSave(body)
      .then(() => {
        mutate(`${PUBLIC_IP}/post/${+match.params.id}`);
        message.success('댓글 작성 성공!');
      })
      .catch((error) => {
        errorHandling(error.response?.data.message);
      });
    setContent('');
  };
  return (
    <div className="comment-input">
      <TextArea
        className="comment-textarea"
        size={'small'}
        rows={4}
        autoSize={{ minRows: 4, maxRows: 4 }}
        showCount
        maxLength={100}
        type="text"
        placeholder="댓글을 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button
        size={'small'}
        style={{
          right: '1em',
          minWidth: '4em',
          height: '113px',
          position: 'absolute',
        }}
        onClick={onSubmit}
      >
        입력
      </Button>
    </div>
  );
}

export default withRouter(CommentEdit);
