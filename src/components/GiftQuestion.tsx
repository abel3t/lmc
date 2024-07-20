import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';

import { useDispatch } from 'react-redux';
import { Box, Rating } from '@mui/material';
import { updateGiftQuestion } from '../slices/gift.slice';
import { updateGiftQuestion as updateNextGenQuestion } from 'slices/next-gen-gift.slice';

interface GiftQuestionProps {
  index: number;
  question: any;
  isNextGen?: boolean;
}

const GiftQuestion: React.FC<GiftQuestionProps> = ({ index, question, isNextGen = false }) => {
  const dispatch = useDispatch();

  const handleChange = (event: any) => {
    console.log('event', event.target.value, { isNextGen });
    if (isNextGen) {
      dispatch(
        updateNextGenQuestion({
          id: question.id,
          question: {
            value: parseInt(event.target.value),
            hasError: false
          }
        })
      );
    } else {
      dispatch(
        updateGiftQuestion({
          id: question.id,
          question: { value: parseInt(event.target.value), hasError: false }
        })
      );
    }
  };

  return (
    <div
      className={`w-full md:w-3/4 lg:w-2/3 p-2 md:p-3 lg:p-4 mb-3 border-gray-400 rounded-lg bg-white ${
        question.hasError && 'border border-red-500'
      }`}
    >
      <div className='text-lg mb-2'>
        {index}. {question.text}
      </div>

      <div className='flex items-end justify-around'>
        <div className='pb-2 w-1/12 md:w-1/6 text-xs sm:text-sm md:text-md'>Không giống {isNextGen ? 'em' : 'tôi'}</div>

        <Box className='flex items-center'>
          <Rating
            name='star-controlled'
            value={question.value || 0}
            max={10}
            onChange={handleChange}
            id='gift-star-rating'
          />

          <Box className='ml-2'>{<span>{question.value || 0}</span>}</Box>
        </Box>

        <div className='pb-2 w-1/12 md:w-1/6 text-xs sm:text-sm md:text-md text-right'>
          Rất giống {isNextGen ? 'em' : 'tôi'}
        </div>
      </div>

      {question.hasError && (
        <div>
          <p className='mt-2 text-xs text-red-600'>
            <ErrorIcon className='mr-2' />
            Câu hỏi này là bắt buộc
          </p>
        </div>
      )}
    </div>
  );
};

export default GiftQuestion;
