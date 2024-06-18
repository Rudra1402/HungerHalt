import React, { useEffect, useState } from 'react';
import { leaderboardPartners } from '../../apis/partnerApis';
import CustomLoader from '../../custom/CustomLoader';

function Leaderboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [leaderboard, setLeaderboard] = useState(null);
    const [selectedVote, setSelectedVote] = useState("");

    useEffect(() => {
        leaderboardPartners(setLeaderboard, setIsLoading);
    }, []);

    return (
        <>
            {isLoading ? (
                <CustomLoader />
            ) : (
                <div className='h-[calc(100%-64px)] w-full text-gray-100 flex flex-col items-center justify-start p-4 overflow-y-auto'>
                    <div className='flex flex-col gap-y-3 w-[90%] md:w-[70%] lg:w-[60%]'>
                        <div className='flex items-center justify-between gap-x-4 pb-3 border-b border-gray-600'>
                            <div className='text-3xl font-semibold tracking-wide'>Leaderboard</div>
                            {selectedVote === "" ? (
                                <select
                                    name="vote"
                                    id="vote"
                                    className='w-52 h-10 px-2 py-1 cursor-pointer rounded-md text-gray-800 text-lg'
                                    value={selectedVote}
                                    onChange={e => setSelectedVote(e.target.value)}
                                >
                                    <option value="">Select Your Vote</option>
                                    {leaderboard?.map((p, ix) => (
                                        <option value={p?.partner?._id} key={ix}>
                                            {p?.partner?.userId?.name}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <div className='flex items-center gap-x-2'>
                                    <button
                                        onClick={() => setSelectedVote("")}
                                        className='px-4 py-2 text-sm rounded-md bg-red-500 hover:bg-red-600 transition-colors duration-200'
                                    >
                                        Cancel
                                    </button>
                                    <button className='px-4 py-2 text-sm rounded-md bg-blue-500 hover:bg-blue-600 transition-colors duration-200'>
                                        Submit
                                    </button>
                                </div>
                            )}
                        </div>
                        {leaderboard?.map((partner, index) => (
                            <div
                                key={index}
                                className='flex items-center justify-between gap-x-4 px-4 py-3 rounded-md text-gray-800 hover:text-gray-100 bg-gray-100 hover:bg-gray-700 transition-colors duration-200'
                            >
                                <div className='flex items-center gap-x-3'>
                                    <img
                                        src={partner?.partner?.logo}
                                        alt="Partner"
                                        className='h-12 w-12 object-cover rounded-full border-2 border-gray-600'
                                    />
                                    <div className='text-lg font-medium'>{partner?.partner?.userId?.name}</div>
                                </div>
                                <div className='text-lg font-semibold'>{partner?.score.toFixed(2)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default Leaderboard;