import { cleanupOldStorageKeys } from './helpers/cleanupOldStorage'
import Router from './router/Router'
import AppStateProvider from './contexts/AppStateContext/AppStateContext'
import './App.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import AppSettingsProvider from './contexts/AppSettingsContext/AppSettingsContext'

cleanupOldStorageKeys()

function App() {
  return (
    <AppStateProvider>
      <AppSettingsProvider>
        <Router />
      </AppSettingsProvider>
    </AppStateProvider>
  )
}

export default App
