import { useEffect, useState } from "react";
import axios from "axios";
import DashBoardTemplate from "../../components/Layout";
import Loader from "../../components/Loader";
import ProfileHeader from "../../components/ProfileHeader";
import UserProfilePost from "../../components/UserProfilePost";
import { useParams } from "react-router";

const User = () => {
  const [user, setUser] = useState({});
  const [loadUser, setLoadUser] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loadPost, setLoadPost] = useState(false);
  const { id } = useParams();

  // get posts
  useEffect(() => {
    setLoadPost(true);
    axios
      .get("post/user/" + id)
      .then((res) => {
        setLoadPost(false);
        console.log(res.data);
        setPosts(res.data);
      })
      .catch((err) => {
        setLoadPost(false);
        console.log(err);
      });
  }, [id]);

  // get posts
  useEffect(() => {
    setLoadUser(true);
    axios
      .get("users/" + id)
      .then((res) => {
        setLoadUser(false);
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        setLoadUser(false);
        console.log(err);
      });
  }, [id]);

  return (
    <DashBoardTemplate>
      {!loadPost ? (
        <div className="max-w-6xl mx-auto">
          {!loadUser ? <ProfileHeader {...user} /> : <Loader />}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
            {posts.map((post) => (
              <UserProfilePost {...post} key={post.id} />
            ))}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </DashBoardTemplate>
  );
};

export default User;
