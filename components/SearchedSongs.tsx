import { GiMusicalNotes } from "react-icons/gi";
import { ImSpinner9 } from "react-icons/im";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { changedToHomeSongs } from "../app/slices/operation";
import { selectSearch } from "../app/slices/search";
import { uploadContainerSetToHidden } from "../app/slices/upload";
import Song from "./Song";

function SearchedSongs() {
  const search = useSelector(selectSearch);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen flex justify-center items-center pt-16  mb-56  mx-auto">
      {search.searching ? (
        <ImSpinner9 className="animate-spin text-2xl" />
      ) : search.songs.length === 0 ? (
        <h2 className="flex flex-row items-center">
          sorry, we couldn't find any song <GiMusicalNotes className="ml-2" />
        </h2>
      ) : (
        <div className="w-full flex flex-col">
          <button
            type="button"
            className="flex flex-row justify-center items-center my-5 bg-white text-blue w-fit px-3 rounded-lg ml-72"
            onClick={() => dispatch(changedToHomeSongs())}
          >
            <IoIosArrowBack /> back
          </button>
          <div className="w-full flex flex-row flex-wrap justify-end pl-52 pr-10">
            {search.songs.map((song) => (
              <Song
                author={song.author}
                coverUrl={song.cover}
                songName={song.name}
                songUrl={song.songUrl}
                key={song._id}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchedSongs;
