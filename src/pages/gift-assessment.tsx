import React from 'react';

import { Box, Button } from '@mui/material';
import GiftQuestion from '../components/GiftQuestion';
import { useSelector } from 'react-redux';
import { getGiftQuestions } from '../slices/gift.slice';

const GiftAssessment: React.FC = () => {
  const questions = useSelector(getGiftQuestions);

  return (
    <div className="p-2 sm:p-3 md:p-4 lg:p-5 flex flex-col items-center bg-blue-200" style={{ minHeight: '100vh' }}>
      <div className="w-full md:w-3/4 lg:w-2/3 mb-3 border-gray-400 rounded-lg bg-white">
        <Box
          className="text-2xl md:text-3xl text-center text-white rounded-t-lg border-green-100 py-3 w-full"
          sx={{ bgcolor: 'primary.main' }}
        >
          Ân tứ thuộc linh
        </Box>
        <div className="p-2 md:p-3 lg:p-4 text-sm">
          Hãy trả lời 140 câu hỏi (5 nhóm) bằng cách chấm mức độ đúng với khả năng/xu hướng/tâm tình của bạn. Đúng nhất
          với mình là điểm 10, không đúng nhất với mình là điểm 1. Chấm điểm ngay cho các câu mô tả được đưa ra. Đừng
          suy nghĩ cẩn thận quá, đây là chỉ là khảo sát.
        </div>
      </div>

      {
        Object.values(questions)?.map((question, index) =>
          <GiftQuestion
            index={index}
            id={question.id}
            text={question.text}
            value={question.value}
          />
        )
      }

      <Button variant="contained">
        Submit
      </Button>
    </div>
  );
};

export default GiftAssessment;
