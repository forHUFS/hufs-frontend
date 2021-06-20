import React, { useState } from 'react';
import useInput from '../../hooks/useInput';
import { withRouter } from 'react-router';
import { Button, Input, message } from 'antd';
import { mutate } from 'swr';
import { PUBLIC_IP } from '../../config';
import errorHandling from '../../functions/errorHandling';
import { commentSave } from '../../functions/commentFunctions';
function CommentEdit({ history, match, postDetail }) {
  const { TextArea } = Input;
  const [content, onChange, setContent] = useInput('');
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
        onChange={onChange}
      />
      <Button
        style={{ width: '120px', height: '113px', position: 'absolute' }}
        onClick={onSubmit}
      >
        댓글 입력
      </Button>
    </div>
  );
}

export default withRouter(CommentEdit);
