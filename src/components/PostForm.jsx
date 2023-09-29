import React, { useState } from "react";
import MyButton from "./button/MyButton";
import MyInput from "./input/MyInput";

const PostForm = ({ create }) => {
  const [post, setPost] = useState({ title: "", body: "" });

  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = { ...post, id: Date.now() };
    create(newPost);
    setPost({ title: "", body: "" });
  };

  return (
    <form>
      {/*Управляемый компонент*/}
      <MyInput
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        type="text"
        placeholder="Post name"
      />

      <MyInput
        value={post.body}
        onChange={(e) => setPost({ ...post, body: e.target.value })}
        type="text"
        placeholder="Post description"
      />

      <MyButton onClick={addNewPost}>Make Post</MyButton>
    </form>
  );
};

export default PostForm;


{
  /*  Неуправляемый компонент
      const bodyInputRef = React.useRef();
                  ...
      console.log(bodyInputRef.current.value);
          
          <MyInput
          type="text"
          ref={bodyInputRef}
          placeholder="Post description"
        />*/
}
