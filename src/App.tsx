import Router from './router/Router';
import SettingsProvider from './contexts/SettingsContext/SettingsContext';
// import logo from './logo.svg';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <SettingsProvider>
      <Router />
    </SettingsProvider>
  );
}

export default App;
