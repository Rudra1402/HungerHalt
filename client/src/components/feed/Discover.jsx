import React from 'react'
import { Link } from 'react-router-dom'

function Discover({ stores, restaurants, dcenters }) {
    return (
        <div
            className='flex flex-col text-gray-800 justify-start gap-6 w-[80%] h-[calc(100%-64px)] overflow-y-auto'
            style={{ scrollbarWidth: "none" }}
        >
            <div className='flex flex-col gap-y-3 w-full'>
                <div className='text-xl leading-none font-bold tracking-wider text-blue-300'>
                    STORES
                </div>
                <div
                    className='flex gap-x-5 items-center justify-start overflow-x-auto'
                    style={{ scrollbarWidth: "none" }}
                >
                    {stores?.map((s, index) => (
                        <div
                            className='flex flex-col h-fit min-w-96 border border-gray-600 rounded overflow-hidden'
                            key={index}
                        >
                            <img
                                src={s?.bannerImage}
                                alt="Banner Image"
                                className='min-h-36 max-h-36 w-full object-cover bg-white'
                            />
                            <Link
                                to={`/partner/${s?._id}`}
                                className='px-2 py-3 text-gray-200 font-semibold tracking-wide text-xl leading-none'>
                                {s?.userId?.name}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex flex-col gap-y-3 w-full'>
                <div className='text-xl leading-none font-bold tracking-wider text-blue-300'>
                    RESTAURANTS
                </div>
                <div
                    className='flex gap-x-5 items-center justify-start overflow-x-auto'
                    style={{ scrollbarWidth: "none" }}
                >
                    {restaurants?.map((r, index) => (
                        <div
                            className='flex flex-col h-fit min-w-96 max-w-96 border border-gray-600 rounded overflow-hidden'
                            key={index}
                        >
                            <img
                                src={r?.bannerImage}
                                alt="Banner Image"
                                className='min-h-36 max-h-36 w-full object-cover bg-white'
                            />
                            <Link
                                to={`/partner/${r?._id}`}
                                className='px-2 py-3 text-gray-200 font-semibold tracking-wide text-xl leading-none'>
                                {r?.userId?.name}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex flex-col gap-y-3 w-full'>
                <div className='text-xl leading-none font-bold tracking-wider text-blue-300'>
                    DONATION CENTERS
                </div>
                <div
                    className='flex gap-x-5 items-center justify-start overflow-x-auto'
                    style={{ scrollbarWidth: "none" }}
                >
                    {dcenters?.map((d, index) => (
                        <div
                            className='flex flex-col h-fit min-w-96 max-w-96 border border-gray-600 rounded overflow-hidden'
                            key={index}
                        >
                            <img
                                src={d?.bannerImage}
                                alt="Banner Image"
                                className='min-h-36 max-h-36 w-full object-cover bg-white'
                            />
                            <Link
                                to={`/partner/${d?._id}`}
                                className='px-2 py-3 text-gray-200 font-semibold tracking-wide text-xl leading-none'>
                                {d?.userId?.name}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Discover