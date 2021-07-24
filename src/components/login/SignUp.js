import React, { useState } from 'react';
import SignInModal from '../../views/RegisterPage/SignInPage';
import SignUpModal from '../../views/RegisterPage/SignUpPage';

const SignUp = ({ setLogin }) => {
  const [signUpModalOn, setSignUpModalOn] = useState(false);

  return (
    <>
      <SignInModal setLogin={setLogin} />
      {signUpModalOn ? <SignUpModal /> : null}
    </>
  );
};
export default SignUp;
