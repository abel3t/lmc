import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import Link from 'next/link';

const LoveLanguageTab: React.FC = () => {
  const [ result, setResult ]: [ any, any ] = useState(null);

  useEffect(() => {
    const storageResult: any = JSON.parse(localStorage.getItem('loveLanguageResult') || 'null');

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
  });

  return (
    <div>
      {
        result && <div>
          Ngôn ngữ yêu thương
        </div>
      }
      <Box sx={{ mt: 5 }}>
        <Button variant="contained">
          <Link href="/love-language-assessment">
            Làm khảo sát
          </Link>
        </Button>
      </Box>
    </div>
  );
};

export default LoveLanguageTab;
