const UserCard = ({ email, name, image }) => {


  return (
    <div className="w-full border hover:bg-gray-50 shadow-lg flex  items-center bg-white p-4 rounded-xl">
      <div className="">
      <img className="w-12 h-12 rounded-full " src={image} alt="" width="100" height="100"/>
      </div>
      <div className="flex flex-col ml-5">
        <p className="bold text-md">{name}</p>
        <p className="bold text-sm">{email}</p>
      </div>
    </div>
  );
};

export default UserCard;