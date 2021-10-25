import React, {useState} from 'react';

import {Box, Button, CircularProgress, Dialog, DialogTitle} from '@mui/material';
import { useSelector } from 'react-redux';
import LoveLanguageQuestion from '../components/LoveLanguageQuestion';
import { getLoveLanguageQuestions } from '../slices/love-language.slice';
import ErrorIcon from "@mui/icons-material/Error";

const GiftAssessment: React.FC = () => {
  const [ showErrorDialog, setShowErrorDialog ] = useState(false);
  const [ isSubmit, setIsSubmit ] = useState(false);

  const questions = useSelector(getLoveLanguageQuestions);

  const onClickSubmit = () => {
    setIsSubmit(true);
    let hasError = false;

    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers?.length; j++) {
        if (questions[i].answers?.[j].hasError || !questions[i].answers?.[j].value) {
          hasError = true;
          break;
        }
      }
      if (hasError) {
        break;
      }
    }

    if (hasError) {
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

      <Button variant="contained" onClick={onClickSubmit} style={{ marginLeft: 15, height: 35, minWidth: 90 }}>
        {isSubmit && <CircularProgress sx={{ color: '#fff' }} size={25}/>}
        {!isSubmit && 'Submit'}
      </Button>

      <Dialog onClose={() => setShowErrorDialog(false)} open={showErrorDialog} sx={{ top: -400 }}>
        <DialogTitle className="text-md text-red-600"><ErrorIcon
            className="mr-2"/><span>Hãy trả lời tất cả câu hỏi nào!</span></DialogTitle>
      </Dialog>
    </div>
  );
};

export default GiftAssessment;
