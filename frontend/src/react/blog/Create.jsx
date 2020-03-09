// @flow
import * as React from "react";
import PostForm from "../common/PostForm";
import Title from "../common/Title";

function Create() {
  return (
    <>
      <Title title="New post" />
      <header>
        <h1>New post</h1>
      </header>
      <PostForm url="/blog/post/create" />
    </>
  );
}

export default Create;
