import React, { useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useBeforeunload } from 'react-beforeunload';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { postSave } from '../../functions/postFunctions';
import { PUBLIC_IP } from '../../config';
import { Button, Input, message, Select } from 'antd';
import imageCompression from 'browser-image-compression';
import useUserInfo from '../../hooks/useUserInfo';
import { mutate } from 'swr';
import useErrorHandling from '../../hooks/useErrorHandling';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import useResponsive from '../../hooks/useResponsive';
import useMajorCheck from '../../hooks/useMajorCheck';
import PostHeaderToolBar from './PostHeaderToolBar';
let uploadedImg = [];
function PostEdit(props) {
  const { isMobile, Default, Mobile } = useResponsive();
  const { Option } = Select;
  const { user, isError, isLoading } = useUserInfo();
  const { isMajorBoard, notMyMajor } = useMajorCheck(props.match);

  const errorHandling = useErrorHandling();
  useBeforeunload((e) => {
    e.preventDefault();
    window.onunload = function () {
      axios.post(`${PUBLIC_IP}/post/back`, uploadedImg);
    };
  });
  const [value, setvalue] = useState({ title: '', content: '', header: '' });
  const onSubmit = (e) => {
    e.preventDefault();
    if (value.title.trim().length === 0) {
      message.info('제목을 적어주세요');
      return;
    }

    let submittedImg = Array.from(
      new DOMParser()
        .parseFromString(value.content, 'text/html')
        .querySelectorAll('img'),
    ).map((img) => img.getAttribute('src'));

    const needDelete = getUnused(uploadedImg, submittedImg); // return : 삭제해야 할 이미지 url
    let body = {
      title: value.title,
      content: value.content,
      header: value.header,
    };
    postSave(body, needDelete, props.match.params.title)
      .then(() => {
        props.history.goBack();
        message.success('작성 완료');
      })
      .catch((error) => {
        errorHandling(error.response?.data.message);
      });
  };
  const onExit = () => {
    const answer = window.confirm(
      '작성하던 글은 저장되지 않습니다. 그래도 나가시겠습니까?',
    );
    if (answer) {
      axios
        .post(`${PUBLIC_IP}/post/back`, uploadedImg)
        .then(props.history.goBack())
        .catch(props.history.goBack());
    }
  };
  if (notMyMajor) {
    props.history.push('/');
  }
  if (isError) {
    return errorHandling(isError.response?.data.message);
  }
  if (isLoading) {
    return <>로딩</>;
  }

  if (isMobile) {
    return (
      <>
        {isMajorBoard ? (
          <PostHeaderToolBar value={value} setvalue={setvalue} />
        ) : null}
        <Input
          className="title-bar"
          type="text"
          placeholder="제목"
          style={{ marginTop: 20, marginBottom: 20 }}
          value={value.title}
          onChange={(e) => {
            setvalue({ ...value, title: e.target.value });
          }}
        />
        <ReactQuill
          id="quill-editor"
          placeholder="내용을 입력하세요"
          theme="snow"
          onChange={(content, delta, source, editor) => {
            setvalue({ ...value, content: editor.getHTML() });
          }}
          onChangeSelection={(range, source, editor) => {
            setvalue({ ...value, content: editor.getHTML() });
          }}
          modules={modules}
          formats={formats}
        ></ReactQuill>
        <hr />
        <div id="button-bar">
          <Button
            type="primary"
            onClick={onSubmit}
            style={{
              marginLeft: '10px',
            }}
          >
            등록
          </Button>
          <Button
            type="primary"
            onClick={onExit}
            style={{
              marginLeft: '10px',
            }}
          >
            취소
          </Button>
        </div>
      </>
    );
  }
  return (
    <>
      <div id="community-main">
        {isMajorBoard ? (
          <PostHeaderToolBar value={value} setvalue={setvalue} />
        ) : null}
        <Input
          className="title-bar"
          type="text"
          placeholder="제목"
          value={value.title}
          onChange={(e) => {
            setvalue({ ...value, title: e.target.value });
          }}
        />
        <ReactQuill
          id="quill-editor"
          placeholder="내용을 입력하세요"
          theme="snow"
          onChange={(content, delta, source, editor) => {
            setvalue({ ...value, content: editor.getHTML() });
          }}
          onChangeSelection={(range, source, editor) => {
            setvalue({ ...value, content: editor.getHTML() });
          }}
          modules={modules}
          formats={formats}
        ></ReactQuill>
        <hr />
        <div id="button-bar">
          <Button
            type="primary"
            onClick={onSubmit}
            style={{
              marginLeft: '10px',
            }}
          >
            등록
          </Button>
          <Button
            type="primary"
            onClick={onExit}
            style={{
              marginLeft: '10px',
            }}
          >
            취소
          </Button>
        </div>
      </div>
    </>
  );
}

export default withRouter(PostEdit);

const myToolbar = [
  [{ header: [1, 2, false] }],
  [
    'bold',
    'italic',
    'underline',
    'strike',
    // 'blockquote'
  ],
  // [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
  ['image'],
];
const modules = {
  toolbar: {
    container: myToolbar,
    handlers: { image: imageHandler },
  },
};
const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  // 'blockquote',
  // 'list',
  // 'bullet',
  // 'indent',
  'link',
  'image',
];

function imageHandler() {
  let fileInput = this.container.querySelector('input.ql-image[type=file]');

  if (fileInput == null) {
    fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('name', 'img');
    fileInput.setAttribute(
      'accept',
      'image/png, image/gif, image/jpeg, image/bmp, image/x-icon',
    );
    fileInput.classList.add('ql-image');
    fileInput.addEventListener('change', async () => {
      const files = fileInput.files;

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 400,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(files[0], options);
      const formData = new FormData();
      formData.append('img', compressedFile);
      const range = this.quill.getSelection(true);

      if (!files || !files.length) {
        message.warn('No files selected');
        return;
      }

      await axios
        .post(`${PUBLIC_IP}/post/img`, formData, {
          header: {
            'Content-Type': 'multipart/form-data',
          },
        })

        .then((response) => {
          this.quill.editor.insertEmbed(
            range.index,
            'image',
            response.data.data[0],
          );
          uploadedImg = uploadedImg.concat(response.data.data[0]);
          this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
          fileInput.value = '';
        })
        .catch((error) => {
          fileInput.value = '';
          this.quill.enable(true);
        });
    });
    this.container.appendChild(fileInput);
  }
  fileInput.click();
}

function getUnused(uploadedImg, submittedImg) {
  const unused = uploadedImg;
  for (let i = 0; i < submittedImg.length; i++) {
    unused.splice(unused.indexOf(submittedImg[i]), 1);
  }
  return unused;
}
