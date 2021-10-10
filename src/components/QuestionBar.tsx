import React, { useEffect } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { QuestionBarType } from '../constant';

interface QuestionBarProps {
  type: QuestionBarType;
}

const QuestionBar: React.FC<QuestionBarProps> = ({ type: defaultValue }) => {
  const [ type, setType ] = React.useState(defaultValue);

  useEffect(() => {
    setType(type);
  }, [ type ]);

  const handleChange = (event: React.SyntheticEvent, type: QuestionBarType) => {
    setType(type);
  };

  return (
    <div className="flex items-center">
      <Tabs
        value={type}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="primary tabs"
      >
        <Tab value={QuestionBarType.LoveLanguage} label="Ngôn ngữ yêu thương"/>
        <Tab value={QuestionBarType.Gift} label="Ân tứ thuộc linh"/>
      </Tabs>
    </div>
  );
};

export default QuestionBar;
