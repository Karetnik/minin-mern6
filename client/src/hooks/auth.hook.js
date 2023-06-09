import {useCallback, useEffect, useState} from "react";

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [ready, setReady] = useState(false)
  const [userId, setUserId] = useState(null)

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken)
    setUserId(id)

    localStorage.setItem(storageName, JSON.stringify({
      token: jwtToken,
      userId: id
    }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)

    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))
    console.log(data)
    if (data && data.token) {
      login(data.token, data.userId)
    }
    setReady(true)
  }, [])

  return {token, userId, login, logout, ready}
}