import defaultAvatar from  "../../Static/icons/default.png"

const UserInfoCard = ({ email, name, image }) => {
  if(image === "undefined"){
    image = defaultAvatar
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
      <div className='flex items-center flex-col'>
      <h3 className="text-2xl bold capitalize text-center mt-4"> {name} </h3>
      <h3 className="text-md  text-center text-gray-600"> {email} </h3>
      <a href='/userprofile' className='rounded-lg py-2 px-4 mt-4 mx-auto hover:bg-gray-700 text-white pr-red-bg  shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-2'> view profile </a>
      </div>
    </div>
  );
};

export default UserInfoCard;
