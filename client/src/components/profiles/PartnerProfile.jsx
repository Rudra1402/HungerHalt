import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getPartnerDataById } from '../../apis/partnerApis';
import CustomLoader from '../../custom/CustomLoader';
import linklogo from '../../assets/images/linklogo.jpg'
import AppContext from '../../context/AppContext';

function PartnerProfile() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AppContext);
    const { id } = useParams();
    const [partner, setPartner] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        let userItem = JSON.parse(localStorage.getItem('user'))
        if (userItem?.token) {
            getPartnerDataById(id, setPartner, setIsLoading)
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
                        <div className='px-3 flex flex-col gap-y-4'>
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
                            <p className='!m-0 text-gray-400 text-sm leading-none tracking-wide'>
                                {partner?.userId?.address}
                            </p>
                            <p className='!m-0 text-gray-300 tracking-wide'>{partner?.description}</p>
                            <div>Posts and Items</div>
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