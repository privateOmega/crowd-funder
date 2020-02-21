export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("crowd-funder-user")
    ? JSON.parse(window.localStorage.getItem("crowd-funder-user"))
    : {}

const setUser = user =>
  window.localStorage.setItem("crowd-funder-user", JSON.stringify(user))

export const handleLogin = ({ username, password }) => {
  if (username === `admin` && password === `password`) {
    return setUser({
      username: `admin`,
      name: `Admin user`,
      email: `admin@example.com`,
    })
  }
  return false
}

export const isLoggedIn = () => {
  const user = getUser()
  return !!user.username
}

export const logout = callback => {
  setUser({})
  callback()
}
