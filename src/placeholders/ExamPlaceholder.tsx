import Skeleton from '@mui/material/Skeleton'

const ExamPlaceholder = () => {
  return (
    <div style={{ maxWidth: 420, margin: '0 auto' }}>
      <div style={{ border: '1px solid var(--hr)', borderRadius: 8, padding: 24 }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <Skeleton animation='pulse' variant='rounded' height={24} width={140} sx={{ margin: '0 auto' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Skeleton animation='pulse' variant='circular' width={20} height={20} sx={{ flexShrink: 0 }} />
            <Skeleton animation='pulse' variant='rounded' height={18} width='80%' />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Skeleton animation='pulse' variant='circular' width={20} height={20} sx={{ flexShrink: 0 }} />
            <Skeleton animation='pulse' variant='rounded' height={18} width='65%' />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Skeleton animation='pulse' variant='circular' width={20} height={20} sx={{ flexShrink: 0 }} />
            <Skeleton animation='pulse' variant='rounded' height={18} width='75%' />
          </div>
        </div>

        <Skeleton animation='pulse' variant='rounded' height={48} />
      </div>
    </div>
  )
}

export default ExamPlaceholder
