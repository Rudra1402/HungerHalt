import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { placeOrder } from '../../apis/orderApis';
import AppContext from '../../context/AppContext';
import CustomLoader from '../../custom/CustomLoader'
import { getUserId } from '../../utils/getUser';

function Cart() {
    const navigate = useNavigate();
    const { user, setUser, cart, setCart } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(true)

    const [totalPrice, setTotalPrice] = useState(0);
    const [hst, setHST] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);

    const [paymentMode, setPaymentMode] = useState("")

    useEffect(() => {
        let userItem = JSON.parse(localStorage.getItem('user'))
        if (userItem?.token) {
            setIsLoading(false)
            let tempTotalPrice = 0;
            cart.forEach((item) => {
                tempTotalPrice += item.price * item.oq;
            });
            setTotalPrice(tempTotalPrice);
            setHST(tempTotalPrice * 0.13);
            setFinalPrice(tempTotalPrice + (tempTotalPrice * 0.13));
        } else {
            navigate("/signin")
        }
    }, [user, cart])

    const handleOrderPlacement = () => {

        if (cart?.length == 0) {
            alert("Cart is empty!")
            return;
        }

        if (paymentMode == "") {
            alert("Please select a payment mode!")
            return;
        }

        let pIds = [], iIds = []
        cart.forEach((item) => {
            pIds.push(item?.partnerId);
            iIds.push(item?._id)
        });
        let orderBody = {
            partnerId: pIds,
            userId: getUserId(),
            itemId: iIds,
            totalPrice: finalPrice.toFixed(2),
            paymentMode: paymentMode,
            paymentStatus: paymentMode == "pre" ? true : false,
            uniqueOrderId: crypto.randomUUID().slice(0, 6)
        };

        placeOrder(orderBody, setIsLoading)
    }

    return (
        <>
            {isLoading
                ? <CustomLoader />
                : <div
                    className='h-[calc(100%-64px)] w-full text-gray-100 flex flex-col items-center justify-start p-4'
                >
                    <div
                        className='flex flex-col gap-y-3 w-[80%] overflow-y-auto'
                        style={{ scrollbarWidth: "none" }}
                    >
                        <div className='flex items-center justify-between gap-x-6 pb-3 border-b border-b-gray-600 '>
                            <div className='text-2xl leading-none font-semibold tracking-wide'>Cart</div>
                            <Link
                                to={'/feed?tab=3'}
                                className='text-blue-300'
                            >View Clearance Items</Link>
                        </div>
                        {cart?.map((c, index) => {
                            // totalPrice += c?.price * c?.oq
                            return (
                                <div
                                    key={index}
                                    className='w-full h-44 p-3 rounded flex items-center gap-x-3 border border-gray-700'
                                >
                                    <img
                                        src={c?.postId?.image}
                                        alt="Image"
                                        className='h-full aspect-square object-cover bg-white rounded'
                                    />
                                    <div className='h-full w-full py-2 flex flex-col justify-start gap-y-3'>
                                        <div className='flex items-baseline gap-x-1'>
                                            <div className='text-xl leading-none tracking-wide'>
                                                {c?.postId?.title}
                                            </div>
                                            <div className='text-sm text-gray-400'>(x{c?.oq})</div>
                                        </div>
                                        <div className='text-base leading-none'>${c?.price * c?.oq}</div>
                                        <div className='text-sm leading-5 text-gray-400'>Description:<br />{c?.postId?.description}</div>
                                    </div>
                                </div>
                            )
                        })}
                        {cart?.length == 0
                            ? <div className='text-xl leading-none text-gray-400'>Cart is empty!</div>
                            : <div className='flex flex-col my-3 gap-y-3'>
                                <div className='text-2xl leading-none pb-3 border-b border-b-gray-700'>Summary</div>
                                <div className='flex flex-col gap-y-4 px-1'>
                                    <div className='flex items-center justify-between gap-x-5 px-1'>
                                        <div className='text-lg leading-none text-gray-400'>Price</div>
                                        <div className='text-xl leading-none tracking-wide'>${totalPrice.toFixed(2)}</div>
                                    </div>
                                    <div className='flex items-center justify-between gap-x-5 px-1'>
                                        <div className='text-lg leading-none text-gray-400'>HST (13%)</div>
                                        <div className='text-xl leading-none tracking-wide'>${hst.toFixed(2)}</div>
                                    </div>
                                    <div className='flex items-center justify-between gap-x-5 px-1'>
                                        <div className='text-lg leading-none text-gray-400'>Total Price</div>
                                        <div className='text-xl leading-none tracking-wide'>${finalPrice.toFixed(2)}</div>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-1 my-3'>
                                    <div className='text-gray-400'>Payment Mode</div>
                                    <select
                                        value={paymentMode}
                                        onChange={e => setPaymentMode(e.target.value)}
                                        name="paymentMode"
                                        id="paymentMode"
                                        className='w-72 h-9 p-1 rounded-md text-gray-800 text-lg leading-none'
                                    >
                                        <option value="">Select</option>
                                        <option value="pre">Online</option>
                                        <option value="post">Pay on pick up</option>
                                    </select>
                                </div>
                                <button
                                    className='px-4 py-1.5 rounded bg-blue-800 w-fit'
                                    onClick={handleOrderPlacement}
                                >Proceed to checkout</button>
                            </div>
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default Cart