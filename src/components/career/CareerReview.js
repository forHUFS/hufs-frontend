import React from 'react';
import {Button} from 'antd';
import {Link} from "react-router-dom";


function CareerReview() {
    return (
        <>
        <h1>review</h1>
        <Link to="/career/careerReviewWrite">
        write
        </Link>
        </>
    )
}

export default CareerReview;