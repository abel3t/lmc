import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { Box, CircularProgress, Divider } from '@mui/material';
import QuestionBar from '../components/QuestionBar';
import { QuestionBarType } from '../constant';

const Layout: React.FC = ({ children }) => {
  const [ isLoading, setIsLoading ] = useState(false);

  useEffect(() => {
    const updateLoadingStatus = () => setIsLoading(!isLoading);

    Router.events.on('routeChangeStart', updateLoadingStatus);
    Router.events.on('routeChangeComplete', updateLoadingStatus);

    return () => {
      Router.events.off('routeChangeStart', updateLoadingStatus);
      Router.events.off('routeChangeComplete', updateLoadingStatus);
    };
  }, [ isLoading ]);

  return (
    <>
      {isLoading ?
        <div className="flex items-center justify-center w-full" style={{ minHeight: '100vh' }}>
          <CircularProgress size={70}/>
        </div>
        : children
      }
    </>
  );
};

export default Layout;
