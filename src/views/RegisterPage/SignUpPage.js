import React, { useState } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import { PUBLIC_IP } from '../../config';
import SignUpForm from '../../components/login/SignUpForm';
import useResponsive from '../../hooks/useResponsive';

function SignUpPage({ setLogin }) {

  const { Mobile, Default } = useResponsive();
  
  return (
    <>
      <SignUpForm />
    </>
  );
}

export default SignUpPage;