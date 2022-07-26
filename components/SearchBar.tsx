import { FormEvent } from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { changedToSearchedSongs } from "../app/slices/operation";

function SearchBar() {
  const dispatch = useDispatch();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    dispatch(changedToSearchedSongs());
    console.log(e.target[0]);
  };

  return (
    <form
      className="flex flex-row items-center bg-white text-darkBlue px-2 mt-2 rounded-full mx-auto w-64"
      onSubmit={(e) => handleSearch(e)}
    >
      <input
        type="search"
        name="song-search-input"
        id="song-search-input"
        className="bg-transparent placeholder:text-xs text-sm p-1 outline-none"
        placeholder="search for a song, artist or genre"
        required
      />
      <button type="submit">
        <BiSearch />
      </button>
    </form>
  );
}

export default SearchBar;
