import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getPartnerDataById } from '../../apis/partnerApis';
import CustomLoader from '../../custom/CustomLoader';
import linklogo from '../../assets/images/linklogo.jpg'
import AppContext from '../../context/AppContext';
import className from 'classnames'
import { getPostByPartnerId } from '../../apis/postApis';
import { formatRelativeTime } from '../../utils/formatTime'

function PartnerProfile() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AppContext);
    const { id } = useParams();
    const [partner, setPartner] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [tab, setTab] = useState(1)

    const [posts, setPosts] = useState(null)

    useEffect(() => {
        let userItem = JSON.parse(localStorage.getItem('user'))
        if (userItem?.token) {
            getPartnerDataById(id, setPartner, setIsLoading)
            getPostByPartnerId(id, setPosts, setIsLoading)
        } else {
            navigate("/signin")
        }
    }, [user])

    useEffect(() => {
        document.title = "HungerHalt / Partner"
    }, [])

    return (
        <>
            {isLoading
                ? <CustomLoader />
                : <div
                    className='h-[calc(100%-64px)] w-full text-gray-100 flex items-start justify-center p-4'
                >
                    <div
                        className='h-full w-[80%] flex flex-col gap-y-4 overflow-y-auto'
                        style={{ scrollbarWidth: "none" }}
                    >
                        <div className='min-h-[316px] w-full relative'>
                            <img
                                src={partner?.bannerImage}
                                alt="Banner Image"
                                className='bg-white h-64 w-full object-cover rounded-md'
                            />
                            <img
                                src={partner?.logo}
                                alt="Image"
                                className='bg-white h-56 w-56 rounded-full object-cover absolute -translate-y-3/4 translate-x-1/4'
                            />
                        </div>
                        <div className='px-3 flex flex-col gap-y-4 w-full'>
                            <div className='flex items-center gap-x-4 justify-between'>
                                <div className='flex items-center gap-x-3'>
                                    <div className='text-3xl leading-none'>{partner?.userId?.name}</div>
                                    <a
                                        href={partner?.socials}
                                        rel='noreferer'
                                        target={'_blank'}
                                        className='text-blue-400'
                                    >
                                        <img
                                            src={linklogo}
                                            alt="Link Logo"
                                            className='h-7 w-7 rounded-full'
                                        />
                                    </a>
                                </div>
                                <Link to={`/orders/${user?.partnerId}`} className='px-3 py-2 tracking-wide text-sm rounded bg-green-700 text-gray-200'>Active Orders</Link>
                            </div>
                            <p className='!m-0 text-gray-400 text-sm leading-none tracking-wide'>
                                {partner?.userId?.address}
                            </p>
                            <p className='!m-0 text-gray-300 tracking-wide'>{partner?.description}</p>
                            <div className='flex flex-col gap-y-4 py-2 w-full'>
                                <div className='flex items-end justify-between gap-x-4'>
                                    <div className='flex items-center gap-x-0 text-gray-400'>
                                        <div
                                            className={className('border-b-2 cursor-pointer border-b-gray-600 py-1 px-2.5', tab == 1 ? '!border-b-gray-200 text-gray-200' : '')}
                                            onClick={() => setTab(1)}
                                        >Posts</div>
                                        <div
                                            className={className('border-b-2 cursor-pointer border-b-gray-600 py-1 px-2.5', tab == 2 ? '!border-b-gray-200 text-gray-200' : '')}
                                            onClick={() => setTab(2)}
                                        >Items</div>
                                    </div>
                                    {tab == 1
                                        ? <button className='px-3 py-1 tracking-wide text-sm rounded bg-green-700 text-gray-200'>Add Post</button>
                                        : null
                                    }
                                    {tab == 2
                                        ? <button className='px-3 py-1 tracking-wide text-sm rounded bg-green-700 text-gray-200'>Add Item</button>
                                        : null
                                    }
                                </div>
                                {tab == 1
                                    ? <div className='flex items-start justify-start flex-wrap w-full gap-4'>
                                        {posts?.map((post, index) => (
                                            <div
                                                className='flex flex-col rounded overflow-hidden border border-gray-600 w-[32.25%] min-w-[340px]'
                                                key={index}
                                            >
                                                <img
                                                    src={post?.image}
                                                    alt="Image"
                                                    className='min-h-44 max-h-44 min-w-full object-cover bg-white'
                                                />
                                                <div className='flex flex-col px-2 py-3 gap-y-2'>
                                                    <div className='flex items-center justify-between'>
                                                        <div className='text-blue-300 cursor-pointer'>
                                                            {post?.partnerId?.userId?.name}
                                                        </div>
                                                        <div className='text-sm leading-none text-gray-400'>
                                                            {formatRelativeTime(post?.createdAt)}
                                                        </div>
                                                    </div>
                                                    <div className='text-xl leading-none text-gray-200 tracking-wide font-semibold'>
                                                        {post?.title}
                                                    </div>
                                                    <p className='text-gray-300 leading-6 overflow-hidden text-ellipsis line-clamp-2 w-full'>{post?.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                        {posts?.length == 0
                                            ? <div className='text-base leading-none tracking-wide text-gray-400 p-1'>No posts found!</div>
                                            : null
                                        }
                                    </div>
                                    : null
                                }
                                {tab == 2
                                    ? <div className='flex items-start justify-start flex-wrap w-full gap-x-4'>Items</div>
                                    : null
                                }
                            </div>
                            <div className='flex flex-col gap-y-2'>
                                <div className=''>Tags</div>
                                <div className='flex items-center gap-x-2 !text-xs'>
                                    {partner?.tags?.map((tag, ix) => (
                                        <div
                                            key={ix}
                                            className='py-0.5 px-1.5 rounded tracking-wide font-semibold bg-gray-300 text-gray-900'
                                        >{tag}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default PartnerProfile