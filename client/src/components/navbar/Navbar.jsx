import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../../context/AppContext'
import hh from "../../assets/images/hungerhalt3.png"

function Navbar() {
    const { user, setUser } = useContext(AppContext);
    return (
        <div className='!h-16 w-full px-12 py-2 flex items-center justify-between gap-6 text-gray-300 text-xl leading-none border-b border-b-purple-700'>
            <Link to={'/'} className='tracking-wider font-semibold'>
                <img
                    className='h-10 w-auto rounded'
                    src={hh}
                    alt="HH"
                />
            </Link>
            <div className='flex items-center justify-center gap-2'>
                <Link to={'/feed'} className='cursor-pointer px-3 py-1.5 rounded hover:bg-gray-200 hover:text-gray-800'>Feed</Link>
                <Link to={'/leaderboard'} className='cursor-pointer px-3 py-1.5 rounded hover:bg-gray-200 hover:text-gray-800'>Leaderboard</Link>
                {user
                    ? <Link to={'/'} className='cursor-pointer px-3 py-1.5 rounded hover:bg-gray-200 hover:text-gray-800'>{user?.email?.split("@")[0]}</Link>
                    : null
                }
                {user
                    ? <div
                        className='cursor-pointer px-3 py-1.5 rounded hover:bg-gray-200 hover:text-gray-800'
                        onClick={() => {
                            localStorage.clear()
                            setUser(null)
                        }}
                    >Logout</div>
                    : <Link to={'/signin'} className='cursor-pointer px-3 py-1.5 rounded hover:bg-gray-200 hover:text-gray-800'>Signin</Link>
                }
            </div>
        </div>
    )
}

export default Navbar