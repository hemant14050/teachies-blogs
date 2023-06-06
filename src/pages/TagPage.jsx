import React from 'react';
import Header from '../components/Header';
import { useNavigate, useLocation } from 'react-router-dom';
import Blogs from '../components/Blogs';
import Pagination from '../components/Pagination';

const TagPage = () => {
    const navigation = useNavigate();
    const location = useLocation();

    const tag = location.pathname.split("/").at(-1);

    return (
        <div> 
            <Header/>
            <div className='mt-[100px] w-11/12 max-w-2xl mx-auto flex space-x-4 items-baseline'>
                <button
                className='border-2 border-gray-300 py-1 px-4 rounded-md'
                onClick={()=>navigation(-1)}
                >
                    Back
                </button>
                <h2 className='text-xl font-bold'>
                    Blogs Tagged {" "}<span className='font-semibold underline text-blue-700'>#{tag}</span>
                </h2>
            </div>
            <div className='mb-[100px]'>
                <Blogs/>
                <Pagination/>
            </div>
        </div>
    )
}

export default TagPage;