import ReviewPage from '../ItemRegisterForm';
import axios from 'axios';
//import {useHistory,withRouter,useLocation } from 'react-router-dom';

/*
withRouter 함수는 High-order component이다. 
라우트로 사용된 컴포넌트가 아니어도 match, location, history 객체에 접근할 수 있게 한다.
컴포넌트 속성값으로 match, location, history 객체를 전달받는다.
*/
import { withRouter, useHistory, useLocation } from 'react-router-dom';

const ItemRegisterContainer = ({ history,match }) => {
    const location = useLocation();
    console.log(match)
    console.log("itemregister",location);
    const onRegister = ({title, score, content, file}) => {
        const itemObject = {
            title,
            content
,            score,
        }
    
        // FormData 객체 생성
        const formData = new FormData()
        formData.append("file", file)
        formData.append("item", JSON.stringify(itemObject))
        console.log( itemObject)
        // 파일 업로드
        axios.post(`http://52.78.2.40:5000/store/${location.state.id}/review`,  itemObject 
        ).then(res => {
            alert("등록되었습니다.")
            history.push("${match.path}/read/"+res.data.id)
        }).catch(err => {
            console.log(itemObject)
            alert(err)
        })
    
    }

  return <ReviewPage onRegister={onRegister} match={match} />;
};

export default withRouter(ItemRegisterContainer);
