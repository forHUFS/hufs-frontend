import React, { useEffect, useState, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, message } from 'antd';
import {
    reviewDetail
} from '../../../../_actions/reviewPost_action';
import { StarFilled } from '@ant-design/icons';




function ReviewHead({ match, history }) {
    const dispatch = useDispatch();
    const [detail, setDetail] = useState([]);


    useEffect(() => {
        dispatch(reviewDetail(history.location.state.id))
            .then((response) => {
                if (response.status === 200) {
                    if (response.payload.average === null) {
                        setDetail({
                            average: parseFloat(0).toFixed(1),
                            count: response.payload.count,

                        })
                    }
                    else {


                        setDetail({
                            average: response.payload.average,
                            count: response.payload.count,
                        });
                    }
                }
            })
            .catch((error) => {
                switch (error.response?.status) {
                    case 401:
                        message.error('로그인하지 않은 사용자');
                        history.push('/');

                        //
                        break;
                    case 403:

                        message.error('접근 권한 오류');
                        history.push('/');
                        break;
                    default:
                        break;
                }
            });
    }, [match.path]);



    return (
        <>
            <h1>맛집 리뷰</h1>
            <div >

                <div>
                    <StarFilled
                        style={{ color: '#fadb14', fontSize: '20px', float: 'left' }}
                    />{' '}
                    <h2 style={{ float: 'left' }}>{detail.average} </h2>
                </div>
                <div style={{ paddingtBottom: '10px' }}>
                    <font color="gray" size="5" style={{ paddingLeft: '5px' }}>
                        ({detail.count})
            </font>
                </div>
            </div>

            <div aling="left" style={{
                padding: '10px'
            }}>
                <Button
                    style={{ border: '1px solid navy' }}

                    onClick={(e) => {
                        history.push({
                            pathname: '/3/register',
                            //각 path에 맞게 수정해야함 .
                            state: {
                                detail: match.path,
                                name: history.location.state.name,

                                id: history.location.state.id
                            },
                        })
                    }
                    }
                >
                    리뷰 작성하기</Button>
            </div>
            <hr ></hr>

        </>
    );
}

export default withRouter(ReviewHead);
