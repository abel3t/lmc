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
          Ng??n ng??? y??u th????ng
        </Box>
        <div className="p-2 md:p-3 lg:p-4 text-sm">
          B???n c?? bi???t ng??n ng??? y??u th????ng c???a m??nh, ng??n ng??? m?? khi ai ???? b??y t??? v???i b???n, b???n s??? c???m th???y ???????c y??u
          th????ng nh???t? Quan tr???ng h??n, b???n c?? bi???t ng??n ng??? y??u th????ng c???a nh???ng ng?????i chung quanh m??nh ????? b??y t??? t??nh
          y??u th????ng v?? s??? quan t??m c???a b???n cho h??? theo c??ch h??? mong ?????i nh???t? B???n tr???c nghi???m ng??n ng??? y??u th????ng n??y
          s??? gi??p b???n!
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
            className="mr-2"/><span>H??y tr??? l???i t???t c??? c??u h???i n??o!</span></DialogTitle>
      </Dialog>
    </div>
  );
};

export default GiftAssessment;
