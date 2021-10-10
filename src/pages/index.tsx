import type { NextPage } from 'next';
import Link from 'next/link';
import { Box, Button, Divider } from '@mui/material';
import QuestionBar from '../components/QuestionBar';
import { QuestionBarType } from '../constant';
import React, { useState } from 'react';

const Home: NextPage = () => {
  const [ type, setType ] = useState(QuestionBarType.LoveLanguage);
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <QuestionBar type={type} callback={setType}/>

      <Divider/>

      <div className="p-2 sm:p-3 md:p-5 lg:p-10 border rounded-lg w-full md:w-3/4 lg:w-2/3">
        {
          type === QuestionBarType.LoveLanguage &&
          <div>
            Ngôn ngữ yêu thương
          </div>
        }

        {
          type === QuestionBarType.Gift &&
          <div>
            Ân tứ thuộc linh
          </div>
        }

        <Box sx={{ mt: 5 }}>
          <Button variant="contained">
            {
              type === QuestionBarType.LoveLanguage &&
              <Link href="/love-language-assessment">
                Làm khảo sát
              </Link>
            }

            {
              type === QuestionBarType.Gift &&
              <Link href="/gift-assessment">
                Làm khảo sát
              </Link>
            }
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default Home;
