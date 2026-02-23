import Skeleton from '@mui/material/Skeleton'

const fullWidth = {
  width: '100vw',
  marginLeft: 'calc(-50vw + 50%)',
  boxSizing: 'border-box' as const,
}

const TopicPlaceholder = () => {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Skeleton animation='pulse' variant='rounded' height={22} width={150} />
        <Skeleton animation='pulse' variant='rounded' height={22} width={40} />
      </div>

      <div
        style={{
          ...fullWidth,
          display: 'flex',
          gap: 0,
          marginTop: 12,
          padding: '0 8px 6px',
          background: 'var(--question-number-bg)',
        }}
      >
        {Array.from({ length: 80 }).map((_, i) => (
          <Skeleton
            key={i}
            animation='pulse'
            variant='rectangular'
            height={36}
            width={36}
            className='placeholder-question-number'
          />
        ))}
      </div>

      <div style={{ ...fullWidth, height: 1, borderBottom: '1px solid var(--hr)', marginBottom: 12 }} />

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
