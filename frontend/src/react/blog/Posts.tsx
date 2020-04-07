import React from "react";
import { NavLink } from "react-router-dom";
import { getData } from "../common/helpers";
import { UserContext } from "../common/context";
import useTitle from "../common/useTitle";

export interface Post {
  id: number;
  title: string;
  username: string;
  created: string;
  author_id: string;
  body: string;
}

const usePosts = () => {
  const [posts, setPosts] = React.useState<Post[]>([]);

  React.useEffect(() => {
    const fetch = async () => {
      const data = await getData<Post[]>("/blog/posts");
      setPosts(data);
    };
    fetch();
  }, []);
  return posts;
};

const Posts = () => {
  useTitle("Posts");
  const [user] = React.useContext(UserContext);
  const posts = usePosts();

  const renderPosts = posts.map((post) => (
    <article className="post" key={post.id}>
      <header>
        <div>
          <h1>{post.title}</h1>
          <div className="about">{`by ${post.username} on ${post.created}`}</div>
        </div>
        {user && Number(user.id) === Number(post.author_id) ? (
          <NavLink className="action" to={`/post/${post.id}`}>
            Edit
          </NavLink>
        ) : null}
      </header>
      <p className="body">{post.body}</p>
    </article>
  ));

  return (
    <>
      <header>
        <h1>Posts</h1>
        {user ? (
          <NavLink className="action" to="/create">
            New
          </NavLink>
        ) : null}
      </header>
      {renderPosts}
    </>
  );
};

export default Posts;
