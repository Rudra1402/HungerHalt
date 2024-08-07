import api from '../axios/axios'
import Toast from '../custom/CustomToast'
import { getUserId } from '../utils/getUser'

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
                    isPartner: userData?.isPartner,
                    hasVoted: userData?.hasVoted,
                    votedTo: userData?.votedTo
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

export const userVote = async (votedTo, setReRender, setSelectedVote) => {
    let userId = getUserId()
    let headers = {}
    if (userId) {
        headers = { ...headers, userId: userId };
    }

    const config = headers && Object.keys(headers).length > 0 ? { headers } : {};

    const payload = {
        voterId: getUserId(),
        votedToId: votedTo
    }

    await api.post(`/user/vote`, payload, config)
        .then(response => {
            setReRender(new Date().getTime())
            Toast.success(response.data?.message)
        }).catch(err => {
            console.log(err?.response?.data?.message)
        }).finally(() => {
            setSelectedVote("")
        })
}