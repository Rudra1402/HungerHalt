import api from '../axios/axios'
import Toast from '../custom/CustomToast'

export const predictHandler = async (payload, setPredictionValue, setIsValuePredicted) => {
    await api.post('/predict', payload)
        .then(res => {
            setPredictionValue(res.data.prediction)
            setIsValuePredicted(false)
        }).catch(err => {
            console.log(err?.res?.data?.message)
        })
}