import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { userSignin } from '../../apis/userApis';
import AppContext from '../../context/AppContext';
import CustomLoader from '../../custom/CustomLoader';

function Signin() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AppContext);

    const [isLoading, setIsLoading] = useState(true)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignin = (e) => {
        e.preventDefault();
        userSignin({ email, password }, setUser, setIsLoading)
    }

    const checkUserAuth = () => {
        let userItem = JSON.parse(localStorage.getItem('user'))
        if (userItem?.token) {
            navigate('/feed')
        } else {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        setTimeout(checkUserAuth, 500)
    }, [user])

    useEffect(() => {
        document.title = "HungerHalt / Signin"
    }, [])

    return (
        <>
            {isLoading
                ? <CustomLoader />
                : <div className='h-[calc(100%-64px)] w-full flex gap-5 items-center justify-center text-gray-100 p-4'>
                    <div
                        className='flex flex-col overflow-y-auto items-center gap-8 w-1/2 h-full border p-8 border-purple-700 rounded-md'
                        style={{ scrollbarWidth: "none" }}
                    >
                        <div className='text-3xl leading-none'>HungerHalt</div>
                        <div className='text-xl px-6 leading-8 tracking-wider'>
                            &rarr; HungerHalt aims to not only provide a solution to reduce food wastage and optimize the quantity of raw materials to be purchased based on consumers, but also a medium to redistribute unprocessed or processed items between stores, restaurants, and any entity in the ‘consumable products’ sector and facilitate in clearing items closer to expiration to those in need.
                            <br /><br />
                            &rarr; From mitigating wastage to providing food at inexpensive rates much lower than market price as well as a provision of free-of-charge resources, our work seeks to ensure optimal resource utilization and contribute to the pursuit of zero hunger.</div>
                    </div>
                    <div className='max-h-[4/5] max-w-2/5 w-1/2 h-full p-8 border border-purple-700 rounded-md shadow-md flex flex-col items-center justify-center gap-6'>
                        <form
                            className='flex flex-col gap-4 px-8 py-6 rounded-lg form-container'
                            onSubmit={e => handleSignin(e)}
                        >
                            <div className='text-2xl mb-3 leading-none tracking-wider underline underline-offset-4'>Signin</div>
                            <div className='flex flex-col gap-1.5'>
                                <div className='text-gray-400'>Email</div>
                                <input
                                    id="email"
                                    name="email"
                                    type={'email'}
                                    value={email}
                                    placeholder='Email'
                                    onChange={e => setEmail(e.target.value)}
                                    className='w-72 h-12 p-2 rounded-md text-gray-800 text-lg leading-none'
                                    required
                                />
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <div className='text-gray-400'>Password</div>
                                <input
                                    id="password"
                                    name="password"
                                    type={'password'}
                                    value={password}
                                    placeholder='Password'
                                    onChange={e => setPassword(e.target.value)}
                                    className='w-72 h-12 p-2 rounded-md text-gray-800 text-lg leading-none'
                                    required
                                />
                            </div>
                            <button type='submit' className='px-8 py-3 rounded-md font-semibold tracking-wide cursor-pointer text-lg leading-none border border-gray-600 hover-btn'>Signin</button>
                            <div className='text-lg leading-none my-1 text-center'>OR</div>
                            <Link to={'/signup'} className='px-8 py-3 text-center rounded-md bg-blue-700 text-gray-200 font-semibold tracking-wide cursor-pointer text-lg leading-none hover-tag'>Signup</Link>
                        </form>
                    </div>
                </div>}
        </>
    )
}

export default Signin