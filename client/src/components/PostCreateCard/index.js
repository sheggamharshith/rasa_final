import { useState } from "react";
import PostCreateModal from "../PostCreateModal";
import editIcon from "../../Static/icons/edit.png";

const PostCreateCard = ({changePost,setChangePost}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg py-2 px-4  mx-auto hover:bg-gray-700   shadow-xl border  flex items-center shadow-xl transition duration-500 ease-in-out hover:text-white transform hover:-translate-y-2"
      >
        <img src={editIcon} className="h-8" alt="post"></img>
        Create Post
      </button>
      <PostCreateModal open={open} changePost={changePost} setChangePost={setChangePost} setOpen={setOpen} />
    </div>
  );
};

export default PostCreateCard;
