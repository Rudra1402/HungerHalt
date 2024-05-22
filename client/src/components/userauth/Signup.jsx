import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { userSignup } from '../../apis/userApis';
import AppContext from '../../context/AppContext';
import CustomLoader from '../../custom/CustomLoader';

function Signup() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AppContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("");
    const [bannerImage, setBannerImage] = useState("");
    const [logo, setLogo] = useState("");
    const [website, setWebsite] = useState("");
    const [tags, setTags] = useState("");
    const [desc, setDesc] = useState("");
    const [partnerType, setPartnerType] = useState("");

    const [page, setPage] = useState(1)

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        document.title = "HungerHalt / Signup"
    }, [])

    const nextHandler = () => {
        if (page == 1) {
            if (userType == "") {
                console.log("You must select a valid option!")
                return;
            }
        }

        if (page == 2) {
            if (name == "") {
                console.log("Name cannot be empty!")
                return;
            }
            if (email == "") {
                console.log("Email cannot be empty!")
                return;
            }
            if (password == "") {
                console.log("Password cannot be empty!")
                return;
            }
        }

        if (userType == "Customer") {
            if (page == 2) {
                const payload = {
                    name: name,
                    email: email,
                    address: address,
                    password: password,
                    isPartner: false
                }
                userSignup(payload)
                return;
            }
        }

        if (page == 3) {
            if (desc == "") {
                console.log("Decription cannot be empty!")
                return;
            }
        }

        if (page == 4) {
            if (partnerType == "") {
                console.log("Partner Type cannot be empty!")
                return;
            }
            const payload = {
                name: name,
                email: email,
                address: address,
                password: password,
                isPartner: true,
                bannerImage: bannerImage,
                logo: logo,
                website: website,
                tags: tags.split(" "),
                description: desc,
                partnerType: partnerType
            }
            userSignup(payload)
            return;
        }

        setPage(page + 1)
    }

    const checkUserAuth = () => {
        let userItem = JSON.parse(localStorage.getItem('user'))
        if (userItem?.token) {
            navigate('/')
        } else {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        setTimeout(checkUserAuth, 500)
    }, [user])

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
                    <div className='max-h-[4/5] w-1/2 h-full p-8 border border-purple-700 rounded-md shadow-md flex flex-col items-center gap-6 overflow-y-auto'>
                        <div className='flex flex-col gap-4 px-8 py-6 rounded-lg m-auto form-container'>
                            <div className='text-2xl mb-3 leading-none tracking-wider underline underline-offset-4'>Signup</div>
                            {page == 1
                                ? <div className='flex flex-col gap-1.5'>
                                    <div className='text-gray-400'>User Type</div>
                                    <select
                                        value={userType}
                                        onChange={e => setUserType(e.target.value)}
                                        name="userType"
                                        id="userType"
                                        className='w-72 h-12 p-2 rounded-md text-gray-800 text-lg leading-none'
                                    >
                                        <option value="">Select</option>
                                        <option value="Customer">Customer</option>
                                        <option value="Partner">Partner</option>
                                    </select>
                                </div>
                                : null
                            }
                            {page == 2
                                ? <div className='flex flex-col gap-4'>
                                    <div className='flex flex-col gap-1.5'>
                                        <div className='text-gray-400'>Name</div>
                                        <input
                                            id="name"
                                            name="name"
                                            type={'text'}
                                            value={name}
                                            placeholder='Name'
                                            onChange={e => setName(e.target.value)}
                                            className='w-72 h-12 p-2 rounded-md text-gray-800 text-lg leading-none'
                                            required
                                        />
                                    </div>
                                    <div className='flex flex-col gap-1.5'>
                                        <div className='text-gray-400'>Address</div>
                                        <input
                                            id="address"
                                            name="address"
                                            type={'text'}
                                            value={address}
                                            placeholder='Address'
                                            onChange={e => setAddress(e.target.value)}
                                            className='w-72 h-12 p-2 rounded-md text-gray-800 text-lg leading-none'
                                            required
                                        />
                                    </div>
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
                                </div>
                                : null
                            }
                            {page == 3
                                ? <div className='flex flex-col gap-4'>
                                    <div className='flex flex-col gap-1.5'>
                                        <div className='text-gray-400'>Banner Image</div>
                                        <input
                                            id="bannerImage"
                                            name="bannerImage"
                                            type={'file'}
                                            value={bannerImage}
                                            placeholder='Banner Image'
                                            onChange={e => setBannerImage(e.target.value)}
                                            className='w-72 h-12 border border-gray-700 px-2 py-3 rounded-md text-gray-500 text-lg leading-none'
                                            required
                                        />
                                    </div>
                                    <div className='flex flex-col gap-1.5'>
                                        <div className='text-gray-400'>Logo</div>
                                        <input
                                            id="logo"
                                            name="logo"
                                            type={'file'}
                                            value={logo}
                                            placeholder='Logo'
                                            onChange={e => setLogo(e.target.value)}
                                            className='w-72 h-12 px-2 py-3 border border-gray-700 rounded-md text-gray-500 text-lg leading-none'
                                            required
                                        />
                                    </div>
                                    <div className='flex flex-col gap-1.5'>
                                        <div className='text-gray-400'>Description</div>
                                        <textarea
                                            id="description"
                                            name="description"
                                            type={'text'}
                                            value={desc}
                                            placeholder='Description (Max 150 Characters)'
                                            onChange={e => setDesc(e.target.value)}
                                            rows={3}
                                            className='w-72 resize-none px-2 py-3 border border-gray-700 rounded-md text-gray-500 text-lg leading-none'
                                            required
                                        />
                                    </div>
                                </div>
                                : null
                            }
                            {page == 4
                                ? <div className='flex flex-col gap-4'>
                                    <div className='flex flex-col gap-1.5'>
                                        <div className='text-gray-400'>Website</div>
                                        <input
                                            id="website"
                                            name="website"
                                            type={'url'}
                                            value={website}
                                            placeholder='Website'
                                            onChange={e => setWebsite(e.target.value)}
                                            className='w-72 h-12 border border-gray-700 px-2 py-3 rounded-md text-gray-500 text-lg leading-none'
                                            required
                                        />
                                    </div>
                                    <div className='flex flex-col gap-1.5'>
                                        <div className='text-gray-400'>Tags (Space-Separated) (Max. 3)</div>
                                        <input
                                            id="tags"
                                            name="tags"
                                            type={'text'}
                                            value={tags}
                                            placeholder='Tags'
                                            onChange={e => setTags(e.target.value)}
                                            className='w-72 h-12 px-2 py-3 border border-gray-700 rounded-md text-gray-500 text-lg leading-none'
                                            required
                                        />
                                    </div>
                                    <div className='flex flex-col gap-1.5'>
                                        <div className='text-gray-400'>Partner Type</div>
                                        <select
                                            value={partnerType}
                                            onChange={e => setPartnerType(e.target.value)}
                                            name="partnerType"
                                            id="partnerType"
                                            className='w-72 h-12 p-2 rounded-md text-gray-800 text-lg leading-none'
                                        >
                                            <option value="">Select</option>
                                            <option value="s">Stores</option>
                                            <option value="r">Restaurants</option>
                                            <option value="d">Donation Center</option>
                                        </select>
                                    </div>
                                </div>
                                : null
                            }
                            <button
                                type='submit'
                                className='px-8 py-3 rounded-md font-semibold tracking-wide cursor-pointer text-lg leading-none border border-gray-600 hover-btn'
                                onClick={nextHandler}
                            >{userType == "Customer"
                                ? page == 2
                                    ? "Submit"
                                    : "Next"
                                : page == 4
                                    ? "Submit"
                                    : "Next"
                                }
                            </button>
                            {page == 1
                                ? <>
                                    <div className='text-lg leading-none my-1 text-center'>OR</div>
                                    <Link to={'/signin'} className='px-8 py-3 text-center rounded-md bg-blue-700 text-gray-200 font-semibold tracking-wide cursor-pointer text-lg leading-none hover-tag'>Signin</Link>
                                </>
                                : null
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Signup