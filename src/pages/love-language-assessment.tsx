import React from 'react';

import { Box, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import LoveLanguageQuestion from '../components/LoveLanguageQuestion';
import { getLoveLanguageQuestions } from '../slices/love-language.slice';

const GiftAssessment: React.FC = () => {
  const questions = useSelector(getLoveLanguageQuestions);

  return (
    <div className="p-2 sm:p-3 md:p-4 lg:p-5 flex flex-col items-center bg-blue-200" style={{ minHeight: '100vh' }}>
      <div className="w-full md:w-3/4 lg:w-2/3 mb-3 border-gray-400 rounded-lg bg-white">
        <Box
          className="text-2xl md:text-3xl text-center text-white rounded-t-lg border-green-100 py-3 w-full"
          sx={{ bgcolor: 'primary.main' }}
        >
          Ngôn ngữ yêu thương
        </Box>
        <div className="p-2 md:p-3 lg:p-4 text-sm">
          Bạn có biết ngôn ngữ yêu thương của mình, ngôn ngữ mà khi ai đó bày tỏ với bạn, bạn sẽ cảm thấy được yêu
          thương nhất? Quan trọng hơn, bạn có biết ngôn ngữ yêu thương của những người chung quanh mình để bày tỏ tình
          yêu thương và sự quan tâm của bạn cho họ theo cách họ mong đợi nhất? Bản trắc nghiệm ngôn ngữ yêu thương này
          sẽ giúp bạn!
        </div>
      </div>

      {
        Object.values(questions).map((question, index) =>
          <LoveLanguageQuestion key={`q${index+1}`} index={index + 1} question={question} />
        )
      }

      <Button variant="contained">
        Submit
      </Button>
    </div>
  );
};

export default GiftAssessment;
