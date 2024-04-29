import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

// new array of 8 elements
const arr = Array.from({ length: 9 });

const TopicsPlaceholder = () => {
  const phb = <Skeleton animation='pulse' variant='rounded' height={20} />;
  const phs = <Skeleton animation='pulse' variant='rounded' height={16} />;

  const line = (
    <>
      <Grid item xs={9}>
        {phb}
      </Grid>
      <Grid item xs={1}>
        {phb}
      </Grid>
      <Grid item xs={1}>
        {phb}
      </Grid>
      <Grid item xs={1}>
        {phb}
      </Grid>
      <Grid item xs={12}>
        <Skeleton animation='pulse' variant='rounded' height={7} />
      </Grid>
    </>
  );

  return (
    <>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12}>
          <Skeleton animation='pulse' variant='rounded' height={25} />
        </Grid>
      </Grid>

      <Grid container spacing={1} mt={1.6}>
        {line}
      </Grid>

      {arr.map((_, index) => (
        <Grid key={index} container spacing={1} mt={2.91}>
          {line}
        </Grid>
      ))}

      <Grid container spacing={1} mt={2} justifyContent='flex-end'>
        <Grid item xs={2}>
          {phs}
        </Grid>
      </Grid>
    </>
  );
};

export default TopicsPlaceholder;
