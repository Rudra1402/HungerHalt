import React, { useEffect, useState } from 'react'
import { leaderboardPartners } from '../../apis/partnerApis'
import CustomLoader from '../../custom/CustomLoader'

function Leaderboard() {
    const [isLoading, setIsLoading] = useState(true)
    const [leaderboard, setLeaderboard] = useState(null)
    const [selectedVote, setSelectedVote] = useState("")

    useEffect(() => {
        leaderboardPartners(setLeaderboard, setIsLoading)
    }, [])

    return (
        <>
            {isLoading
                ? <CustomLoader />
                : <div
                    className='h-[calc(100%-64px)] w-full text-gray-100 flex flex-col items-center justify-start p-4 overflow-y-auto'
                >
                    <div className='flex flex-col gap-y-3 w-[60%]'>
                        <div className='flex items-center justify-between gap-x-4 pb-3 border-b border-b-gray-600'>
                            <div className='text-2xl leading-none tracking-wide font-semibold'>Leaderboard</div>
                            {selectedVote == ""
                                ? <select
                                    name="vote"
                                    id="vote"
                                    className='w-52 h-8 p-1 cursor-pointer rounded-md text-gray-800 text-lg leading-none'
                                    value={selectedVote}
                                    onChange={e => setSelectedVote(e.target.value)}
                                >
                                    <option value="">Select Your Vote</option>
                                    {leaderboard?.map((p, ix) => (
                                        <option
                                            value={p?.partner?._id}
                                            key={ix}
                                        >{p?.partner?.userId?.name}</option>
                                    ))}
                                </select>
                                : <div className='flex items-center gap-x-2'>
                                    <div
                                        onClick={() => setSelectedVote("")}
                                        className='px-3 cursor-pointer py-1.5 text-sm rounded-md bg-red-400'>Cancel</div>
                                    <div className='px-3 cursor-pointer py-1.5 text-sm rounded-md bg-blue-400'>Submit</div>
                                </div>
                            }
                        </div>
                        {leaderboard?.map((partner, index) => (
                            <div
                                key={index}
                                className='flex items-center justify-between gap-x-4 px-3 py-2 rounded-md bg-[#0008] tracking-wide font-semibold'
                            >
                                <div className='flex items-center justify-center gap-x-3'>
                                    <img
                                        src={partner?.partner?.logo}
                                        alt="Partner"
                                        className='h-12 w-12 object-cover rounded-full'
                                    />
                                    <div className=''>{partner?.partner?.userId?.name}</div>
                                </div>
                                <div className=''>{partner?.score.toFixed(2)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </>
    )
}

export default Leaderboard