import type { NextPage } from 'next';
import { Divider } from '@mui/material';
import QuestionBar from '../components/QuestionBar';
import { QuestionBarType } from '../constant';
import React, {useEffect, useState} from 'react';
import LoveLanguageTab from '../components/LoveLanguageTab';
import GiftTab from '../components/GiftTab';

const Home: NextPage = () => {
  const [ type, setType ] = useState(QuestionBarType.LoveLanguage);

  useEffect(() => {
    const questionBarType = parseInt(localStorage.getItem('questionBarType') || '') || QuestionBarType.LoveLanguage;

    setType(questionBarType);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <QuestionBar type={type} callback={setType}/>

      <Divider/>

      <div className="p-2 sm:p-3 md:p-5 lg:p-10 border rounded-lg w-full md:w-3/4 lg:w-2/3 mb-2">
        {
          type === QuestionBarType.LoveLanguage &&
          <LoveLanguageTab/>
        }

        {
          type === QuestionBarType.Gift &&
          <GiftTab/>
        }
      </div>
    </div>
  );
};

export default Home;
