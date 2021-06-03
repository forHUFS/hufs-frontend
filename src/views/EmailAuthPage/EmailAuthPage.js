import React, { useEffect, useState } from 'react';
import AuthSuccess from '../../components/webmail/AuthSuccess';
import AuthAlready from '../../components/webmail/AuthAlready';
import AuthUnauthorized from '../../components/webmail/AuthUnauthorized';
import AuthExpired from '../../components/webmail/AuthExpired';
import Page404 from '../Page404/Page404';
import AuthUnavailable from '../../components/webmail/AuthUnavailable';
import useEmailAuth from '../../hooks/useEmailAuth';
function EmailAuthPage(props) {
  const [status, setStatus] = useState('');
  const { emailAuth, isError, isLoading } = useEmailAuth(
    new URLSearchParams(props.location.search).get('token'),
  );
  if (!isLoading && emailAuth) {
    setStatus(emailAuth.status);
  } else if (!isLoading) {
    setStatus(isError.response?.status);
  }
  function statusRender() {
    switch (status) {
      case 200:
        return <AuthSuccess />;
      case 419:
        return <AuthExpired />;
      case 409:
        return <AuthAlready />;
      case 401:
        return <AuthUnauthorized />;
      case 404:
        return <AuthUnavailable />;
      default:
        return <Page404 />;
        break;
    }
  }
  if (isLoading) return <>isLoading...</>;
  return <div>{statusRender()}</div>;
}

export default EmailAuthPage;
