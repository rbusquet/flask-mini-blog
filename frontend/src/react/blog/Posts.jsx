// @flow
import * as React from "react";
import { NavLink } from "react-router-dom";
import { getData } from "../common/helpers";
import { UserContext } from "../common/context";
import Title from "../common/Title";

const usePosts = () => {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    const fetch = async () => {
      const data = await getData("/blog/posts");
      setPosts(data);
    };
    fetch();
  }, []);
  return posts;
};

const Posts = () => {
  const [user] = React.useContext(UserContext);
  const posts = usePosts();

  const renderPosts = posts.map(post => (
    <article className="post" key={post.id}>
      <header>
        <div>
          <h1>{post.title}</h1>
          <div className="about">
            {`by ${post.username} on ${post.created}`}
          </div>
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
      <Title title="Posts" />
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
