const ProfileHeader = ({ email, name, image }) => {
    return (
        <div className="w-full px-8 py-4  mt-16 bg-white rounded-xl  shadow-lg ">
        <div className="flex justify-center -mt-16 ">
          <img
            className="object-cover w-40 h-40 border-2 border-indigo-500 mx-auto rounded-full transition duration-500 ease-in-out transform hover:-translate-y-2 cursor-pointer"
            alt="Testimonial avatar"
            src={image}
          />
        </div>
        <h3 className='text-2xl bold capitalize text-center mt-4' > {name} </h3>
        <h3 className='text-md  text-center text-gray-600' > {email} </h3>
      </div>
    );
  };
  
  export default ProfileHeader;