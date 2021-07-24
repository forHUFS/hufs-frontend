import React, { useState } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import { PUBLIC_IP } from '../../config';
import SignUpForm from '../../components/login/SignUpForm';
import SignUpFormMobile from '../../components/login/SignUpFormMobile';
import useResponsive from '../../hooks/useResponsive';

function SignUpPage({ setLogin }) {

  const { Mobile, Default } = useResponsive();
  
  return (
    <>
    <Mobile>
      <SignUpFormMobile />
    </Mobile>
    <Default>
      <SignUpForm />
    </Default>
    </>
  );
}

export default SignUpPage;