import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { updateUser } from "@/redux/userSlice"

export default function useAuthStatus() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        const checkIsUserLogged = async () => {
            setLoading(true)
            try {
                const response = await fetch('/api/auth/me', {
                    method: "GET",
                    headers: {
                        "Accept": 'application/json',
                        "Content-Type": 'application/json'
                    },
                    credentials: 'include'
                })
                const data = await response.json()

                if (response?.ok) {
                    setUser(data?.data)
                    dispatch(updateUser(data?.data))
                } else {
                    setUser(null)
                    dispatch(updateUser(null))
                }
            } catch (e) {
                setUser(null)
                dispatch(updateUser(null))
            } finally {
                setLoading(false)
            }
        }

        checkIsUserLogged()
    }, [])

    return { user, loading }
}