import type { NextPage } from 'next';
import { Box, Button } from '@mui/material';

const Home: NextPage = () => {
  return (
    <Box>
      <Box>
        Chưa có kết quả
      </Box>

      <Box sx={{ mt: 5 }}>
        <Button variant="contained">
          Làm khảo sát
        </Button>
      </Box>

    </Box>
  );
};

export default Home;
