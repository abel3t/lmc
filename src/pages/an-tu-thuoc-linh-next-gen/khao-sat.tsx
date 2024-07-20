import React, { useEffect, useState } from 'react';

import { Box, Button, CircularProgress, Dialog, DialogTitle } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

import GiftQuestion from '../../components/GiftQuestion';
import { useDispatch, useSelector } from 'react-redux';
import { getGiftQuestions, updateGiftQuestion, updateGiftQuestions } from '../../slices/next-gen-gift.slice';
import { nextGenGiftQuestions } from '../../constant';

const GiftAssessment: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const dispatch = useDispatch();
  const questions = useSelector(getGiftQuestions);

  const totalPerPage = 10;
  const totalPages = Math.ceil(nextGenGiftQuestions.length / totalPerPage);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    const defaultQuestions = JSON.parse(localStorage.getItem('nextGenGiftQuestions') || 'null');

    if (defaultQuestions) {
      console.log(defaultQuestions);
      dispatch(updateGiftQuestions(defaultQuestions));
    }
  }, []);

  const onClickPrev = () => {
    setCurrentPage(currentPage - 1);
  };

  const onClickNext = () => {
    setIsSubmit(false);

    let hasError = false;
    let result: any = {};
    Object.values(questions)
      .slice((currentPage - 1) * totalPerPage, currentPage * totalPerPage)
      .forEach((question: any) => {
        if (!question.value) {
          hasError = true;
          dispatch(
            updateGiftQuestion({
              id: question.id,
              question: { hasError: true }
            })
          );
          result[question.id] = { type: question.type, mark: 0 };
        } else {
          result[question.id] = { type: question.type, mark: question.value };
        }
      });

    if (!hasError) {
      setCurrentPage(currentPage + 1);
    } else {
      setShowErrorDialog(true);
    }
  };

  const onClickSubmit = () => {
    setIsSubmit(true);

    let hasError = false;
    let result: any = {};
    Object.values(questions).forEach((question: any) => {
      if (!question.value) {
        hasError = true;
        dispatch(updateGiftQuestion({ id: question.id, question: { hasError: true } }));
        result[question.id] = { type: question.type, mark: 0 };
      } else {
        result[question.id] = { type: question.type, mark: question.value };
      }
    });

    if (!hasError) {
      localStorage.setItem('nextGenGiftQuestions', JSON.stringify(questions));
      localStorage.setItem('nextGenGiftResult', JSON.stringify(result));

      window.open('/an-tu-thuoc-linh-next-gen', '_self');
    } else {
      setShowErrorDialog(true);
      setIsSubmit(false);
    }
  };

  return (
    <div className='p-2 sm:p-3 md:p-4 lg:p-5 flex flex-col items-center bg-blue-200' style={{ minHeight: '100vh' }}>
      <div className='w-full md:w-3/4 lg:w-2/3 mb-3 border-gray-400 rounded-lg bg-white'>
        <Box
          className='text-2xl md:text-3xl text-center text-white rounded-t-lg border-green-100 py-3 w-full'
          sx={{ bgcolor: 'primary.main' }}
        >
          Ân tứ thuộc linh
        </Box>
        <div className='p-2 md:p-3 lg:p-4 text-sm'>
          <p>
            Em hãy trả lời {nextGenGiftQuestions.length} câu hỏi bằng cách chấm mức độ đúng với khả năng/xu hướng/tâm
            tình của mình.
          </p>
          <p>
            Đúng nhất với mình là điểm 10, không đúng nhất với mình là điểm 1. Chấm điểm ngay cho các câu mô tả được đưa
            ra. Đừng suy nghĩ cẩn thận quá, đây là chỉ là khảo sát.
          </p>
        </div>
      </div>

      {Object.values(questions)
        .slice((currentPage - 1) * totalPerPage, currentPage * totalPerPage)
        .map((question: any) => (
          <GiftQuestion index={question.id as number} key={question.id} question={question} isNextGen={true} />
        ))}

      <div className='w-full md:w-3/4 lg:w-2/3 mb-3 border-gray-400 rounded-lg'>
        {currentPage === 1 && (
          <Button variant='contained' onClick={onClickNext}>
            Next
          </Button>
        )}

        {currentPage > 1 && currentPage < totalPages && (
          <Box>
            <Button variant='contained' onClick={onClickPrev} sx={{ height: 35, minWidth: 60 }}>
              Prev
            </Button>
            <Button variant='contained' onClick={onClickNext} style={{ marginLeft: 10, height: 35, minWidth: 60 }}>
              Next
            </Button>
          </Box>
        )}

        {currentPage === totalPages && (
          <Box>
            <Button variant='contained' onClick={onClickPrev} sx={{ height: 35, minWidth: 60 }}>
              Prev
            </Button>
            <>
              {isSubmit && (
                <Button variant='contained' style={{ marginLeft: 15, height: 35, minWidth: 90 }}>
                  <CircularProgress sx={{ color: '#fff' }} size={25} />
                </Button>
              )}

              {!isSubmit && (
                <Button
                  variant='contained'
                  onClick={onClickSubmit}
                  style={{ marginLeft: 15, height: 35, minWidth: 90 }}
                >
                  Submit
                </Button>
              )}
            </>
          </Box>
        )}
      </div>

      <Dialog onClose={() => setShowErrorDialog(false)} open={showErrorDialog} sx={{ top: -400 }}>
        <DialogTitle className='text-md text-red-600'>
          <ErrorIcon className='mr-2' />
          <span>Hãy trả lời tất cả câu hỏi nào!</span>
        </DialogTitle>
      </Dialog>
    </div>
  );
};

export default GiftAssessment;
