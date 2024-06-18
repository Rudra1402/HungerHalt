import React from 'react'
import { Link } from 'react-router-dom'
import { formatRelativeTime } from '../../utils/formatTime'

function FeedMain({ stores, restaurants, dcenters, posts }) {
    return (
        <div className='flex text-gray-800 items-center gap-4 w-[80%] h-[calc(100%-64px)]'>
            <div
                className='flex flex-col gap-y-3 items-center w-[30%] h-full overflow-y-auto'
                style={{ scrollbarWidth: "none" }}
            >
                {stores?.map((store, index) => (
                    <div
                        className='flex flex-col rounded-md w-full overflow-hidden min-h-44 border border-gray-600'
                        key={index}
                    >
                        <img
                            src={store?.bannerImage}
                            alt="Banner Image"
                            className='min-h-32 max-h-32 min-w-full object-cover'
                        />
                        <Link
                            to={`/partner/${store?._id}`}
                            className='text-xl leading-none px-2 py-3 text-gray-200 font-semibold cursor-pointer tracking-wide'>
                            {store?.userId?.name}
                        </Link>
                    </div>
                ))}
                {restaurants?.map((restaurant, index) => (
                    <div
                        className='flex flex-col rounded-md w-full overflow-hidden min-h-44 border border-gray-600'
                        key={index}
                    >
                        <img
                            src={restaurant?.bannerImage}
                            alt="Banner Image"
                            className='h-32 w-full object-cover'
                        />
                        <Link
                            to={`/partner/${restaurant?._id}`}
                            className='text-xl leading-none px-2 py-3 text-gray-200 font-semibold cursor-pointer tracking-wide'>
                            {restaurant?.userId?.name}
                        </Link>
                    </div>
                ))}
                {stores?.length == 0 && restaurants?.length == 0
                    ? <div className='text-gray-300 tracking-wide text-lg leading-none'>No stores or restaurants!</div>
                    : null
                }
            </div>
            <div
                className='flex flex-col gap-y-4 items-center w-[40%] h-full overflow-y-auto'
                style={{ scrollbarWidth: "none" }}
            >
                {posts?.map((post, index) => (
                    <div
                        className='flex flex-col rounded-md overflow-hidden border border-gray-600 w-full min-h-[312px]'
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
                    ? <div className='text-xl leading-none tracking-wide text-gray-300 px-2 py-4'>No posts found!</div>
                    : null
                }
            </div>
            <div
                className='flex flex-col gap-y-3 items-center w-[30%] h-full overflow-y-auto'
                style={{ scrollbarWidth: "none" }}
            >
                {dcenters?.map((dc, index) => (
                    <div
                        className='flex flex-col rounded-md w-full overflow-hidden min-h-44 border border-gray-600'
                        key={index}
                    >
                        <img
                            src={dc?.bannerImage}
                            alt="Banner Image"
                            className='min-h-32 max-h-32 min-w-full object-cover bg-white'
                        />
                        <Link
                            to={`/partner/${dc?._id}`}
                            className='text-xl leading-none px-2 py-3 text-gray-200 font-semibold cursor-pointer tracking-wide'>
                            {dc?.userId?.name}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FeedMain