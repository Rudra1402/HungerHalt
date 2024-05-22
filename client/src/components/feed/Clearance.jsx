import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getItems } from '../../apis/itemApis';
import AppContext from '../../context/AppContext';
import CustomLoader from '../../custom/CustomLoader';
import { formatRelativeTime } from '../../utils/formatTime';

function Clearance() {

    const navigate = useNavigate();
    const { user, setUser, cart, setCart } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(true)
    const [items, setItems] = useState(null)
    const [filterItems, setFilterItems] = useState(null)
    const [partnerType, setPartnerType] = useState("")

    useEffect(() => {
        let userItem = JSON.parse(localStorage.getItem('user'))
        if (userItem?.token) {
            getItems(setItems, setIsLoading)
        } else {
            navigate("/signin")
        }
    }, [user])

    useEffect(() => {
        if (partnerType == "") return;
        let filteredItems = items?.filter(item => item?.partnerId?.partnerType == partnerType)
        setFilterItems(filteredItems)
        setIsLoading(true)
        setTimeout(() => setIsLoading(false), 500)
    }, [partnerType])

    const handleAddToCart = (item) => {
        let quantity = item?.quantity;
        let itemId = item?._id;

        const itemIndex = cart.findIndex((c) => c._id === itemId);

        if (itemIndex === -1) {
            let tempItem = { ...item, oq: 1 }
            setCart([...cart, tempItem]);
        } else {
            let updatedCart = [...cart];

            if (updatedCart[itemIndex].oq == quantity)
                return console.log("Reached max quantity!")

            updatedCart[itemIndex] = { ...updatedCart[itemIndex], oq: updatedCart[itemIndex].oq + 1 };
            setCart(updatedCart);
        }
    }

    return (
        <>
            {isLoading
                ? <CustomLoader />
                : <div
                    className='flex flex-col text-gray-800 justify-start gap-5 w-[80%] h-[calc(100%-64px)] overflow-y-auto'
                    style={{ scrollbarWidth: "none" }}
                >
                    <div className='flex items-center justify-between gap-x-6'>
                        <div className='text-gray-200 text-2xl tracking-wide leading-none font-semibold'>Clearance Items ({items ? items?.length : 0})</div>
                        <select
                            name="ptype"
                            id="ptype"
                            value={partnerType}
                            onChange={e => setPartnerType(e.target.value)}
                            className='w-72 h-10 p-1 cursor-pointer rounded-md text-gray-800 text-lg leading-none'
                        >
                            <option value="">Select</option>
                            <option value="r">Restaurants</option>
                            <option value="s">Stores</option>
                            <option value="d">Donation Centres</option>
                        </select>
                    </div>
                    <div className='flex items-start justify-start flex-wrap gap-4 w-full'>
                        {partnerType == ""
                            ? items?.map((item, index) => {
                                const itemIndex = cart.findIndex((c) => c._id === item?._id);
                                return (
                                    <div
                                        className='flex flex-col rounded overflow-hidden border border-gray-600 min-w-[340px] w-[32%]'
                                        key={index}
                                    >
                                        <img
                                            src={item?.postId?.image}
                                            alt="Image"
                                            className='min-h-44 max-h-44 min-w-full object-cover bg-white'
                                        />
                                        <div className='flex flex-col px-2 py-3 gap-y-2'>
                                            <div className='flex items-center justify-between'>
                                                <Link
                                                    to={`/partner/${item?.partnerId?._id}`}
                                                    className='text-blue-300 cursor-pointer'
                                                >
                                                    {item?.partnerId?.userId?.name}
                                                </Link>
                                                <div className='text-sm leading-none text-gray-400'>
                                                    {formatRelativeTime(item?.createdAt)}
                                                </div>
                                            </div>
                                            <div className='text-xl leading-none text-gray-200 tracking-wide font-semibold'>
                                                {item?.postId?.title}
                                            </div>
                                            <p className='text-gray-300 leading-6 overflow-hidden text-ellipsis line-clamp-2 w-full'>{item?.postId?.description}</p>
                                            <div className='flex items-center justify-between gap-x-3 text-sm px-0'>
                                                <div className='text-gray-400'>Available Quantity: {item?.quantity}</div>
                                                <div className='text-gray-400'>Price Per: ${item?.price}</div>
                                            </div>
                                            <div className='flex items-center justify-center gap-x-3 mt-1'>
                                                {itemIndex == -1
                                                    ? <button
                                                        className='w-full bg-blue-600 text-gray-100 px-3 py-2 rounded leading-none !m-0'
                                                        onClick={() => handleAddToCart(item)}
                                                    >Add to cart</button>
                                                    : <div className='flex items-center justify-center gap-x-3 w-full'>
                                                        <button className='w-1/4 text-center py-2 text-lg leading-none !m-0 bg-gray-300 rounded text-gray-700'>-</button>
                                                        <div className='w-2/4 text-center py-2 text-lg font-semibold leading-none !m-0 bg-white rounded text-gray-800'>{cart[itemIndex]?.oq}</div>
                                                        <button className='w-1/4 text-center py-2 text-lg leading-none !m-0 bg-gray-300 rounded text-gray-700'>+</button>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : filterItems?.map((item, index) => {
                                const itemIndex = cart.findIndex((c) => c._id === item?._id);
                                return (
                                    <div
                                        className='flex flex-col rounded overflow-hidden border border-gray-600 min-w-[340px] w-[32%]'
                                        key={index}
                                    >
                                        <img
                                            src={item?.postId?.image}
                                            alt="Image"
                                            className='min-h-44 max-h-44 min-w-full object-cover bg-white'
                                        />
                                        <div className='flex flex-col px-2 py-3 gap-y-2'>
                                            <div className='flex items-center justify-between'>
                                                <Link
                                                    to={`/partner/${item?.partnerId?._id}`}
                                                    className='text-blue-300 cursor-pointer'
                                                >
                                                    {item?.partnerId?.userId?.name}
                                                </Link>
                                                <div className='text-sm leading-none text-gray-400'>
                                                    {formatRelativeTime(item?.createdAt)}
                                                </div>
                                            </div>
                                            <div className='text-xl leading-none text-gray-200 tracking-wide font-semibold'>
                                                {item?.postId?.title}
                                            </div>
                                            <p className='text-gray-300 leading-6 overflow-hidden text-ellipsis line-clamp-2 w-full'>{item?.postId?.description}</p>
                                            <div className='flex items-center justify-between gap-x-3 text-sm px-0'>
                                                <div className='text-gray-400'>Available Quantity: {item?.quantity}</div>
                                                <div className='text-gray-400'>Price Per: ${item?.price}</div>
                                            </div>
                                            <div className='flex items-center justify-center gap-x-3 mt-1'>
                                                {itemIndex == -1
                                                    ? <button
                                                        className='w-full bg-blue-600 text-gray-100 px-3 py-2 rounded leading-none !m-0'
                                                        onClick={() => handleAddToCart(item)}
                                                    >Add to cart</button>
                                                    : <div className='flex items-center justify-center gap-x-3 w-full'>
                                                        <button className='w-1/4 text-center py-2 text-lg leading-none !m-0 bg-gray-300 rounded text-gray-700'>-</button>
                                                        <div className='w-2/4 text-center py-2 text-lg font-semibold leading-none !m-0 bg-white rounded text-gray-800'>{cart[itemIndex]?.oq}</div>
                                                        <button className='w-1/4 text-center py-2 text-lg leading-none !m-0 bg-gray-300 rounded text-gray-700'>+</button>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                </div>
            }
        </>
    )
}

export default Clearance