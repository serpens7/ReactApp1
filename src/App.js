import "./styles/App.css";
import React, { useState, useMemo, useEffect } from "react";
import Counter from "./components/Counter";
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/MyModal/MyModal";
import MyButton from "./components/button/MyButton";
import Loader from "./components/Loader/Loader";
import { usePosts } from "./hooks/usePosts";
import { useFetching } from "./hooks/useFetching";
import PostService from "./API/PostService";
import { usePaggination } from "./hooks/usePaggination";
import getPageCount from "./components/utils/pages";

import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);

  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const sortedAndSearchedPost = usePosts(posts, filter.sort, filter.query);

  const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers[`x-total-count`];
    setTotalPages(getPageCount(totalCount, limit));
  });

  let pagesArray = usePaggination(totalPages);
  console.log(page, sortedAndSearchedPost);

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
      <button onClick={fetchPosts}>GET POSTS</button>
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        Make Post
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {postError && <h1>Something went wrong...${postError}</h1>}
      {isPostLoading ? (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        >
          <Loader />
        </div>
      ) : (
        <PostList
          remove={removePost}
          posts={sortedAndSearchedPost}
          title="Post list about JS"
        />
      )}
      {pagesArray.map((p) => (
        <MyButton onClick={() => setPage(p)}>{p}</MyButton>
      ))}
    </div>
  );
}
export default App;

{
  /*  "Управляемый инпут":

  const [searchQuery, setSearchQuery] =useState("");

  value={searchQuery}
onChange={e=>setSearchQuery(e.target.value)} */
}

{
  /* setPosts(
  [...posts].sort((a, b) => {
    return typeof b[sort] === "number"
      ? a[sort] - b[sort]
      : a[sort].localeCompare(b[sort]);
  })
);
*/
}
