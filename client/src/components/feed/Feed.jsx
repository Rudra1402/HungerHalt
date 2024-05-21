import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import CustomLoader from '../../custom/CustomLoader';
import classNames from 'classnames';
import { allPartners, partnersByType } from '../../apis/partnerApis';
import { getAllPosts } from '../../apis/postApis';
import Discover from './Discover';
import FeedMain from './FeedMain';
import Clearance from './Clearance';

function Feed() {

    const navigate = useNavigate();
    const { user, setUser } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(true)
    const [partners, setPartners] = useState(null)
    const [stores, setStores] = useState(null)
    const [restaurants, setRestaurants] = useState(null)
    const [dcenters, setDcenters] = useState(null)
    const [posts, setPosts] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams();

    const [tab, setTab] = useState(() => {
        const tabParam = searchParams.get('tab');
        return tabParam ? parseInt(tabParam, 10) : 1;
    });

    useEffect(() => {
        let userItem = JSON.parse(localStorage.getItem('user'))
        if (userItem?.token) {
            getAllPosts(setPosts, setIsLoading)
            allPartners(setPartners, setStores, setRestaurants, setDcenters, setIsLoading)
        } else {
            navigate("/signin")
        }
    }, [user])

    useEffect(() => {
        document.title = "HungerHalt / Feed"
        setSearchParams({ tab: tab.toString() });
    }, [tab, setSearchParams])

    return (
        <>
            {isLoading
                ? <CustomLoader />
                : <div className='h-[calc(100%-64px)] w-full flex flex-col gap-y-5 items-center justify-start text-gray-100 p-4'>
                    <div className='flex items-center text-gray-800 font-semibold tracking-wide text-xl leading-none bg-white rounded-md justify-center gap-0 overflow-hidden w-[80%] max-h-11 min-h-11'>
                        <div
                            className={classNames('w-1/3 text-center p-3 cursor-pointer', tab == 1 ? 'bg-[#045be6] text-gray-200' : '')}
                            onClick={() => setTab(1)}
                        >Feed</div>
                        <div
                            className={classNames('w-1/3 text-center p-3 cursor-pointer', tab == 2 ? 'bg-[#045be6] text-gray-200' : '')}
                            onClick={() => setTab(2)}
                        >Discover</div>
                        <div
                            className={classNames('w-1/3 text-center p-3 cursor-pointer', tab == 3 ? 'bg-[#045be6] text-gray-200' : '')}
                            onClick={() => setTab(3)}
                        >Clearance</div>
                    </div>
                    {tab == 1
                        ? <FeedMain
                            stores={stores}
                            restaurants={restaurants}
                            dcenters={dcenters}
                            posts={posts}
                        />
                        : null
                    }
                    {tab == 2
                        ? <Discover
                            stores={stores}
                            restaurants={restaurants}
                            dcenters={dcenters}
                        />
                        : null
                    }
                    {tab == 3
                        ? <Clearance />
                        : null
                    }
                </div>
            }
        </>
    )
}

export default Feed