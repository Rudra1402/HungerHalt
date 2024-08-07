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

export const getItemsByPartner = async (setItems, pId, setIsLoading) => {
    setIsLoading(true)
    let userId = getUserId()
    let headers = {}
    if (userId) {
        headers = { ...headers, userId: userId };
    }

    const config = headers && Object.keys(headers).length > 0 ? { headers } : {};

    await api.get(`/item/partner/${pId}`, config)
        .then(response => {
            setItems(response.data?.items);
            setIsLoading(false)
        }).catch(err => {
            console.log(err?.response?.data?.message)
            setIsLoading(false)
        })
}

export const addItemForPartner = async (pId, price, quantity, postId, setReRender, setOpenAddItemialog) => {
    let userId = getUserId()
    let headers = {}
    if (userId) {
        headers = { ...headers, userId: userId };
    }

    const config = headers && Object.keys(headers).length > 0 ? { headers } : {};

    const payload = {
        price,
        quantity,
        postId,
        partnerId: pId
    }

    await api.post(`/item`, payload, config)
        .then(response => {
            setReRender(new Date().getTime())
            setOpenAddItemialog(false)
        }).catch(err => {
            console.log(err?.response?.data?.message)
            // setIsLoading(false)
        })
}

export const deletedItemApi = async (itemId, setReRender, setDeleteAddItemialog) => {
    let userId = getUserId()
    let headers = {}
    if (userId) {
        headers = { ...headers, userId: userId };
    }

    const config = headers && Object.keys(headers).length > 0 ? { headers } : {};

    await api.delete(`/item/${itemId}`, config)
        .then(response => {
            setReRender(new Date().getTime())
            setDeleteAddItemialog(false)
        }).catch(err => {
            console.log(err?.response?.data?.message)
        })
}