import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectSongs } from "../app/slices/songs";
import Song from "./Song";

type Props = {
  children: React.ReactNode;
};

const SongListContainer = function ({ children }: Props) {
  return (
    <div className="flex flex-row flex-wrap justify-center lg:justify-end pr-5 items-cente">
      {children}
    </div>
  );
};

function HomeSongs() {
  const songs = useSelector(selectSongs);

  useEffect(function showSongsWhenLoad() {
    const homeSongsContainer = document.querySelector(
      "#home-songs-container"
    ) as HTMLDivElement;
    setTimeout(() => {
      homeSongsContainer.classList.remove("translate-x-6");
      homeSongsContainer.classList.remove("opacity-0");
    }, 100);
  }, []);

  return (
    <div
      id="home-songs-container"
      className="min-h-screen p-2 lg:ml-48 transition-all duration-500 ease-out translate-x-6 opacity-0"
    >
      <h2 className="border-b-2 border-white lg:ml-28 lg:mr-5 mt-24">
        Recents
      </h2>
      <SongListContainer>
        {songs.recent.map((song, i) => (
          <Song
            key={song._id}
            songName={song.name}
            coverUrl={song.cover}
            songUrl={song.songUrl}
            author={song.author}
          />
        ))}
      </SongListContainer>
      <h2 className="border-b-2 border-white mx-5 lg:ml-28 lg:mr-5 mt-24">
        Pop
      </h2>
      <SongListContainer>
        {songs.pop.map((song, i) => (
          <Song
            key={song._id}
            songName={song.name}
            coverUrl={song.cover}
            songUrl={song.songUrl}
            author={song.author}
          />
        ))}
      </SongListContainer>

      <h2 className="border-b-2 border-white mx-5 lg:ml-28 lg:mr-5 mt-24">
        Rock
      </h2>
      <SongListContainer>
        {songs.rock.map((song, i) => (
          <Song
            key={song._id}
            songName={song.name}
            coverUrl={song.cover}
            songUrl={song.songUrl}
            author={song.author}
          />
        ))}
      </SongListContainer>
    </div>
  );
}

export default HomeSongs;
