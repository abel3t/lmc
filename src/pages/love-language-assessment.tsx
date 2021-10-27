import React, {useEffect, useState} from 'react';

import {Box, Button, CircularProgress, Dialog, DialogTitle} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import LoveLanguageQuestion from '../components/LoveLanguageQuestion';
import {
  getLoveLanguageQuestions,
  updateLoveLanguageQuestion,
  updateLoveLanguageQuestions
} from '../slices/love-language.slice';
import ErrorIcon from "@mui/icons-material/Error";

const GiftAssessment: React.FC = () => {
  const [ showErrorDialog, setShowErrorDialog ] = useState(false);
  const [ isSubmit, setIsSubmit ] = useState(false);

  const questions = useSelector(getLoveLanguageQuestions);
  const dispatch = useDispatch();

  useEffect(() => {
    const defaultQuestions = JSON.parse(localStorage.getItem('loveLanguageQuestions') || 'null');

    console.log(defaultQuestions)
    if (defaultQuestions) {
      dispatch(updateLoveLanguageQuestions(defaultQuestions));
    }
  }, []);

  const onClickSubmit = () => {
    setIsSubmit(true);
    let hasError = false;
    const result: any = {};

    Object.values(questions).forEach((question: any) => {
      question.answers.forEach((answer: any) => {
        result[answer.type] = {
          type: answer.type,
          mark: (result[answer.type]?.mark || 0) + answer.mark || 0
        }
        if (answer.hasError || !answer.mark) {
          hasError = true;
        }
      });

      if (hasError) {
        dispatch(updateLoveLanguageQuestion({
          id:  question.id,
          question: { ...question, hasError: true },
        }));
      }
    });

    if (!hasError) {
      localStorage.setItem('loveLanguageQuestions', JSON.stringify(questions));
      localStorage.setItem('loveLanguageResultV2', JSON.stringify(result));

      window.open('/', '_self');
    } else {
      setIsSubmit(false);
      setShowErrorDialog(true);
    }
  }

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

      <Box>
        {
          isSubmit &&
          <Button variant="contained" style={{ marginLeft: 15, height: 35, minWidth: 90 }}>
            <CircularProgress sx={{ color: '#fff' }} size={25}/>
          </Button>
        }

        {
          !isSubmit &&
          <Button variant="contained" onClick={onClickSubmit}
                  style={{ marginLeft: 15, height: 35, minWidth: 90 }}>
            Submit
          </Button>
        }
      </Box>

      <Dialog onClose={() => setShowErrorDialog(false)} open={showErrorDialog} sx={{ top: -400 }}>
        <DialogTitle className="text-md text-red-600"><ErrorIcon
            className="mr-2"/><span>Hãy trả lời tất cả câu hỏi nào!</span></DialogTitle>
      </Dialog>
    </div>
  );
};

export default GiftAssessment;
