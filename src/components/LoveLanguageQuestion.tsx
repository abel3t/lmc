import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';

import { useDispatch } from 'react-redux';
import { Input } from '@mui/material';
import { updateLoveLanguageQuestion } from '../slices/love-language.slice';

interface LoveLanguageProps {
  index: number,
  question: any;
}

const LoveLanguageQuestion: React.FC<LoveLanguageProps> = ({ index, question }) => {
  const dispatch = useDispatch();

  const handleChange = (qIndex: number, aIndex: number, event: any) => {
    const answers: any = JSON.parse(JSON.stringify(question.answers));
    const value = parseInt(event.target.value);
    answers[aIndex].value = value;

    let aHasError = false;
    for (let i = 0; i <= answers.length; i++) {
      if (answers[i]?.value === value) {
        aHasError = true;
        break;
      }
    }

    answers[aIndex].hasError = (value > 0 && value <= 5) || aHasError;

    dispatch(updateLoveLanguageQuestion({
      id: qIndex,
      question: { ...question, answers, hasError: false },
    }));
  };

  return (
    <div className={`w-full md:w-3/4 lg:w-2/3 p-2 md:p-3 lg:p-4 mb-3 border-gray-400 rounded-lg bg-white ${question.hasError &&
    'border border-red-500'}`}>
      <div className="text-lg mb-2">
        <strong>Nhóm {index}:</strong>
      </div>

      <div className="flex flex-col">
        {
          question.answers.map((answer: any, aIndex: number) =>
            <div key={aIndex} className="inline-flex items-center justify-start py-2">

              <Input id={`q${index}-a${aIndex}`} error={!!answer.hasError} inputProps={{ min: 1, max: 5, style: { textAlign: 'center', width: 35 } }} onChange={(event) => handleChange(index, aIndex, event)}/>

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
        question.hasError &&
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
