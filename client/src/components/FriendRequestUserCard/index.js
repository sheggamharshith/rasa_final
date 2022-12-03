import axios from "axios";
import defaultAvatar from "../../Static/icons/default.png";

const sendRequestToUser = (from_user, to_user) => {
  const data = {
    from_user: from_user,
    to_user: to_user,
    status:2
  };
  console.log(data)
  axios
    .post("friend-request/update", data)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => console.log(error));
};

const FriendRequestUserCard = ({
from_user,
to_user
}) => {
  const sendRequest = () => {
    console.log(from_user,to_user)
    sendRequestToUser(from_user.id,to_user.id);
  };

  if (!from_user.image) {
    from_user.image = defaultAvatar;
  }
  return (
    <div className="w-full px-8 py-4  mt-16 bg-white rounded-lg shadow-lg ">
      <div className="flex justify-center -mt-16 ">
        <img
          className="object-cover w-40 h-40 transition duration-500 ease-in-out transform hover:-translate-y-2 border-2 border-indigo-500 mx-auto rounded-full dark:border-indigo-400"
          alt="Testimonial avatar"
          src={from_user.image}
        />
      </div>
      <div className="flex items-center flex-col">
        <h3 className="text-2xl bold capitalize text-center mt-4"> {from_user.name} </h3>
        <h3 className="text-md  text-center text-gray-600"> {from_user.email} </h3>
        <div className="mt-4 space-x-4 p-4 ">
          <a href={`/user/${from_user.id}`}>
            <button className="rounded-lg py-2 px-4 mt-4 mx-auto hover:bg-gray-700 text-white pr-red-bg  shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-2">
              Profile
            </button>
          </a>
          <button
            onClick={(e) => sendRequest()}
            className="rounded-lg py-2 px-4 mt-4 mx-auto hover:bg-gray-700 text-white pr-red-bg  shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-2"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendRequestUserCard;
