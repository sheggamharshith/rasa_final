import { useEffect, useState } from "react";
import axios from "axios";
import DashBoardTemplate from "../../components/Layout";
import { useUserState } from "../../context/userContext";
import Loader from "../../components/Loader";
import ProfileHeader from "../../components/ProfileHeader";
import UserProfilePost from "../../components/UserProfilePost";

const UserProfile = () => {
  const [posts, setPosts] = useState([]);
  const [loadPost, setLoadPost] = useState(false);
  const current_user = useUserState();

  // get posts
  useEffect(() => {
    setLoadPost(true);
    axios
      .get("post/user/" + current_user.id)
      .then((res) => {
        setLoadPost(false);
        console.log(res.data);
        setPosts(res.data);
      })
      .catch((err) => {
        setLoadPost(false);
        console.log(err);
      });
  }, [current_user]);

  return (
    <DashBoardTemplate>
      {!loadPost ? (
        <div className="max-w-6xl mx-auto">
          <ProfileHeader {...current_user} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
            {posts.map((post) => (
              <UserProfilePost {...post} key={post.id}/>
            ))}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </DashBoardTemplate>
  );
};

export default UserProfile;
