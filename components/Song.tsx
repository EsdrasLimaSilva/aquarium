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
            className="bg-blue flex flex-row min-w-[300px] max-w-[450px] h-[90px] w-full gap-2 items-center transition-all select-none hover:bg-hoverBlue md:max-w-[300px] lg:max-w-[450px]"
            onClick={(e) => changeCurrentSong(e)}
        >
            <picture className="min-w-[140px] w-[140px] h-[90px] overflow-hidden">
                <img
                    src={song.cover}
                    alt="song cover"
                    className="w-full h-full"
                />
            </picture>
            <span className="flex flex-row justify-between w-[60%]">
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
