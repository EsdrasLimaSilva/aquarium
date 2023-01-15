import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { ImSpinner9 } from "react-icons/im";
import { useSelector } from "react-redux";
import { selectMySongs } from "../app/slices/mySongs";
import { selectUser } from "../app/slices/user";
import MySingleSong from "./MySingleSong";

function MySongs() {
    const user = useSelector(selectUser);
    const mySongs = useSelector(selectMySongs);
    const router = useRouter();

    useEffect(
        function showMySongs() {
            setTimeout(() => {
                document
                    .querySelector("#my-songs-container")
                    ?.classList.remove("translate-x-10");
                document
                    .querySelector("#my-songs-container")
                    ?.classList.remove("opacity-0");
            }, 100);
        },
        [mySongs.fetching]
    );

    if (mySongs.fetching) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <ImSpinner9 className="text-2xl animate-spin" />
            </div>
        );
    }

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

    return (
        <div
            id="my-songs-container"
            className="flex flex-row flex-wrap justify-center gap-4 lg:pl-40 lg:pr-10 transition-all duration-300 ease-out translate-x-10 opacity-0 pt-24"
        >
            {mySongs.songs.map((song) => (
                <MySingleSong key={song._id} song={song} />
            ))}
        </div>
    );
}

export default MySongs;
