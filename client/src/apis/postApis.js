import api from '../axios/axios'
import Toast from '../custom/CustomToast'
import { getUserId } from '../utils/getUser'

export const getAllPosts = async (setPosts, setIsLoading) => {
    setIsLoading(true)
    let userId = getUserId()
    let headers = {}
    if (userId) {
        headers = { ...headers, userId: userId };
    }

    const config = headers && Object.keys(headers).length > 0 ? { headers } : {};

    await api.get('/post', config)
        .then(response => {
            setPosts(response.data?.posts)
            setIsLoading(false)
        }).catch(err => {
            console.log(err?.response?.data?.message)
            setIsLoading(false)
        })
}

export const getPostByPartnerId = async (id, setPosts, setIsLoading) => {
    setIsLoading(true)
    let userId = getUserId()
    let headers = {}
    if (userId) {
        headers = { ...headers, userId: userId };
    }

    const config = headers && Object.keys(headers).length > 0 ? { headers } : {};

    await api.get(`/post/${id}`, config)
        .then(response => {
            setPosts(response.data?.posts)
            setIsLoading(false)
        }).catch(err => {
            console.log(err?.response?.data?.message)
            setIsLoading(false)
        })
}

export const addPostForPartner = async (pId, title, description, setReRender, setOpenAddPostDialog, imageUrl = "https://i.pinimg.com/originals/11/29/1b/11291b781cd4d7d055d2f5cbe54a42cc.jpg") => {
    let userId = getUserId()
    let headers = {}
    if (userId) {
        headers = { ...headers, userId: userId };
    }

    const config = headers && Object.keys(headers).length > 0 ? { headers } : {};

    const payload = {
        title,
        description,
        imageUrl
    }

    await api.post(`/post/${pId}`, payload, config)
        .then(response => {
            setReRender(new Date().getTime())
            setOpenAddPostDialog(false)
        }).catch(err => {
            console.log(err?.response?.data?.message)
            // setIsLoading(false)
        })
}