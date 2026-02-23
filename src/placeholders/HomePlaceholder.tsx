import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'

const HomePlaceholder = () => {
  const phstat = <Skeleton animation='pulse' variant='rounded' height={83} />
  const phb = <Skeleton animation='pulse' variant='rounded' height={54} />
  const phs = <Skeleton animation='pulse' variant='rounded' height={16} />
  const phlarge = <Skeleton animation='pulse' variant='rounded' height={139.5} />

  return (
    <Grid container justifyContent='center'>
      <div className='home-page-container'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {phstat}
          </Grid>
        </Grid>

        <Grid container spacing={1} mt={2}>
          <Grid item xs={6}>
            {phb}
          </Grid>
          <Grid item xs={6}>
            {phb}
          </Grid>
          <Grid item xs={6}>
            {phb}
          </Grid>
          <Grid item xs={6}>
            {phb}
          </Grid>
          <Grid item xs={12}>
            {phb}
          </Grid>
          <Grid item xs={12}>
            {phlarge}
          </Grid>
          <Grid item xs={12}>
            {phlarge}
          </Grid>
        </Grid>

        <Grid container spacing={1} mt={3}>
          <Grid item xs={6}>
            {phb}
          </Grid>
          <Grid item xs={6}>
            {phb}
          </Grid>
        </Grid>
      </div>
    </Grid>
  )
}

export default HomePlaceholder
