export const setShowRightAnswersLocalStorageFlag = (value: boolean) => {
  localStorage.setItem('showRightAnswer', value.toString())
}

export const getShowRightAnswersLocalStorageFlag = () => {
  return localStorage.getItem('showRightAnswer') === 'true'
}
