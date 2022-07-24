import { useSelector } from "react-redux";
import { selectSongs } from "../app/slices/songs";
import Song from "./Song";

function HomeSongs() {
  const songs = useSelector(selectSongs);

  return (
    <div className="min-h-screen p-2">
      <h2>Recents</h2>
      <div className="flex flex-row flex-wrap justify-center items-center ">
        {songs.recent.map((song) => (
          <Song
            key={song._id}
            songName={song.name}
            coverUrl={song.cover}
            songUrl={song.songUrl}
            author={song.author}
          />
        ))}
      </div>
    </div>
  );
}

export default HomeSongs;
