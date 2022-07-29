import { useRouter } from "next/router";
import { useEffect } from "react";
import { BsFileEarmarkMusicFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { selectLibrary } from "../app/slices/library";
import { selectUser } from "../app/slices/user";
import Song from "./Song";

function Library() {
  const user = useSelector(selectUser);
  const library = useSelector(selectLibrary);
  const router = useRouter();

  useEffect(
    function showLibrarySongs() {
      setTimeout(() => {
        document
          .querySelector("#library-songs-container")
          ?.classList.remove("translate-x-10");
        document
          .querySelector("#library-songs-container")
          ?.classList.remove("opacity-0");
      }, 200);
    },
    [library]
  );

  if (!user.authenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>
          You need to{" "}
          <button
            type="button"
            className="px-2 bg-orange-500 rounded-lg"
            onClick={() => router.push("/login")}
          >
            sign in
          </button>
        </p>
      </div>
    );
  }

  if (library.songs.length === 0) {
    return (
      <div className="flex justify-center items-center flex-row flex-wrap min-h-screen">
        <h2 className="flex flex-row items-center text-xl">
          Empty <BsFileEarmarkMusicFill className="ml-2" />
        </h2>
      </div>
    );
  }

  return (
    <div
      id="library-songs-container"
      className="flex justify-center items-center flex-row flex-wrap min-h-screen mt-5 lg:ml-24 transition-all duration-300 ease-out translate-x-10 opacity-0"
    >
      {library.songs.map((song) => (
        <Song key={song._id} song={song} likeButton={true} />
      ))}
    </div>
  );
}

export default Library;
