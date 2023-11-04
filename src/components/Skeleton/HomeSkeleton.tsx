import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

const HomeSkeleton: React.FC = () => {
  return (
    <Grid item xs={12}>
      <Skeleton animation='wave' />
      <Skeleton animation='wave' />
      <Skeleton animation='wave' />
      <Skeleton animation='wave' />
    </Grid>
  );
};

export default HomeSkeleton;
