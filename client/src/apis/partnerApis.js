import api from '../axios/axios'
import Toast from '../custom/CustomToast'
import { getUserId } from '../utils/getUser'

export const partnersByType = async (t) => {
    let userId = getUserId()
    let headers = {}
    if (userId) {
        headers = { ...headers, userId: userId };
    }

    const config = headers && Object.keys(headers).length > 0 ? { headers } : {};

    await api.get(`/partner/${t}`, config)
        .then(response => {
            console.log(response.data?.partners);
        }).catch(err => {
            console.log(err?.response?.data?.message)
        })
}

export const allPartners = async (setPartners, setStores, setRestaurants, setDcenters, setIsLoading) => {
    setIsLoading(true)
    let userId = getUserId()
    let headers = {}
    if (userId) {
        headers = { ...headers, userId: userId };
    }

    const config = headers && Object.keys(headers).length > 0 ? { headers } : {};

    await api.get('/partner', config)
        .then(response => {
            let p = response.data?.partners, s = [], r = [], d = []
            setPartners(p)
            p?.map(row => {
                if (row?.partnerType == "s") s.push(row)
                if (row?.partnerType == "r") r.push(row)
                if (row?.partnerType == "d") d.push(row)
            })
            setStores(s)
            setRestaurants(r)
            setDcenters(d)
            setIsLoading(false)
        }).catch(err => {
            console.log(err?.response?.data?.message)
            setIsLoading(false)
        })
}

export const getPartnerDataById = async (id, setPartnerData, setIsLoading) => {
    setIsLoading(true)
    let userId = getUserId()
    let headers = {}
    if (userId) {
        headers = { ...headers, userId: userId };
    }

    const config = headers && Object.keys(headers).length > 0 ? { headers } : {};

    await api.get(`/partner/${id}`, config)
        .then(response => {
            setPartnerData(response.data?.partner);
            setIsLoading(false)
        }).catch(err => {
            console.log(err?.response?.data?.message)
            setIsLoading(false)
        })
}