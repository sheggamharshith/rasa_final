import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { useUserState } from "../../context/userContext";
import { ReactComponent as PostSvg } from "../../Static/illustratos/post-upload.svg";


const link = "https://storage.googleapis.com/speechify-soundbite.appspot.com/audio/aab86959ec02de7731e331094f902d1537dea29d0348d0da8d2c14429c16475f.mp3?cb=1670055776125"

export default function PostCreateModal({
  open,
  setOpen,
  changePost,
  setChangePost,
}) {
  const cancelButtonRef = useRef(null);
  const currentUser = useUserState();
  const [selectedImage, setSelectedImage] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState(false);

  function createPost(postPath) {
    console.log(postPath);
    var data = null;
    if (selectedImage) {
      data = { image: postPath, user: currentUser.id };
    }
    if (selectedAudio) {
      data = { music: postPath, user: currentUser.id, text: "Hey there, this my first post" };
    }

    axios
      .post("/post", data)
      .then((res) => {
        console.log(res);
        setChangePost(!changePost);
        setOpen(false);
        setSelectedAudio(false);
        setSelectedImage(false);
      })
      .catch((err) => console.log(err));
  }

  // helps in submitting form
  function formSubmit(e) {
    e.preventDefault();
    var image = document.querySelector("#post-image");
    var audio = document.querySelector("#post-audio");
    var form = new FormData();
    if (selectedImage) {
      form.append("sampleFile", image.files[0]);
    }
    if (setSelectedAudio) {
      form.append("sampleFile", audio.files[0]);
    }
    axios({
      method: "post",
      url: "/upload",
      data: form,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (res) {
        console.log(res.data.path)
        createPost(res.data.path);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  }

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const audioChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedAudio(e.target.files[0]);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage();
  };

  const removeSelectedAudio = (e) => {
    setSelectedAudio();
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto "
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block min-h-full align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  w-full md:max-w-xl  ">
              <div
                className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4  relative flex flex-col "
                style={styles.customheight}
              >
                <h1 className="text-xl text-center text-bold pr-red-cg">
                  Create New Post{" "}
                </h1>
                <div className="h-full flex justify-center items-center  ">
                  <div className="">
                    <form onSubmit={(e) => formSubmit(e)}>
                      <input
                        id="post-image"
                        accept="image/*"
                        name="sampleFile"
                        type="file"
                        onChange={imageChange}
                        hidden
                      />
                      <input
                        id="post-audio"
                        accept="audio/*"
                        name="postVoice"
                        type="file"
                        onChange={audioChange}
                        hidden
                      />
                      <button type="submit" id="submit-form"></button>
                    </form>
                    {!selectedImage && !selectedAudio ? (
                      <div className=" flex flex-col ">
                        <PostSvg style={styles.postHeight} />
                        <div className="flex gap-2 justify-center">
                          <label
                            htmlFor="post-image"
                            className="pr-red-bg hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer text-center "
                          >
                            Upload Image
                          </label>
                          <label
                            htmlFor="post-audio"
                            className="pr-red-bg hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer text-center "
                          >
                            Upload Voice
                          </label>
                        </div>
                      </div>
                    ) : null}
                    {selectedImage && (
                      <div>
                        <img
                          src={URL.createObjectURL(selectedImage)}
                          style={styles.image}
                          alt="Thumb"
                          className="border"
                        />
                        <button
                          onClick={removeSelectedImage}
                          className="pr-red-bg hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer mt-4 w-full max-w-lg "
                        >
                          Remove
                        </button>{" "}
                        <label
                          htmlFor="submit-form"
                          type="submit"
                          className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg cursor-pointer mt-4 w-full max-w-lg mx-auto text-center"
                        >
                          Create
                        </label>
                      </div>
                    )}
                    {selectedAudio && (
                      <div>
                        <audio
                          controls
                          name=""
                          src={URL.createObjectURL(selectedAudio)}
                        />
                        <button
                          onClick={removeSelectedAudio}
                          className="pr-red-bg hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer mt-4 w-full max-w-lg "
                        >
                          Remove
                        </button>{" "}
                        <label
                          htmlFor="submit-form"
                          type="submit"
                          className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg cursor-pointer mt-4 w-full max-w-lg mx-auto text-center"
                        >
                          Create
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

// / Just some styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  preview: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
  },
  image: { maxWidth: "100%", maxHeight: 320 },
  delete: {
    cursor: "pointer",
    padding: 15,
    background: "red",
    color: "white",
    border: "none",
  },
  customheight: {
    height: "600px ",
  },
  postHeight: {
    height: "400px",
  },
};
