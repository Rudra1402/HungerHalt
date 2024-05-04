import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getOrdersByPartnerId } from '../../apis/orderApis';
import AppContext from '../../context/AppContext';
import CustomLoader from '../../custom/CustomLoader';
import { formatRelativeTime } from '../../utils/formatTime'

function Orders() {

    const navigate = useNavigate();
    const { user, setUser } = useContext(AppContext);
    const { id } = useParams();
    const [orders, setOrders] = useState(null)
    const [partner, setPartner] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [orderId, setOrderId] = useState("")

    useEffect(() => {
        let userItem = JSON.parse(localStorage.getItem('user'))
        if (userItem?.token) {
            getOrdersByPartnerId(id, setOrders, setPartner, setIsLoading)
        } else {
            navigate("/signin")
        }
    }, [user])

    return (
        <>
            {isLoading
                ? <CustomLoader />
                : <div
                    className='h-[calc(100%-64px)] w-full text-gray-100 flex flex-col items-center justify-start p-4'
                >
                    <div className='flex flex-col gap-y-4 h-full w-[80%] overflow-y-auto'>
                        <div
                            className='text-xl leading-none pb-3 border-b border-b-gray-600 w-full'
                        >Orders / {partner ? partner?.userId?.name : "Partner"}</div>
                        <div className='flex items-start justify-start gap-4'>
                            {orders?.map((order, index) => (
                                <div
                                    key={index}
                                    className='flex flex-col gap-y-1.5 p-3 rounded border border-gray-600 min-w-[340px] w-[32%]'
                                >
                                    <div className='tracking-wide'>Payment Status - {order?.paymentMode == "pre" ? "Paid" : "Pending"}</div>
                                    <div className='tracking-wide'>Total Amount - ${order?.totalPrice}</div>
                                    {/* <div className='tracking-wide'>Verification ID - {order?.uniqueOrderId}</div> */}
                                    <div className='flex items-center gap-x-2 py-2'>
                                        <input
                                            type="text"
                                            className='w-1/2 h-8 p-1 rounded text-gray-800'
                                            value={orderId}
                                            onChange={e => setOrderId(e.target.value)}
                                            placeholder='Enter Order ID'
                                        />
                                        <button
                                            className='w-1/2 rounded h-8 bg-gray-600 text-gray-200 p-1'
                                        >Verify</button>
                                    </div>
                                    <div className='text-gray-400 mt-1 text-sm tracking-wide'>{new Date(order?.createdAt).toLocaleString()} ({formatRelativeTime(order?.createdAt)})</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Orders