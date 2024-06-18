import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrdersByPartnerId, updateOrder } from '../../apis/orderApis';
import AppContext from '../../context/AppContext';
import CustomLoader from '../../custom/CustomLoader';
import { formatRelativeTime } from '../../utils/formatTime';

function Orders() {
    const navigate = useNavigate();
    const { user } = useContext(AppContext);
    const { id } = useParams();
    const [orders, setOrders] = useState(null);
    const [partner, setPartner] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [orderIds, setOrderIds] = useState({});
    const [reRender, setReRender] = useState(new Date().getTime())

    useEffect(() => {
        let userItem = JSON.parse(localStorage.getItem('user'));
        if (userItem?.token) {
            getOrdersByPartnerId(id, setOrders, setPartner, setIsLoading);
        } else {
            navigate("/signin");
        }
    }, [user, id, navigate, reRender]);

    const handleVerifyButton = (o_id, oId) => {
        updateOrder(oId, user?.partnerId, setReRender);
        setOrderIds((prevOrderIds) => ({ ...prevOrderIds, [o_id]: oId }));
    };

    return (
        <>
            {isLoading ? (
                <CustomLoader />
            ) : (
                <div className='h-[calc(100%-64px)] w-full text-gray-100 flex flex-col items-center justify-start p-4'>
                    <div className='flex flex-col gap-y-6 h-full w-[80%] overflow-y-auto'>
                        <div className='text-2xl font-semibold pb-3 border-b border-gray-600 w-full'>
                            Orders / {partner ? partner?.userId?.name : "Partner"}
                        </div>
                        <div className='flex items-start justify-start flex-wrap gap-5'>
                            {orders?.map((order, index) => (
                                <div
                                    key={index}
                                    className='flex flex-col gap-y-3 p-4 rounded-lg border border-gray-600 bg-gray-800 shadow-lg w-full md:w-[48%] lg:w-[31.5%] min-h-[150px]'
                                >
                                    <div className='flex justify-between items-center'>
                                        <div className={`font-semibold ${order?.paymentMode === "pre" ? 'text-green-400' : 'text-yellow-400'}`}>
                                            {order?.paymentMode === "pre" ? "Paid" : "Pending"}
                                        </div>
                                        <div className='text-gray-400 text-sm'>
                                            {new Date(order?.createdAt).toLocaleString()} ({formatRelativeTime(order?.createdAt)})
                                        </div>
                                    </div>
                                    <div className='text-lg font-medium'>Total Amount - ${order?.totalPrice.toFixed(2)}</div>
                                    {/* <div className='tracking-wide'>Verification ID - {order?.uniqueOrderId}</div> */}
                                    {!order?.isOrderIDVerified ? (
                                        <div className='flex items-center gap-x-2 py-0'>
                                            <input
                                                type='text'
                                                className='flex-grow h-10 p-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400'
                                                value={orderIds[order._id] || ''}
                                                onChange={(e) => setOrderIds((prevOrderIds) => ({ ...prevOrderIds, [order._id]: e.target.value }))}
                                                placeholder='Enter Order ID'
                                            />
                                            <button
                                                className='flex-shrink-0 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200'
                                                onClick={() => handleVerifyButton(order?._id, orderIds[order?._id])}
                                            >
                                                Verify
                                            </button>
                                        </div>
                                    ) : (
                                        <div className='text-green-400 font-semibold'>Order Status - Completed ✅</div>
                                    )}
                                </div>
                            ))}
                            {orders?.length === 0 && (
                                <div className='text-gray-300 text-lg font-medium'>
                                    No orders found!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Orders;