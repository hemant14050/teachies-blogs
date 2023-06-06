import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
// import {baseUrl} from "../baseUrl";
import Spinner from '../components/Spinner';
import BlogDetailes from '../components/BlogDetailes'

const BlogPage = () => {
  const newBaseUrl = "https://codehelp-apis.vercel.app/api/"
  const navigation = useNavigate();
  const location = useLocation();
  const {setLoading, loading} = useContext(AppContext);
  const blogId = location.pathname.split("/").at(-1);

  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  async function fetchRelatedBlogs() {
    setLoading(true);
    let url = `${newBaseUrl}get-blog?blogId=${blogId}`;
    // console.log("URL is:", url)
    try{ 
      const res = await fetch(url);
      const data = await res.json();
      // console.log("data is:",data)
      setBlog(data.blog);
      setRelatedBlogs(data.relatedBlogs);

    } catch(err) {
      console.log("An error occured while fetching blogs.")
      setBlog(null);
      setRelatedBlogs([]);
    }
    setLoading(false);
  }

  useEffect(()=>{
    if(blogId) {
      fetchRelatedBlogs();
    }
  }, [location.pathname]);
  
  return (
    <div>
      <Header/>
      <div className='mt-[100px] mb-4 w-11/12 max-w-2xl mx-auto'>
        <button
        className='border-2 border-gray-300 py-1 px-4 rounded-md'
        onClick={()=>navigation(-1)}
        >
          Back
        </button>
      </div>
      <div className='mb-[60px]'>
      {
          loading ? 
          (<div className="min-h-[80vh] w-full flex justify-center items-center">
          <Spinner/>  
        </div>):
          (blog? 
          (
            <div>
              <BlogDetailes post={blog}/>
              <h2
              className='text-2xl font-bold mt-5 mb-3 w-11/12 max-w-2xl mx-auto'
              >
              Related Blogs</h2>  
              <div className='space-y-5'>
                {
                  relatedBlogs.map((post)=>{
                    return (
                      <BlogDetailes key={post.id} post={post}/>
                    )
                  })
                }
              </div>
            </div>):
          (<p className='flex justify-center text-xl'>No Blogs Found</p>))
        }
      </div>
    </div>
  )
}

export default BlogPage;