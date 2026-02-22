import React, { useEffect, useState } from 'react'
import { useFirebase } from '../../contexts/FirebaseContext'
import { FirebaseGroup } from '../../types'

const FirebaseGroups = () => {
  const { fetchGroups } = useFirebase()
  const [groups, setGroups] = useState<FirebaseGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetchGroups()
      .then(setGroups)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const json = JSON.stringify(groups, null, 2)

  const handleCopy = () => {
    navigator.clipboard.writeText(json).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  if (loading) return <div style={{ padding: 24 }}>Загрузка...</div>

  return (
    <div style={{ padding: 24 }}>
      <h1>Firebase Groups ({groups.length})</h1>
      <button
        onClick={handleCopy}
        style={{
          padding: '8px 16px',
          marginBottom: 16,
          fontSize: 16,
          cursor: 'pointer',
        }}
      >
        {copied ? 'Скопировано!' : 'Копировать JSON'}
      </button>
      <pre
        style={{
          background: '#1e1e1e',
          color: '#d4d4d4',
          padding: 16,
          borderRadius: 8,
          overflow: 'auto',
          maxHeight: '80vh',
          fontSize: 13,
        }}
      >
        {json}
      </pre>
    </div>
  )
}

export default FirebaseGroups
