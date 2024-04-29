import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

const TopicPlaceholder = () => {
  const phb = <Skeleton animation='pulse' variant='rounded' height={43} />;
  const phs = <Skeleton animation='pulse' variant='rounded' height={16} />;

  return (
    <>
      <Grid container spacing={1} mt={0.5}>
        <Grid item xs={12}>
          <Skeleton animation='pulse' variant='rounded' height={12} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton animation='pulse' variant='rounded' height={49} />
        </Grid>
      </Grid>

      <Grid container spacing={1} mt={2}>
        <Grid item xs={12}>
          <Skeleton animation='pulse' variant='rounded' height={90} width={200} />
        </Grid>
      </Grid>

      <Grid container spacing={1} mt={2}>
        <Grid item sm={6} xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              {phb}
            </Grid>
            <Grid item xs={12}>
              {phb}
            </Grid>
            <Grid item xs={12}>
              {phb}
            </Grid>
            <Grid item xs={12}>
              {phb}
            </Grid>
            <Grid item xs={12}>
              {phb}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={1} mt={2}>
        <Grid item sm={3} xs={6}>
          {phs}
        </Grid>
        <Grid item sm={9} xs={6} />

        <Grid item sm={3} xs={6}>
          {phs}
        </Grid>
        <Grid item sm={9} xs={6} />

        <Grid item sm={3} xs={6}>
          {phs}
        </Grid>
        <Grid item sm={9} xs={6} />
      </Grid>
    </>
  );
};

export default TopicPlaceholder;
