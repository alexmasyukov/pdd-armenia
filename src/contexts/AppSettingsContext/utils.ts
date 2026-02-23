import { Theme } from './AppSettingsContext'

export const changeThemeBodyClass = (theme: Theme) => {
  const classForDelete = theme === 'light' ? 'dark-theme' : 'light-theme'
  const classForAdd = theme === 'light' ? 'light-theme' : 'dark-theme'

  const body = document.body
  body.classList.remove(classForDelete)
  body.classList.add(classForAdd)
}

export const setThemeToLocalStorage = (theme: Theme) => {
  localStorage.setItem('theme', theme)
}

export const getThemeFromLocalStorage = (): Theme => {
  return (localStorage.getItem('theme') as Theme) ?? 'dark'
}
