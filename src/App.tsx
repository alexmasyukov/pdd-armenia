import Router from './router/Router'
import AppStateProvider from './contexts/AppStateContext/AppStateContext'
// import logo from './logo.svg';
import './App.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import AppSettingsProvider from './contexts/AppSettingsContext/AppSettingsContext'
import { FirebaseProvider } from './contexts/FirebaseContext'

function App() {
  return (
    <FirebaseProvider>
      <AppStateProvider>
        <AppSettingsProvider>
          <Router />
        </AppSettingsProvider>
      </AppStateProvider>
    </FirebaseProvider>
  )
}

export default App
