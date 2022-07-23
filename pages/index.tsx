import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import client, { userQuery } from "../app/sanityClient";
import { selectUser, userAuthenticated } from "../app/slices/user";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
//
import { SideMenu, SearchBar, Container, UploadSong } from "../components";
import { selectUpload } from "../app/slices/upload";

const Home: NextPage = () => {
  const user = useSelector(selectUser);
  const { uploadContainerVisible } = useSelector(selectUpload);
  const dispatch = useDispatch();

  useEffect(function getUserData() {
    if (typeof window !== "undefined" && !user.authenticated) {
      if (localStorage.getItem("localUserId")) {
        const userId = JSON.parse(localStorage.getItem("localUserId") || "");
        const query = userQuery(userId);

        if (userId !== "") {
          client
            .fetch(query)
            .then(
              (
                response: { username: string; image: string; _id: string }[]
              ) => {
                const { username, image, _id } = response[0];

                dispatch(
                  userAuthenticated({
                    username: username,
                    image: image,
                    id: _id,
                  })
                );
              }
            );
        }
      }
    }
  }, []);

  const showMenu = function () {
    document.querySelector("#side-menu")!.classList.remove("-translate-x-full");
    document
      .querySelector("#overlay-close-side-menu")!
      .classList.remove("hidden");
  };

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="min-w-screen min-h-screen bg-blue text-white">
        <header className="relative">
          <div className="pl-16 pt-2 flex flex-row flex-wrap justify-center items-center">
            <SearchBar />
          </div>
          <button
            type="button"
            className="text-3xl fixed top-2 left-2 lg:hidden"
            onClick={showMenu}
          >
            <GiHamburgerMenu />
          </button>
        </header>
        {uploadContainerVisible ? <UploadSong /> : <Container />}
        <SideMenu />

        <footer className="flex flex-row p-2">
          <a
            href="https://github.com/EsdrasLimaSilva"
            target="_blank"
            className="text-3xl"
          >
            <AiFillGithub />
          </a>
          <a href="" target="_blank" className="text-3xl ml-2">
            <AiFillLinkedin />
          </a>
        </footer>
      </div>
    </>
  );
};

export default Home;
