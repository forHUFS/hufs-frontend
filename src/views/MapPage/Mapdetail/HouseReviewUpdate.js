import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useBeforeunload } from 'react-beforeunload';
import imageCompression from 'browser-image-compression';
import { withRouter } from 'react-router-dom';
import { postUpdate, postView } from '../../../_actions/reviewPost_action';
import axios from 'axios';
import { PUBLIC_IP } from '../../../config';
import { Skeleton, Button, Rate, message, Input, Menu, Dropdown } from 'antd';

// 상세 게시글 보기
// 게시글 내용 불러오기 ->
let wholeImg = []; // 처음 이미지 + 업로드 되는 이미지 모두
let uploadedImg = [];
function ReviewUpdate({ match, history }) {
    const { TextArea } = Input;
    const dispatch = useDispatch();
    const [updated, setUpdated] = useState(false);
    useBeforeunload((e) => {
        e.preventDefault();
        window.onunload = function () {
            axios.post(`${PUBLIC_IP}/post/back`, { url: uploadedImg });
        };
    });
    useEffect(() => {
        dispatch(postView(history.location.state.id))
            .then((response) => {
                if (response.status === 200) {
                    const firstImg = Array.from(
                        new DOMParser()
                            .parseFromString(response.payload.content, 'text/html')
                            .querySelectorAll('img'),
                    ).map((img) => img.getAttribute('src'));
                    setUpdated({
                        title: response.payload.title,
                        content: response.payload.content,
                        score: response.payload.score,
                    });
                    wholeImg = wholeImg.concat(firstImg);
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
                        break;
                    case 404:
                        message.error('존재하지 않는 게시글입니다');
                        break;
                    default:
                        break;
                }
            });
    }, []);

    const onUpdate = () => {
        // 처음 이미지 url과 최종 제출 url 비교해서 삭제해야 할 이미지 url 찾기
        if (updated.title.trim().length === 0) {
            // 공백 제목 검사
            message.info('제목을 적어주세요');
            return;
        }
        let afterEdit = Array.from(
            new DOMParser()
                .parseFromString(updated.content, 'text/html')
                .querySelectorAll('img'),
        ).map((img) => img.getAttribute('src'));

        const needDelete = getUnused(wholeImg, afterEdit); // return : 삭제해야 할 이미지 url

        dispatch(postUpdate(updated, needDelete, history.location.state.id))
            .then((response) => {
                if (response.status === 200) {
                    history.goBack();
                }
            })
            .catch((error) => {
                switch (error.response?.status) {
                    case 200:
                        break;
                    case 401:
                        message.error('로그인하지 않은 사용자');
                        history.push('/');
                        break;
                    case 403:
                        message.error('접근 권한 오류');
                        break;
                    default:
                        break;
                }
            });
    };

    const onExit = () => {
        const answer = window.confirm('진짜?');
        if (answer) {
            axios
                .post(`${PUBLIC_IP}/post/back`, { url: uploadedImg })

                .catch(history.goBack());
        }
    };
    const housePeriod = () => {
        <Menu>
            <Menu.Item>
                3개월 미만
            </Menu.Item>
            <Menu.Item>
                3~6개월
            </Menu.Item>
            <Menu.Item>
                6개월~1년
            </Menu.Item>
            <Menu.Item>
                1년 이상
            </Menu.Item>
        </Menu>
    }

    useEffect(() => { }, [updated]);

    return (
        <>
            <div id="community-main">
                {updated ? (
                    <div>
                        <Input
                            className="title-bar"
                            type="text"
                            placeholder="제목"
                            value={updated.title}
                            onChange={(e) =>
                                setUpdated({ ...updated, title: e.target.value })
                            }
                        />

                        <div style={{ padding: '5px 5px' }}>
                            <label style={{ fontWeight: 'bold' }}>평점 </label>
                            <Rate allowHalf value={updated.score} onChange={(e) => {
                                setUpdated({ ...updated, score: e });
                            }} />
                        </div>

                        <ReactQuill
                            className="11"
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
                        >
                            <div className="house-review">
                                <div className="period">
                                    입주기간
                                    <Dropdown overlay={housePeriod} trigger={['click']} >
                                        입주기간
                                    </Dropdown>
                                </div>
                                <div className="cost">
                                    비용에 대한 의견
                                    <TextArea
                                        value={updated}
                                        onChange={(e) => setUpdated({ ...updated, content: e.target.value })}
                                        placeholder="Controlled autosize"
                                        autoSize={{ minRows: 3, maxRows: 5 }}
                                    />
                                </div>
                                <div className="pros">
                                    장점
                                    <TextArea
                                        value={updated}
                                        onChange={(e) => setUpdated({ ...updated, content: e.target.value })}
                                        placeholder="Controlled autosize"
                                        autoSize={{ minRows: 3, maxRows: 5 }}
                                    />
                                </div>
                                <div className="cons">
                                    단점
                                    <TextArea
                                        value={updated}
                                        onChange={(e) => setUpdated({ ...updated, content: e.target.value })}
                                        placeholder="Controlled autosize"
                                        autoSize={{ minRows: 3, maxRows: 5 }}
                                    />
                                </div>
                            </div>
                        </ReactQuill>
                        <hr />

                        <div id="button-bar"
                        >
                            <Button
                                type="primary"
                                onClick={onUpdate}
                            >
                                수정
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
                ) : (
                    <Skeleton />
                )}
            </div>
        </>
    );
}

export default withRouter(ReviewUpdate);

const myToolbar = [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike'],
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
    'image'
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
                maxWidthOrHeight: 200,
                useWebWorker: true,
            };
            const compressedFile = await imageCompression(files[0], options);
            const formData = new FormData();
            formData.append('img', compressedFile);
            const range = this.quill.getSelection(true);
            if (!files || !files.length) {
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
