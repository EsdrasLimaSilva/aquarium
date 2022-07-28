import Image from "next/image";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { currentSongSet, playerSetToVisible } from "../app/slices/songs";
import { Song } from "../app/song";
import { formatString } from "../helper/formatString";
import LikeButton from "./LikeButton";

type State = {
  song: Song;
  likeButton?: boolean;
};

function Song({ song, likeButton }: State) {
  const dispatch = useDispatch();

  const changeCurrentSong = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest("button")) {
      dispatch(
        currentSongSet({
          author: song.author,
          songUrl: song.songUrl,
          cover: song.cover,
          name: song.name,
        })
      );
      dispatch(playerSetToVisible());
    }
  };

  return (
    <div
      className="bg-blue flex flex-col justify-around w-64 xs:w-52 xs:h-56 h-72 m-4 p-4 cursor-pointer transition-all duration-100 lg:hover:-translate-y-2"
      onClick={(e) => changeCurrentSong(e)}
    >
      <Image src={song.cover} alt="song cover" width={240} height={180} />
      <span className="flex flex-row justify-between">
        <span className="flex flex-col">
          <h2 className="text-lg">{formatString(song.name)}</h2>
          <h3 className="text-sm opacity-80">
            {song.author.toLocaleLowerCase()}
          </h3>
        </span>
        {likeButton && <LikeButton song={song} />}
      </span>
    </div>
  );
}

export default memo(Song);
