import api from '../axios/axios'
import Toast from '../custom/CustomToast'
import { getUserId } from '../utils/getUser'

export const getItems = async (setItems, setIsLoading) => {
    setIsLoading(true)
    let userId = getUserId()
    let headers = {}
    if (userId) {
        headers = { ...headers, userId: userId };
    }

    const config = headers && Object.keys(headers).length > 0 ? { headers } : {};

    await api.get(`/item`, config)
        .then(response => {
            setItems(response.data?.items);
            setIsLoading(false)
        }).catch(err => {
            console.log(err?.response?.data?.message)
            setIsLoading(false)
        })
}