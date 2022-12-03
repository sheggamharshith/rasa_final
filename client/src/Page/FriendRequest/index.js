import { useEffect, useState } from "react";
import axios from "axios";
import DashBoardTemplate from "../../components/Layout";
import Loader from "../../components/Loader";
import { useUserState } from "../../context/userContext";
import FriendRequestUserCard from "../../components/FriendRequestUserCard";

const FriendRequest = () => {
  const [users, setUsers] = useState([]);
  const [loadUser, setLoadUser] = useState(false);
  const [initUser, setInitUser] = useState(false);
  const currentUser = useUserState();
  console.log(currentUser);

  // get users
  useEffect(() => {
    setLoadUser(true);
    axios
      .get("friend-request/" + currentUser.id)
      .then((response) => {
        console.log(response.data);
        setLoadUser(false);
        setUsers(response.data);
      })
      .catch((err) => {
        setLoadUser(false);
        console.log(err);
      });
  }, [initUser,currentUser]);

  return (
    <DashBoardTemplate>
      <div className="mx-auto  max-w-7xl h-full ">
        <div className="grid grid-cols-1 md:grid-cols-3  gap-4   pb-10 ">
          {!loadUser ? (
            users.map((user,id) => (
              <FriendRequestUserCard
                {...user}
                key={id}
                userRest={setInitUser}
                value={initUser}
              />
            ))
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </DashBoardTemplate>
  );
};

export default FriendRequest;
