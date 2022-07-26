import Image from "next/image";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { currentSongSet, playerSetToVisible } from "../app/slices/songs";

type State = {
  songName: string;
  songUrl: string;
  coverUrl: string;
  author: string;
};

function Song({ songName, songUrl, coverUrl, author }: State) {
  const dispatch = useDispatch();

  const songNameFormated = (str: string) => {
    const songNameArr = str.split("");
    if (songNameArr.length > 20) {
      return (songNameArr.slice(0, 20).join("") + "...").toLocaleLowerCase();
    } else {
      return songNameArr.join("").toLocaleLowerCase();
    }
  };

  const changeCurrentSong = () => {
    dispatch(
      currentSongSet({
        author: author,
        songUrl: songUrl,
        cover: coverUrl,
        name: songName,
      })
    );
    dispatch(playerSetToVisible());
  };

  return (
    <div
      className="bg-blue flex flex-col justify-around w-screen xs:w-52 xs:h-56 h-72 m-4 p-4 cursor-pointer transition-all duration-100 lg:hover:-translate-y-2"
      onClick={changeCurrentSong}
    >
      <Image src={coverUrl} alt="song cover" width={240} height={180} />
      <h2 className="text-lg">{songNameFormated(songName)}</h2>
      <h3 className="text-sm opacity-80">{author.toLocaleLowerCase()}</h3>
    </div>
  );
}

export default memo(Song);
