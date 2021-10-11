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
import { Line } from 'react-chartjs-2';

import { GiftTitle, GiftType } from '../constant';

const GiftTab: React.FC = () => {
  const [ isLoaded, setIsLoaded ] = useState(false);
  const [ result, setResult ]: [ any, any ] = useState(null);

  useEffect(() => {
    const storageResult: any = JSON.parse(localStorage.getItem('giftResult') || 'null');

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
    <div>
      {
        !isLoaded && <div className="mb-3">
          <Skeleton variant="rectangular" height={20} className="mt-1 w-full md:w-3/4 lg:w-2/3"/>
          <Skeleton variant="rectangular" height={50} className="mt-1 w-full md:w-3/4 lg:w-2/3"/>
          <Skeleton variant="rectangular" height={150} className="mt-1 w-full md:w-3/4 lg:w-2/3"/>
          <Skeleton variant="rectangular" height={100} className="mt-1 w-full md:w-3/4 lg:w-2/3"/>
        </div>
      }

      {
        isLoaded && !result && <div className="mb-5">
          Chưa có kết quả. Làm khảo sát ngay nhé!</div>
      }

      {
        isLoaded && result &&
        <Box>
          <p className="mb-5 text-bold">Kết quả của bạn</p>

          {/*{GiftResultTable(result)}*/}
          {GiftLineChartResult(result)}
        </Box>
      }

      <Box sx={{ mt: 5 }}>
        <Button variant="contained">
          <Link href="/gift-assessment">
          <span>
          Làm {result && 'lại'} khảo sát
        </span>
          </Link>
        </Button>
      </Box>
    </div>
  );
};

const GiftResultTable = (result: any) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="result table">
        <TableHead>
          <TableRow>
            <TableCell align="left"><strong>ID</strong></TableCell>
            <TableCell align="left"><strong>Tên ân tứ</strong></TableCell>
            <TableCell align="left"><strong>Điểm</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[ ...result ]
            .sort((a: any, b: any) => b.mark - a.mark)
            .map((row: any, index: number) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >

                <TableCell align="left">{index + 1}</TableCell>
                <TableCell align="left">{GiftTitle[row.type as GiftType]}</TableCell>
                <TableCell align="left">{row.mark}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const GiftLineChartResult = (result: any) => {
  let labels: string[] = [];
  let chartData: number[] = [];
  result.forEach((x: any) => {
    labels.push(GiftTitle[x.type as GiftType]);
    chartData.push(x.mark);
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Điểm',
        data: chartData,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)'
      }
    ]
  };

  const options: any = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 100
          }
        } ]
    }
  };
  return <Line data={data} options={options}/>;
};

export default GiftTab;