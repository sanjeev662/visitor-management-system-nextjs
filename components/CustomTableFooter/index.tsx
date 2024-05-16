import React, { FC } from 'react';
import { Box, Button } from '@mui/material';

interface CustomTableFooterProps {
  pageno: string;
  handleClickPrev: () => void;
  handleClickNext: () => void;
}

const CustomTableFooter: FC<CustomTableFooterProps> = ({ pageno, handleClickPrev, handleClickNext }) => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={2}>
      <Button onClick={handleClickPrev} disabled={pageno === "1"}>Previous</Button>
      <span>Page {pageno}</span>
      <Button onClick={handleClickNext} disabled={pageno === ""}>Next</Button>
    </Box>
  );
};

export default CustomTableFooter;

