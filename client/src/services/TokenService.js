const { REACT_APP_TOKEN_PREFIX } = process.env

export const getToken = () => localStorage.getItem(`${REACT_APP_TOKEN_PREFIX}`)

export const setToken = token =>
  localStorage.setItem(`${REACT_APP_TOKEN_PREFIX}`, token)

export const removeToken = () => localStorage.clear()
