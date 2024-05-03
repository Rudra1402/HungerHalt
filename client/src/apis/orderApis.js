import api from '../axios/axios'
import Toast from '../custom/CustomToast'
import { getUserId } from '../utils/getUser'

export const placeOrder = async (payload, setIsLoading) => {
    setIsLoading(true)
    let userId = getUserId()
    let headers = {}
    if (userId) {
        headers = { ...headers, userId: userId };
    }

    const config = headers && Object.keys(headers).length > 0 ? { headers } : {};

    await api.post('/order', payload, config)
        .then(response => {
            console.log("Order placed!")
            setIsLoading(false)
        }).catch(err => {
            console.log(err?.response?.data?.message)
            setIsLoading(false)
        })
}