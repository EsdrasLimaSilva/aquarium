import Image from "next/image";
import { memo } from "react";

type State = {
  songName: string;
  songUrl: string;
  coverUrl: string;
  author: string;
};

function Song({ songName, songUrl, coverUrl, author }: State) {
  const songNameFormated = (str: string) => {
    const songNameArr = str.split("");
    if (songNameArr.length > 20) {
      return (songNameArr.slice(0, 20).join("") + "...").toLocaleLowerCase();
    } else {
      return songNameArr.join("").toLocaleLowerCase();
    }
  };

  return (
    <div className="bg-blue w-64 h-72 m-4 p-4 cursor-pointer">
      <Image src={coverUrl} alt="song cover" width={240} height={180} />
      <h2 className="text-lg">{songNameFormated(songName)}</h2>
      <h3 className="text-sm opacity-80">{author.toLocaleLowerCase()}</h3>
    </div>
  );
}

export default memo(Song);
