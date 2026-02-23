import Skeleton from '@mui/material/Skeleton'

const TopicPlaceholder = () => {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Skeleton animation='pulse' variant='rounded' height={22} width={150} />
        <Skeleton animation='pulse' variant='rounded' height={22} width={40} />
      </div>

      <div style={{ display: 'flex', gap: 4, marginTop: 12 }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} animation='pulse' variant='rounded' height={28} width={28} />
        ))}
      </div>

      <Skeleton animation='pulse' variant='rounded' height={1} sx={{ mt: 1.5, mb: 1.5 }} />

      <Skeleton animation='pulse' variant='rounded' height={180} sx={{ mb: 1.5 }} />

      <Skeleton animation='pulse' variant='rounded' height={18} sx={{ mb: 2 }} />
      <Skeleton animation='pulse' variant='rounded' height={18} width='70%' sx={{ mb: 2 }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Skeleton animation='pulse' variant='rounded' height={43} />
        <Skeleton animation='pulse' variant='rounded' height={43} />
        <Skeleton animation='pulse' variant='rounded' height={43} />
        <Skeleton animation='pulse' variant='rounded' height={43} />
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <Skeleton animation='pulse' variant='rounded' height={16} width={80} />
        <Skeleton animation='pulse' variant='rounded' height={16} width={80} />
        <Skeleton animation='pulse' variant='rounded' height={16} width={80} />
      </div>
    </>
  )
}

export default TopicPlaceholder
