import React from "react";
import PostForm from "../common/PostForm";
import useTitle from "../common/useTitle";

function Create() {
  useTitle("NewPost");
  return (
    <>
      <header>
        <h1>New post</h1>
      </header>
      <PostForm url="/blog/post/create" />
    </>
  );
}

export default Create;
