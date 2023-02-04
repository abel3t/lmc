import type { NextPage } from 'next';
import { Divider } from '@mui/material';
import { QuestionBarType } from '../constant';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Home: NextPage = () => {
  const [type, setType] = useState(QuestionBarType.LoveLanguage);

  useEffect(() => {
    const questionBarType = parseInt(localStorage.getItem('questionBarType') || '') || QuestionBarType.LoveLanguage;

    setType(questionBarType);
  }, []);

  return (
    <div>
      <p className='mt-2 text-3xl font-bold text-center'>
        Chào mừng bạn đến với website khảo sát của môn Kỹ Năng Mục Vụ!
      </p>

      <div className='p-10'>
        <p className='text-2xl text-bold'>Bạn có thể chọn các khảo sát sau:</p>
        <ul className='text-blue-500 text-xl pt-3'>
          <li className='hover:text-blue-600'>
            <Link href='/an-tu-thuoc-linh'>Ân tứ thuộc linh</Link>
          </li>

          <li className='hover:text-blue-600'>
            <Link href='/ngon-ngu-yeu-thuong'>Ngôn ngữ yêu thương</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
