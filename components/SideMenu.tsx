import React from "react";
import Profile from "./Profile";
import { AiFillHome, AiFillHeart } from "react-icons/ai";
import { BsMusicNoteList } from "react-icons/bs";
import { IoExit } from "react-icons/io5";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, userCleared } from "../app/slices/user";

function SideMenu() {
  const user = useSelector(selectUser);
  const router = useRouter();
  const dispatch = useDispatch();

  const closeMenu = () => {
    document.querySelector("#side-menu")!.classList.add("-translate-x-full");
    document.querySelector("#overlay-close-side-menu")!.classList.add("hidden");
  };

  const logout = () => {
    dispatch(userCleared());
    localStorage.removeItem("localUserId");
    router.replace("/login");
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 bg-transparent backdrop-blur-md w-64 h-fit pb-6 text-white px-4 transition-all duration-300 rounded-br-super z-10"
        id="side-menu"
      >
        {user.authenticated && (
          <button
            type="button"
            className="text-2xl absolute top-2 right-4 rotate-180"
            onClick={logout}
          >
            <IoExit />
          </button>
        )}
        <Profile />
        <ul className="mt-5">
          <li className="py-3 flex flex-row">
            <AiFillHome className="mr-2" />
            Home
          </li>
          <li className="py-3 flex flex-row">
            <BsMusicNoteList className="mr-2" />
            My songs
          </li>
          <li className="py-3 flex flex-row">
            <AiFillHeart className="mr-2" />
            Liked songs
          </li>
        </ul>
      </div>
      <div
        id="overlay-close-side-menu"
        className="300 fixed top-0 left-0 w-screen h-screen z-0"
        onClick={closeMenu}
      />
    </>
  );
}

export default SideMenu;
