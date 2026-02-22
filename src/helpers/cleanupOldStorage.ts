export const cleanupOldStorageKeys = () => {
  try {
    const hasFavorite = localStorage.getItem('favorite') !== null

    let hasOldKeys = hasFavorite
    const keysToRemove: string[] = []

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith('q-') && !key.startsWith('q2026-')) {
        keysToRemove.push(key)
        hasOldKeys = true
      }
    }

    if (!hasOldKeys) return

    if (hasFavorite) localStorage.removeItem('favorite')
    keysToRemove.forEach((key) => localStorage.removeItem(key))
  } catch (e) {
    // ignore
  }
}
