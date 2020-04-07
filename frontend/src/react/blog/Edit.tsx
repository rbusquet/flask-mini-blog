import React from "react";
import { getData, postData } from "../common/helpers";
import PostForm from "../common/PostForm";
import history from "../common/history";
import { Post } from "./Posts";

type PropTypes = {
  match: {
    params: {
      id: number;
    };
  };
};

const Edit = (props: PropTypes) => {
  const { match } = props;
  const [post, setPost] = React.useState<Post>();
  React.useEffect(() => {
    const getPost = async () => {
      setPost(await getData<Post>(`/blog/post/${match.params.id}`));
    };
    getPost();
  }, [match.params.id]);

  const deletePost = () => {
    const confirm = window.confirm("Are you sure?");
    if (confirm) {
      postData(`/blog/post/${match.params.id}/delete`, {}).then(() => history.push("/"));
    }
  };

  return (
    <>
      <header>
        <h1>Edit post</h1>
      </header>
      <PostForm url={`/blog/post/${match.params.id}/update`} post={post} />
      <input className="danger" type="submit" value="Delete" onClick={deletePost} />
    </>
  );
};

export default Edit;
