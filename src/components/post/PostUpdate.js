import React, { useEffect, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useBeforeunload } from 'react-beforeunload';
import imageCompression from 'browser-image-compression';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { PUBLIC_IP } from '../../config';
import { Skeleton, Button, message } from 'antd';
import { errorMessage } from '../../functions/errorHandling';
import usePostDetail from '../../hooks/usePostDetail';
import { postUpdate } from '../../functions/postFunctions';
let wholeImg = []; // 처음 이미지 + 업로드 되는 이미지 모두
let uploadedImg = [];
function PostUpdate({ match, history }) {
  const { postDetail, isLoading, isError } = usePostDetail(+match.params.id);
  const [updated, setUpdated] = useState(false);
  useBeforeunload((e) => {
    e.preventDefault();
    window.onunload = function () {
      axios.post(`${PUBLIC_IP}/post/back`, { url: uploadedImg });
    };
  });
  useEffect(() => {
    if (postDetail) {
      const firstImg = Array.from(
        new DOMParser()
          .parseFromString(postDetail.content, 'text/html')
          .querySelectorAll('img'),
      ).map((img) => img.getAttribute('src'));
      setUpdated({
        title: postDetail.title,
        content: postDetail.content,
      });
      wholeImg = wholeImg.concat(firstImg);
    }
  }, [isLoading]);

  const onUpdate = () => {
    if (updated.title.trim().length === 0) {
      message.info('제목을 적어주세요');
      return;
    }
    let afterEdit = Array.from(
      new DOMParser()
        .parseFromString(updated.content, 'text/html')
        .querySelectorAll('img'),
    ).map((img) => img.getAttribute('src'));

    const needDelete = getUnused(wholeImg, afterEdit); // return : 삭제해야 할 이미지 url
    postUpdate(updated, needDelete, +match.params.id)
      .then(() => {
        message.success('게시글 수정 완료');
        history.goBack();
      })
      .catch((error) => {
        errorMessage(error.response?.data.message);
      });
  };
  const onExit = () => {
    const answer = window.confirm('정말 취소하시겠습니까?');
    if (answer) {
      axios
        .post(`${PUBLIC_IP}/post/back`, { url: uploadedImg })
        .then(() => history.goBack())
        .catch(() => history.goBack());
    }
  };

  return (
    <>
      <div id="community-main">
        {updated ? (
          <div>
            <p>글 번호: {updated.id}</p>
            <input
              className="title-bar"
              type="text"
              placeholder="제목"
              value={updated.title}
              onChange={(e) =>
                setUpdated({ ...updated, title: e.target.value })
              }
            />
            <ReactQuill
              className="1"
              placeholder="하이"
              theme="snow"
              defaultValue={updated.content}
              onChange={(content, delta, source, editor) => {
                setUpdated({ ...updated, content: editor.getHTML() });
              }}
              onChangeSelection={(range, source, editor) => {
                setUpdated({ ...updated, content: editor.getHTML() });
              }}
              modules={modules}
              formats={formats}
            ></ReactQuill>

            <div id="button-bar">
              <Button
                type="primary"
                onClick={onUpdate}
                style={{
                  margin: '10px',
                }}
              >
                수정하기
              </Button>
              <Button
                type="primary"
                onClick={onExit}
                style={{
                  margin: '10px',
                }}
              >
                취소하기
              </Button>
            </div>
          </div>
        ) : (
          <Skeleton />
        )}
      </div>
    </>
  );
}

export default withRouter(PostUpdate);

const myToolbar = [
  [{ header: [1, 2, false] }],
  ['bold', 'italic', 'underline', 'strike'],
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
  // 'link',
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
        message.info('No files selected');
        return;
      }

      // // 테스트 공간 base64로 출력
      // let reader = new FileReader();
      // reader.readAsDataURL(files[0]);
      // reader.onload = () => {
      //   this.quill.insertEmbed(range.index, 'image', reader.result);
      // };
      //

      // this.quill.enable(false);

      await axios
        .post(`${PUBLIC_IP}/post/img`, formData, {
          header: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          this.quill.enable(true);
          this.quill.editor.insertEmbed(
            range.index,
            'image',
            response.data.data[0],
          );
          wholeImg = wholeImg.concat(response.data.data[0]);
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

function getUnused(wholeImg, submittedImg) {
  const unused = wholeImg;
  for (let i = 0; i < submittedImg.length; i++) {
    unused.splice(unused.indexOf(submittedImg[i]), 1);
  }
  return unused;
}
