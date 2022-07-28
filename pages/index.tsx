import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import client, {
  genreSongQuery,
  libraryQuery,
  mySongsQuery,
  recentSongsQuery,
  userQuery,
} from "../app/sanityClient";
import {
  fetchingUserDataAttemptFinished,
  fetchingUserDataAttemptStarted,
  selectUser,
  userAuthenticated,
} from "../app/slices/user";
import { v4 as uuidv4 } from "uuid";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
//
import { SideMenu, SearchBar, Container, UploadSong } from "../components";
import { selectUpload } from "../app/slices/upload";
import { songsSet } from "../app/slices/songs";
import Player from "../components/Player";
import {
  fetchingMySongsFinished,
  fetchingMySongsStarted,
  mySongsSet,
  selectMySongs,
} from "../app/slices/mySongs";
import { Song } from "../app/song";
import { librarySet } from "../app/slices/library";

type Props = {
  recentSongs: Song[];
  popSongs: Song[];
  rockSongs: Song[];
};

const Home: NextPage<Props> = ({ recentSongs, popSongs, rockSongs }) => {
  const user = useSelector(selectUser);
  const mySongs = useSelector(selectMySongs);
  const { uploadContainerVisible } = useSelector(selectUpload);
  const dispatch = useDispatch();

  useEffect(
    function setSongs() {
      dispatch(
        songsSet({ pop: popSongs, rock: rockSongs, recent: recentSongs })
      );
    },
    [rockSongs, popSongs, recentSongs]
  );

  useEffect(
    function getUserData() {
      if (typeof window !== "undefined" && !user.authenticated) {
        if (localStorage.getItem("localUserId")) {
          const userId = JSON.parse(localStorage.getItem("localUserId") || "");
          const query = userQuery(userId);

          if (userId !== "") {
            dispatch(fetchingUserDataAttemptStarted());
            client
              .fetch(query)
              .then(
                (
                  response: {
                    username: string;
                    image: string;
                    _id: string;
                    libraryId: string;
                  }[]
                ) => {
                  const { username, image, _id, libraryId } = response[0];

                  dispatch(
                    userAuthenticated({
                      username: username,
                      image: image,
                      id: _id,
                      libraryId: libraryId,
                    })
                  );
                }
              )
              .finally(() => dispatch(fetchingUserDataAttemptFinished()));
          }
        }
      }
    },
    [user]
  );

  useEffect(
    function getMySongs() {
      if (mySongs.songs.length === 0 && user.authenticated) {
        dispatch(fetchingMySongsStarted());
        const query = mySongsQuery(user.data.id);

        client
          .fetch(query)
          .then((res: Song[]) => {
            dispatch(mySongsSet(res));
          })
          .finally(() => dispatch(fetchingMySongsFinished()));
      }
    },
    [user.authenticated]
  );

  useEffect(
    function createLibrary() {
      if (user.authenticated) {
        const doc = {
          _type: "library",
          _id: user.data.libraryId,
          userId: user.data.id,
        };

        client.createIfNotExists(doc);
      }
    },
    [userAuthenticated]
  );

  useEffect(
    function getSongsFromLibrary() {
      if (user.authenticated) {
        const query = libraryQuery(user.data.libraryId);
        client
          .fetch(query)
          .then((res: { songs: Song[] }[]) =>
            dispatch(librarySet(res[0].songs))
          );
      }
    },
    [user.authenticated]
  );

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
      <div className="min-w-screen min-h-screen bg-darkBlue text-white overflow-x-hidden">
        <header className="relative">
          <div className="flex justify-center items-center mt-5">
            <SearchBar />
          </div>
          <button
            type="button"
            className="text-3xl fixed top-2 left-2 lg:hidden"
            onClick={showMenu}
          >
            <HiOutlineMenuAlt1 />
          </button>
        </header>
        {uploadContainerVisible ? <UploadSong /> : <Container />}
        <SideMenu />
        <Player />

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

export const getStaticProps = async function () {
  const query = recentSongsQuery();
  const popSongsQuery = genreSongQuery("pop");
  const rockSongsQuery = genreSongQuery("rock");

  const recentSongsResponse = await client.fetch(query);
  const popSongsResponse = await client.fetch(popSongsQuery);
  const rockSongsResponse = await client.fetch(rockSongsQuery);

  return {
    props: {
      recentSongs: recentSongsResponse,
      popSongs: popSongsResponse,
      rockSongs: rockSongsResponse,
    },
  };
};

export default Home;
