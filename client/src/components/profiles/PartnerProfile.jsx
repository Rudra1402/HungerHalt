import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getPartnerDataById } from '../../apis/partnerApis';
import CustomLoader from '../../custom/CustomLoader';
import linklogo from '../../assets/images/linklogo.jpg';
import AppContext from '../../context/AppContext';
import className from 'classnames';
import { addPostForPartner, getPostByPartnerId } from '../../apis/postApis';
import { formatRelativeTime } from '../../utils/formatTime';
import { getItemsByPartner } from '../../apis/itemApis';
import { IoLocationSharp } from 'react-icons/io5'

function PartnerProfile() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AppContext);
    const { id } = useParams();
    const [partner, setPartner] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [tab, setTab] = useState(1);

    const [openAddPostDialog, setOpenAddPostDialog] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [reRender, setReRender] = useState(new Date().getTime());

    const [posts, setPosts] = useState(null);
    const [items, setItems] = useState(null);

    useEffect(() => {
        let userItem = JSON.parse(localStorage.getItem('user'));
        if (userItem?.token) {
            getPartnerDataById(id, setPartner, setIsLoading);
            getPostByPartnerId(id, setPosts, setIsLoading);
            getItemsByPartner(setItems, id, setIsLoading)
        } else {
            navigate("/signin");
        }

        console.log(user)
    }, [user, reRender]);

    useEffect(() => {
        document.title = "HungerHalt / Partner";
    }, []);

    const addPost = (
        <div className='absolute top-0 right-0 left-0 bottom-0 bg-[#0008] flex items-center justify-center z-10'>
            <div className='flex flex-col gap-y-3 bg-white p-4 rounded-md text-gray-700 min-w-[320px] w-1/3'>
                <div className='text-xl leading-none font-semibold text-center pb-3 border-b border-b-gray-400'>Add Post</div>
                <div className='flex flex-col gap-1.5'>
                    <div className='text-gray-500'>Title</div>
                    <input
                        id="title"
                        name="title"
                        type='text'
                        value={title}
                        placeholder='Post Title'
                        onChange={e => setTitle(e.target.value)}
                        className='w-full h-12 p-2 rounded-md border !border-gray-500 text-lg leading-none'
                        required
                    />
                </div>
                <div className='flex flex-col gap-1.5'>
                    <div className='text-gray-500'>Description</div>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        placeholder='Description'
                        onChange={e => setDescription(e.target.value)}
                        rows={3}
                        className='w-full resize-none px-2 py-3 border border-gray-500 rounded-md text-lg leading-none'
                        required
                    />
                </div>
                <div className='flex items-center justify-end w-full gap-x-3'>
                    <button
                        className='px-3 py-2 tracking-wide text-sm rounded bg-green-500 text-gray-100'
                        onClick={() => addPostForPartner(user?.partnerId, title, description, setReRender, setOpenAddPostDialog)}
                    >Add Post</button>
                    <button
                        className='px-3 py-2 tracking-wide text-sm rounded bg-red-500 text-gray-100'
                        onClick={() => setOpenAddPostDialog(false)}
                    >Close</button>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {isLoading ? (
                <CustomLoader />
            ) : (
                <div className='h-[calc(100%-64px)] w-full text-gray-100 flex items-start justify-center p-4 relative'>
                    {openAddPostDialog && addPost}
                    <div className='h-full w-[80%] flex flex-col gap-y-4 overflow-y-auto' style={{ scrollbarWidth: "none" }}>
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
                        <div className='px-3 flex flex-col gap-y-4 w-full'>
                            <div className='flex items-center gap-x-4 justify-between rounded-lg'>
                                <div className='flex items-center gap-x-3'>
                                    <div className='text-3xl leading-none text-gray-200 font-semibold'>{partner?.userId?.name}</div>
                                    <a
                                        href={partner?.socials}
                                        rel='noreferrer'
                                        target='_blank'
                                        className='text-blue-400 hover:text-blue-600 transition-colors duration-200'
                                    >
                                        <img
                                            src={linklogo}
                                            alt="Link Logo"
                                            className='h-7 w-7 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200'
                                        />
                                    </a>
                                </div>
                                {user?.isPartner && (
                                    <Link
                                        to={`/orders/${user?.partnerId}`}
                                        className='px-4 py-2 tracking-wide text-sm rounded bg-green-700 text-gray-200 hover:bg-green-600 transition-colors duration-200'
                                    >
                                        Active Orders
                                    </Link>
                                )}
                            </div>
                            <p className='mt-2 flex items-center justify-start gap-x-2 text-gray-400 text-base leading-none tracking-wide'>
                                <IoLocationSharp className='text-lg' />{partner?.userId?.address}
                            </p>
                            <p className='mt-1 text-gray-300 tracking-wide'>
                                {partner?.description}
                            </p>
                            <div className='flex flex-col gap-y-4 py-2 w-full'>
                                <div className='flex items-end justify-between gap-x-4'>
                                    <div className='flex items-center gap-x-0 text-gray-400'>
                                        <div
                                            className={className('border-b-2 cursor-pointer border-b-gray-600 py-1 px-2.5', tab === 1 ? '!border-b-gray-200 text-gray-200' : '')}
                                            onClick={() => setTab(1)}
                                        >
                                            Posts
                                        </div>
                                        <div
                                            className={className('border-b-2 cursor-pointer border-b-gray-600 py-1 px-2.5', tab === 2 ? '!border-b-gray-200 text-gray-200' : '')}
                                            onClick={() => setTab(2)}
                                        >
                                            Items
                                        </div>
                                    </div>
                                    {user?.isPartner
                                        ? <>
                                            {tab === 1 && (
                                                <button
                                                    className='px-3 py-1 tracking-wide text-sm rounded bg-green-700 text-gray-200'
                                                    onClick={() => setOpenAddPostDialog(true)}
                                                >
                                                    Add Post
                                                </button>
                                            )}
                                            {tab === 2 && (
                                                <button className='px-3 py-1 tracking-wide text-sm rounded bg-green-700 text-gray-200'>
                                                    Add Item
                                                </button>
                                            )}
                                        </>
                                        : null
                                    }
                                </div>
                                {tab === 1 && (
                                    <div className='flex items-start justify-start flex-wrap w-full gap-4'>
                                        {posts?.map((post, index) => (
                                            <div
                                                className='flex flex-col rounded-lg overflow-hidden border border-gray-600 w-[32.25%] min-w-[340px] shadow-lg hover:shadow-xl transition-shadow duration-300'
                                                key={index}
                                            >
                                                <img
                                                    src={post?.image}
                                                    alt="Image"
                                                    className='min-h-44 max-h-44 w-full object-cover bg-white'
                                                />
                                                <div className='flex flex-col px-4 py-4 gap-y-3'>
                                                    <div className='flex items-center justify-between'>
                                                        <div className='text-blue-500 hover:text-blue-700 cursor-pointer transition-colors duration-200'>
                                                            {post?.partnerId?.userId?.name}
                                                        </div>
                                                        <div className='text-sm leading-none text-gray-400'>
                                                            {formatRelativeTime(post?.createdAt)}
                                                        </div>
                                                    </div>
                                                    <div className='text-xl leading-none text-gray-200 tracking-wide font-semibold'>
                                                        {post?.title}
                                                    </div>
                                                    <p className='text-gray-300 leading-6 overflow-hidden text-ellipsis line-clamp-2 w-full'>
                                                        {post?.description}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                        {posts?.length === 0 && (
                                            <div className='text-base leading-none tracking-wide text-gray-400 p-4 bg-gray-800 rounded-lg'>
                                                No posts found!
                                            </div>
                                        )}
                                    </div>
                                )}
                                {tab === 2 && (
                                    <div className='flex items-start justify-start flex-wrap w-full gap-4'>
                                        {items?.map((item, index) => {
                                            return (
                                                <div
                                                    className='flex flex-col rounded-lg overflow-hidden border border-gray-600 min-w-[340px] w-[32%] shadow-lg hover:shadow-xl transition-shadow duration-300'
                                                    key={index}
                                                >
                                                    <img
                                                        src={item?.postId?.image}
                                                        alt="Image"
                                                        className='min-h-44 max-h-44 w-full object-cover bg-white'
                                                    />
                                                    <div className='flex flex-col px-4 py-4 gap-y-3'>
                                                        <div className='flex items-center justify-between'>
                                                            <Link
                                                                to={`/partner/${item?.partnerId?._id}`}
                                                                className='text-blue-500 hover:text-blue-700 cursor-pointer transition-colors duration-200'
                                                            >
                                                                {item?.partnerId?.userId?.name}
                                                            </Link>
                                                            <div className='text-sm leading-none text-gray-400'>
                                                                {formatRelativeTime(item?.createdAt)}
                                                            </div>
                                                        </div>
                                                        <div className='text-xl leading-none text-gray-200 tracking-wide font-semibold'>
                                                            {item?.postId?.title}
                                                        </div>
                                                        <p className='text-gray-300 leading-6 overflow-hidden text-ellipsis line-clamp-2 w-full'>
                                                            {item?.postId?.description}
                                                        </p>
                                                        <div className='flex items-center justify-between gap-x-3 text-sm'>
                                                            <div className='text-gray-400'>Available Quantity: {item?.quantity}</div>
                                                            <div className='text-gray-400'>Price Per: ${item?.price}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                                <div className='flex flex-col gap-y-2'>
                                    <div>Tags</div>
                                    <div className='flex items-center gap-x-2 !text-xs'>
                                        {partner?.tags?.map((tag, ix) => (
                                            <div
                                                key={ix}
                                                className='py-0.5 px-1.5 rounded tracking-wide font-semibold bg-gray-300 text-gray-900'
                                            >
                                                {tag}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default PartnerProfile;