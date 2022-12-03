import { ReactComponent as LikeSvg } from "../../Static/icons/like.svg";
import commentPng from "../../Static/icons/comment.png";
import defaultAvatar from "../../Static/icons/default.png";
import { useUserState } from "../../context/userContext";
import axios from "axios";
import { useState } from "react";
import sendPng from "../../Static/icons/send.png";
import { ReactComponent as MusicSvg } from "../../Static/illustratos/music.svg";

const PostCard = ({ image, likes, user, comments, id, music ,text}) => {
  const current_user = useUserState();
  const [postLikes, setPostLikes] = useState(likes.length);
  const [postComments, setPostComments] = useState(comments);
  const [viewComments, setViewComments] = useState(false);

  if (!user.image) {
    user.image = defaultAvatar;
  }

  image = "http://localhost:8080/" + image;

  function likePost() {
    console.log("clicked");
    axios
      .put("/post", { user: current_user.id, id: id, type: "like" })
      .then((msg) => setPostLikes(postLikes + 1));
  }

  function addComment(e) {
    e.preventDefault();

    axios
      .put("/post", {
        user: current_user.id,
        id: id,
        type: "comment",
        text: e.target.text.value,
      })
      .then((msg) =>
        setPostComments(
          [
            {
              text: e.target.text.value,
              postedBy: { name: current_user.name },
            },
          ].concat(postComments)
        )
      );
  }

  console.log(music);
  console.log(image);
  console.log(text)
  return (
    <div className="overflow-hidden shadow-lg  rounded-2xl  w-full  cursor-pointer m-auto mb-6">
      <div className="bg-white w-full p-4 flex items-center ">
        <img
          className="w-10 h-10 rounded-full "
          alt="profile"
          src={user.image}
          width="50"
          height="50"
        />
        <p className=" ml-4 text-sm pr-red-cg font-medium">{user.name}</p>
      </div>
      <div className="w-full block h-full bg-white p-2">
        {!music ? (
          <img
            alt="profile"
            src={image}
            className="max-h-1/4 w-full object-cover bg-white rounded-3xl"
          />
        ) : (
          <>
            <MusicSvg className="h-64 w-full object-cover bg-white rounded-3xl"/>
            <audio
              controls
              className="w-11/12 mx-auto mt-8"
              src={`http://localhost:8080/${music}`}
            />
          <div className="mt-4 ml-8 "> 
              <div className="text-bold font-bold">
                  Translated Text
              </div>
              <div>
                  {text}
              </div>
          </div>
          </>
        )}
        <div className="bg-white flex gap-4 w-full p-4 items-center">
          <LikeSvg
            className="h-8 transition duration-500 ease-in-out transform hover:-translate-y-1"
            onClick={() => {
              likePost();
            }}
          ></LikeSvg>

          <img
            src={commentPng}
            onClick={() => setViewComments(!viewComments)}
            className="h-9 transition duration-500 ease-in-out transform hover:-translate-y-1"
            alt="post"
          ></img>
          <div className="float-right ml-auto pr-red-cg flex items-center gap-2">
            {" "}
            <p className="text-2xl">{postLikes}</p> likes
          </div>
        </div>
        {viewComments ? (
          <div>
            <div className="mx-4 p-2 flex flex-col max-h-40 overflow-y-scroll ">
              {postComments.map((comment) => (
                <div className="grid grid-cols-6 gap-0 text-sm">
                  <b className="col-span-1">{comment.postedBy.name}</b>
                  <p className="col-span-5"> {comment.text}</p>
                </div>
              ))}
            </div>

            <form
              className="p-2 mx-2 flex "
              onSubmit={(e) => {
                addComment(e);
              }}
            >
              <input
                type="text"
                name="text"
                id="comment-text"
                className="border rounded-2xl h-12 px-4 w-full pr-14 focus:outline-none focus:ring focus:border-blue-300"
                placeholder="comment here"
              />
              <input
                src={sendPng}
                type="image"
                alt="Submit"
                className="h-10 mt-1  -ml-14 rounded-xl hover:shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-1"
              />
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PostCard;
