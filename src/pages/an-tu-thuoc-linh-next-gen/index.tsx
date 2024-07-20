import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Button,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

import { NextGenGiftTitle, NextGenGiftType } from '../../constant';
import { styled } from '@mui/system';

const GiftTab: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [result, setResult]: [any, any] = useState(null);

  useEffect(() => {
    const storageResult: any = JSON.parse(localStorage.getItem('nextGenGiftResult') || 'null');

    if (storageResult) {
      const data: any = Object.values(storageResult).reduce((acc: any, current: any) => {
        acc[current.type] = {
          ...(acc[current.type] || {}),
          type: current.type,
          mark: (acc[current.type]?.mark || 0) + current.mark
        };
        return acc;
      }, {});

      setResult(Object.values(data));
    }

    setIsLoaded(true);
  }, []);

  return (
    <div className='mt-8 p-2 sm:p-3 md:p-5 lg:p-10 border rounded-lg w-full md:w-3/4 lg:w-2/3 mb-2'>
      {!isLoaded && (
        <div className='mb-3'>
          <Skeleton variant='rectangular' height={20} className='mt-1 w-full md:w-3/4 lg:w-2/3' />
          <Skeleton variant='rectangular' height={50} className='mt-1 w-full md:w-3/4 lg:w-2/3' />
          <Skeleton variant='rectangular' height={150} className='mt-1 w-full md:w-3/4 lg:w-2/3' />
          <Skeleton variant='rectangular' height={100} className='mt-1 w-full md:w-3/4 lg:w-2/3' />
        </div>
      )}

      {isLoaded && !result && <div className='mb-5'>Chưa có kết quả. Làm khảo sát ngay nhé!</div>}

      {isLoaded && result && (
        <Box>
          <p className='mb-5 text-bold'>Kết quả của bạn</p>

          {GiftResultTable(result)}
          {/*{GiftLineChartResult(result)}*/}
          {/*{GiftRadarChartResult(result)}*/}
        </Box>
      )}

      <Box sx={{ mt: 5 }}>
        <Button variant='contained'>
          <Link href='/an-tu-thuoc-linh-next-gen/khao-sat'>
            <span>Làm {result && 'lại'} khảo sát</span>
          </Link>
        </Button>
      </Box>
    </div>
  );
};

const GiftResultTable = (result: any) => {
  const StyledTableRow = styled(TableRow)(({ theme }: any) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    },
    '&:last-child td, &:last-child th': {
      border: 0
    }
  }));

  return (
    <TableContainer component={Paper}>
      <Table aria-label='result table'>
        <TableHead>
          <StyledTableRow>
            <TableCell align='left'>
              <strong>ID</strong>
            </TableCell>
            <TableCell align='left'>
              <strong>Tên ân tứ</strong>
            </TableCell>
            <TableCell align='left'>
              <strong>Điểm</strong>
            </TableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {[...result]
            .sort((a: any, b: any) => b.mark - a.mark)
            .map((row: any, index: number) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align='left'>{index + 1}</TableCell>
                <TableCell align='left'>{NextGenGiftTitle[row.type as NextGenGiftType]}</TableCell>
                <TableCell align='left'>{row.mark}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GiftTab;
