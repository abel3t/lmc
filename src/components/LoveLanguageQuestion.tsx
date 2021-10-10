import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';

import { useDispatch } from 'react-redux';
import { Box, FormControl, Input, InputLabel, MenuItem, Rating, Select, TextField } from '@mui/material';
import { updateLoveLanguageQuestion } from '../slices/love-language.slice';

interface LoveLanguageProps {
  index: number,
  question: any;
  isRequired?: boolean;
  hasError?: boolean;
  value?: number
}

const LoveLanguageQuestion: React.FC<LoveLanguageProps> = ({ index, question, isRequired, hasError }) => {
  const dispatch = useDispatch();

  const handleChange = (event: any) => {
    // dispatch(updateLoveLanguageQuestion({ id, question: { value: parseInt(event.target.value), hasError: false } }));
  };

  return (
    <div className={`w-full md:w-3/4 lg:w-2/3 p-2 md:p-3 lg:p-4 mb-3 border-gray-400 rounded-lg bg-white ${isRequired &&
    hasError &&
    'border border-red-500'}`}>
      <div className="text-lg mb-2">
        <strong>Nhóm {index}:</strong>
      </div>

      <div className="flex flex-col">
        {
          question.answers.map((answer: any, index: number) =>
            <div key={index} className="inline-flex items-center justify-start py-2">

              <Input inputProps={{ min: 1, max: 5, style: { textAlign: 'center', width: 35 } }}/>

              <div className="ml-5">
                {answer.text && <p>{answer.text}</p>}
                {
                  answer.textMale &&
                  <div>
                    <p>{answer.textMale}</p>
                    <p>{answer.textFemale}</p>
                  </div>
                }
              </div>
            </div>
          )
        }
      </div>

      {
        isRequired && hasError &&
        (
          <div>
            <p className="mt-2 text-xs text-red-600"><ErrorIcon className="mr-2"/>Câu hỏi này là bắt buộc</p>
          </div>
        )
      }
    </div>
  );
};

export default LoveLanguageQuestion;
