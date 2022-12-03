import { useState } from "react";
import {
  signOut,
  useUserDispatch,
  useUserState,
} from "../../context/userContext";
import rasalogo from "../../Static/illustratos/main-rasa.png";
import { useLocation } from "react-router-dom";
import defaultAvatar from "../../Static/icons/default.png";

const Header = () => {
  const [profileToggle, setprofileToggle] = useState(false);
  const [toggle, setToggle] = useState(false);
  const current_user = useUserState();
  const location = useLocation().pathname;
  const userDispatch = useUserDispatch();

  if (current_user.image === "undefined") {
    current_user.image = defaultAvatar;
  }

  return (
    <>
      <nav className="bg-white mb-2">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md pr-dblu-cg  hover:text-blue-400 hover:bg-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() => setToggle(!toggle)}
              >
                <span className="sr-only">Open main menu</span>

                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>

                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <img
                  className="block lg:hidden h-8 w-auto transition duration-500 ease-in-out transform hover:-translate-y-2"
                  src={rasalogo}
                  alt="Workflow"
                />
                <img
                  className="hidden lg:block h-8 w-auto transition duration-500 ease-in-out transform hover:-translate-y-2 cursor-pointer"
                  src={rasalogo}
                  alt="Workflow"
                />
              </div>
              <div className="hidden mx-auto sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <a
                    href="/home"
                    className={` px-3 py-2 rounded-md text-sm hover:bg-gray-700 hover:text-white font-medium transition duration-500 ease-in-out transform hover:-translate-y-1 ${
                      location === "/home"
                        ? "pr-red-bg text-white"
                        : "pr-dblu-cg"
                    } `}
                    aria-current="page"
                  >
                    Home
                  </a>

                  <a
                    href="/chat"
                    className={` px-3 py-2 rounded-md text-sm hover:bg-gray-700 hover:text-white font-medium transition duration-500 ease-in-out transform hover:-translate-y-1 ${
                      location === "/chat"
                        ? "pr-red-bg text-white"
                        : "pr-dblu-cg"
                    } `}
                  >
                    Chats
                  </a>
                  <a
                    href="/look-friends"
                    className={` px-3 py-2 rounded-md text-sm hover:bg-gray-700 hover:text-white font-medium transition duration-500 ease-in-out transform hover:-translate-y-1 ${
                      location === "/look-friends"
                        ? "pr-red-bg text-white"
                        : "pr-dblu-cg"
                    } `}
                  >
                    Friends
                  </a>
                  <a
                    href="/friend-request"
                    className={` px-3 py-2 rounded-md text-sm hover:bg-gray-700 hover:text-white font-medium transition duration-500 ease-in-out transform hover:-translate-y-1 ${
                      location === "/friend-request"
                        ? "pr-red-bg text-white"
                        : "pr-dblu-cg"
                    } `}
                  >
                    Request
                  </a>
                  
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="text-gray-700 p-1 rounded-full text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span className="sr-only">View notifications</span>

                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>

              <div className="ml-3 relative">
                <div>
                  <button
                    type="button"
                    className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    id="user-menu-button"
                    onClick={() => setprofileToggle(!profileToggle)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={current_user.image}
                      alt=""
                    />
                  </button>
                </div>
                {profileToggle ? (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    <a
                      href="/userprofile"
                      className="block px-4 py-2 text-sm pr-dblu-cg hover:bg-gray-700 hover:text-white "
                      role="menuitem"
                      tabIndex="0"
                      id="user-menu-item-0"
                    >
                      Your Profile
                    </a>
                    <a
                      href="/settings"
                      className="block px-4 py-2 text-sm pr-dblu-cg hover:bg-gray-700 hover:text-white"
                      role="menuitem"
                      tabIndex="0"
                      id="user-menu-item-1"
                    >
                      Settings
                    </a>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        signOut(userDispatch);
                      }}
                      className="block px-4 py-2 text-sm pr-dblu-cg hover:bg-gray-700 hover:text-white"
                      role="menuitem"
                      tabIndex="0"
                      id="user-menu-item-2"
                    >
                      Sign out
                    </a>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {toggle ? (
          <div
            className={
              toggle ? "sm:hidden" : "sm:hidden transition ease-in-out "
            }
            id="mobile-menu"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="/home"
                className={` block px-3 py-2 rounded-md text-base font-medium ${
                  location === "/home" ? "pr-dblu-bg text-white" : "pr-dblu-cg"
                }`}
                aria-current="page"
              >
                Feed
              </a>

              <a
                href="/chat"
                className="pr-dblu-cg hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Chats
              </a>
            </div>
          </div>
        ) : null}
      </nav>
    </>
  );
};

export default Header;
