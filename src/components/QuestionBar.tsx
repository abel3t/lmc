import React from 'react';
import { Tabs, Tab } from '@mui/material';
import { QuestionBarType } from '../constant';

interface QuestionBarProps {
  type: QuestionBarType;
  callback: Function;
}

const QuestionBar: React.FC<QuestionBarProps> = ({ type, callback }) => {

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    localStorage.setItem('questionBarType', newValue);
    callback(parseInt(newValue));
  };

  return (
    <div className="flex items-center">
      <Tabs
        value={type}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
      >
        <Tab value={QuestionBarType.LoveLanguage} label="Ngôn ngữ yêu thương"/>
        <Tab value={QuestionBarType.Gift} label="Ân tứ thuộc linh"/>
      </Tabs>
    </div>
  );
};

export default QuestionBar;
