import axios from "axios";
import defaultAvatar from "../../Static/icons/default.png";

const sendRequestToUser = (from_user, to_user, userRest, value) => {
  const data = {
    from_user: from_user,
    to_user: to_user,
    status: 1,
  };
  axios
    .post("friend-request", data)
    .then((response) => {
      userRest(!value);
    })
    .catch((error) => console.log(error));
};

const FriendUserCard = ({
  email,
  name,
  image,
  _id,
  from_user,
  connection,
  userRest,
  value,
}) => {
  const sendRequest = () => {
    sendRequestToUser(from_user, _id, userRest, value);
  };

  // checks status 
  let status = 0;
  if (connection) {
    status = connection.status;
  }

  if (!image) {
    image = defaultAvatar;
  }
  return (
    <div className="w-full px-8 py-4  mt-16 bg-white rounded-lg shadow-lg ">
      <div className="flex justify-center -mt-16 ">
        <img
          className="object-cover w-40 h-40 transition duration-500 ease-in-out transform hover:-translate-y-2 border-2 border-indigo-500 mx-auto rounded-full dark:border-indigo-400"
          alt="Testimonial avatar"
          src={image}
        />
      </div>
      <div className="flex items-center flex-col">
        <h3 className="text-2xl bold capitalize text-center mt-4"> {name} </h3>
        <h3 className="text-md  text-center text-gray-600"> {email} </h3>
        <div className="mt-4 space-x-4 p-4 ">
          <a href={`/user/${_id}`}>
            <button className="rounded-lg py-2 px-4 mt-4 mx-auto hover:bg-gray-700 text-white pr-red-bg  shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-2">
              Profile
            </button>
          </a>
          {status === 0 ? (
            <button
              onClick={(e) => sendRequest()}
              className="rounded-lg py-2 px-4 mt-4 mx-auto hover:bg-gray-700 text-white pr-red-bg  shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-2"
            >
              Follow
            </button>
          ) : null}
          {status === 1 ? (
            <button className="rounded-lg py-2 px-4 mt-4 mx-auto bg-gray-700 text-white  shadow-2xl ">
              Request Pending
            </button>
          ) : null}
          {status === 2 ? (
            <button className="rounded-lg py-2 px-4 mt-4 mx-auto bg-green-700 text-white  shadow-2xl ">
              Connected
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default FriendUserCard;
