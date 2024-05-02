import api from '../axios/axios'
import Toast from '../custom/CustomToast'

export const userSignin = async (payload, setUser, setIsLoading) => {
    setIsLoading(true)
    await api.post('/user/signin', payload)
        .then(response => {
            if (response.data?.user?.token) {
                let userData = response.data?.user;
                setUser(userData)
                localStorage.setItem("user", JSON.stringify({
                    id: userData?.id,
                    partnerId: userData?.partnerId,
                    email: userData?.email,
                    token: userData?.token,
                    active: userData?.active,
                    isPartner: userData?.isPartner
                }))
            }
        }).catch(err => {
            Toast.error(err?.response?.data?.message)
            setIsLoading(false)
        })
}

export const userSignup = async (payload) => {
    await api.post('/user/signup', payload)
        .then(response => {
            console.log("Signup Success!")
        }).catch(err => {
            Toast.error(err?.response?.data?.message)
        })
}