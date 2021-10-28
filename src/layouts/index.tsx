import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { CircularProgress } from '@mui/material';

const Layout: React.FC = ({ children }) => {
  const [ isLoading, setIsLoading ] = useState(false);

  useEffect(() => {
    Router.events.on('routeChangeStart', () => setIsLoading(true));
    Router.events.on('routeChangeComplete', () => setIsLoading(false));

    return () => {
      Router.events.off('routeChangeStart', () => setIsLoading(true));
      Router.events.off('routeChangeComplete', () => setIsLoading(false));
    };
  }, [ isLoading ]);

  return (
      <>
        {
          isLoading ?
              <div className="flex items-center justify-center w-full" style={{ minHeight: '100vh' }}>
                <CircularProgress size={70}/>
              </div>
              : children
        }

      </>
  );
};

export default Layout;