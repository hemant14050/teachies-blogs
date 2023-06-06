import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Spinner from './Spinner.js';
import BlogDetailes from '../components/BlogDetailes'

export default function Blogs() {
  const { posts, loading } = useContext(AppContext);

  return (
    <div className="flex flex-col my-3">
      {loading ? (
        <div className="min-h-[80vh] w-full flex justify-center items-center">
          <Spinner/>  
        </div>
      ) : posts.length === 0 ? (
        <div className="min-h-[80vh] w-full flex justify-center items-center">
          <p className="text-center font-bold text-3xl">No Blogs Found !</p>
        </div>
      ) : ( 
        posts.map((post) => (
            <BlogDetailes key={post.id} post={post}/>
        ))
      )}
    </div>
  );
}
