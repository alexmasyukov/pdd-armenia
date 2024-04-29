import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

const HomePlaceholder = () => {
  const phb = <Skeleton animation='pulse' variant='rounded' height={54} />;
  const phstat = <Skeleton animation='pulse' variant='rounded' height={66} />;
  const phs = <Skeleton animation='pulse' variant='rounded' height={16} />;

  return (
    <Grid container justifyContent='center'>
      <div className='home-page-container'>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12}>
            {phstat}
          </Grid>
        </Grid>

        <Grid container spacing={1} mt={2}>
          <Grid item sm={6} xs={12}>
            {phb}
          </Grid>
          <Grid item sm={6} xs={12}>
            {phb}
          </Grid>
          <Grid item sm={6} xs={12}>
            {phb}
          </Grid>
          <Grid item sm={6} xs={12}>
            {phb}
          </Grid>
          <Grid item xs={12}>
            {phb}
          </Grid>
        </Grid>

        <Grid container spacing={1} mt={2}>
          <Grid item xs={5}>
            {phs}
          </Grid>
          <Grid item xs={7}></Grid>
          <Grid item xs={5}>
            {phs}
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};

export default HomePlaceholder;
