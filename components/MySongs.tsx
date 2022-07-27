import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import client, { mySongsQuery } from "../app/sanityClient";
import {
  fetchingMySongsFinished,
  fetchingMySongsStarted,
  mySongsSet,
  selectMySongs,
  songDeleted,
} from "../app/slices/mySongs";
import { selectUser } from "../app/slices/user";
import { Song as SongType } from "../app/song";
import Song from "./Song";

type Props = {
  song: SongType;
};

const MySingleSong = ({ song }: Props) => {
  const [deletingSong, setDeletingSong] = useState(false);
  const dispatch = useDispatch();

  async function deleteSong(
    imageAssetId: string,
    songAssetId: string,
    songId: string
  ) {
    try {
      setDeletingSong(true);
      await client.delete(imageAssetId);
      await client.delete(songAssetId);
      await client.delete(songId);
      dispatch(songDeleted(songId));
    } catch (err) {
    } finally {
      setDeletingSong(false);
    }
  }

  return (
    <div className="flex flex-col items-center my-4">
      <Song
        key={song._id}
        songName={song.name}
        author={song.author}
        coverUrl={song.cover}
        songUrl={song.songUrl}
      />
      <button
        type="button"
        className="bg-red-600 px-3 py-2 rounded-lg w-44 flex justify-center"
        onClick={() =>
          deleteSong(song.coverAssetId, song.songAssetId, song._id)
        }
        disabled={deletingSong ? true : false}
      >
        {deletingSong ? (
          <ImSpinner9 className="animate-spin" />
        ) : (
          "Delete this song"
        )}
      </button>
    </div>
  );
};

function MySongs() {
  const user = useSelector(selectUser);
  const mySongs = useSelector(selectMySongs);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(function getMySongs() {
    if (mySongs.songs.length === 0 && user.authenticated) {
      dispatch(fetchingMySongsStarted());
      const query = mySongsQuery(user.data.id);

      client
        .fetch(query)
        .then((res: SongType[]) => {
          dispatch(mySongsSet(res));
        })
        .finally(() => dispatch(fetchingMySongsFinished()));
    }
  }, []);

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
      className="flex flex-row flex-wrap justify-center lg:justify-end lg:pl-40 lg:pr-10 transition-all duration-300 ease-out"
    >
      {mySongs.songs.map((song) => (
        <MySingleSong song={song} />
      ))}
    </div>
  );
}

export default MySongs;
