import "./App.css";
import { useContext, useEffect } from "react";
import { useLocation, useSearchParams, Routes, Route } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import Home from "./pages/Home.jsx";
import TagPage from "./pages/TagPage.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";

function App() {
  const { fetchBlogPosts } = useContext(AppContext);

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const page = searchParams.get("page") ?? 1;

    if (location.pathname.includes("tags")) {
      const tag = location.pathname.split("/").at(-1).replace("-", " ");
      fetchBlogPosts(Number(page), tag);
    } else if (location.pathname.includes("categories")) {
      const category = location.pathname.split("/").at(-1).replace("-", " ");
      fetchBlogPosts(Number(page), category);
    } else {
      fetchBlogPosts(Number(page));
    }
  }, [location.pathname, location.search]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog/:blogId" element={<BlogPage />} />
      <Route path="/tags/:tag" element={<TagPage />} />
      <Route path="/catgories/:category" element={<CategoryPage />} />
    </Routes>
  );
}
export default App;
