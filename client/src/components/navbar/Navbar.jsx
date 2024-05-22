import React, { useState } from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../../context/AppContext'
import hh from "../../assets/images/hungerhalt3.png"
import cart from "../../assets/images/cart.png"

function Navbar() {
    const { user, setUser } = useContext(AppContext);
    const [openDropdown, setOpenDropdown] = useState(false)
    return (
        <div className='min-h-16 max-h-16 w-full px-10 py-2 flex items-center justify-between gap-6 text-gray-300 text-lg leading-none border-b border-b-purple-700'>
            <Link to={'/'} className='tracking-wider font-semibold'>
                <img
                    className='h-10 w-auto rounded'
                    src={hh}
                    alt="HH"
                />
            </Link>
            <div className='flex items-center justify-center gap-3'>
                {user
                    ? <Link to={'/feed'} className='cursor-pointer px-2 py-1.5 rounded hover:bg-gray-200 hover:text-gray-800'>Feed</Link>
                    : null
                }
                <Link to={'/leaderboard'} className='cursor-pointer px-2 py-1.5 rounded hover:bg-gray-200 hover:text-gray-800'>Leaderboard</Link>
                {user
                    ? <Link to={'/cart'} className='cursor-pointer px-2 py-1.5 rounded hover:bg-gray-200 hover:text-gray-800'>Cart</Link>
                    : null
                }
                {user
                    ? <div className='relative'>
                        <div
                            className='w-9 h-9 rounded-full bg-gray-700 shadow shadow-gray-600 flex items-center justify-center text-lg leading-none cursor-pointer'
                            onClick={() => setOpenDropdown(!openDropdown)}
                        >
                            {user?.email?.split("@")[0][0].toUpperCase()}
                        </div>
                        {openDropdown
                            ? <div
                                className='rounded flex flex-col items-center justify-start bg-gray-100 text-gray-800 absolute py-2 px-2 min-w-40 right-0 top-11 z-50 border border-gray-400 select-none'
                            >
                                <Link
                                    to={'/profile'}
                                    className='cursor-pointer px-3 py-2.5 text-center rounded hover:bg-gray-200 w-full'
                                    onClick={() => setOpenDropdown(false)}
                                >Profile</Link>
                                <Link
                                    to={'/cart'}
                                    className='cursor-pointer px-3 py-2.5 text-center rounded hover:bg-gray-200 w-full'
                                    onClick={() => setOpenDropdown(false)}
                                >Cart</Link>
                                <div
                                    className='cursor-pointer px-3 py-2.5 text-center rounded hover:bg-gray-200 w-full'
                                    onClick={() => {
                                        localStorage.clear()
                                        setOpenDropdown(false)
                                        setUser(null)
                                    }}
                                >Logout</div>
                            </div>
                            : null
                        }
                    </div>
                    : null
                }
                {/* {user
                    ? <Link to={'/'} className='cursor-pointer px-2 py-1.5 rounded hover:bg-gray-200 hover:text-gray-800'>{user?.email?.split("@")[0]}</Link>
                    : null
                }
                {user
                    ? <div
                        className='cursor-pointer px-2 py-1.5 rounded hover:bg-gray-200 hover:text-gray-800'
                        onClick={() => {
                            localStorage.clear()
                            setUser(null)
                        }}
                    >Logout</div>
                    : <Link to={'/signin'} className='cursor-pointer px-2 py-1.5 rounded hover:bg-gray-200 hover:text-gray-800'>Signin</Link>
                }
                {user
                    ? <Link to={'/cart'} className='cursor-pointer px-2 py-1.5'>
                        <img
                            src={cart}
                            alt="Cart Logo"
                            className='bg-white h-8 w-8 rounded'
                        />
                    </Link>
                    : null
                } */}
                {!user
                    ? <>
                        <Link to={'/signin'} className='cursor-pointer px-2 py-1.5 rounded hover:bg-gray-200 hover:text-gray-800'>Signin</Link>
                        <Link to={'/signup'} className='cursor-pointer px-2 py-1.5 rounded hover:bg-gray-200 hover:text-gray-800'>Signup</Link>
                    </>
                    : null
                }
            </div>
        </div>
    )
}

export default Navbar