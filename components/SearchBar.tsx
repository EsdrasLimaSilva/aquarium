import { FormEvent } from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch } from "react-redux";
import client, { searchQuery } from "../app/sanityClient";
import { changedToSearchedSongs } from "../app/slices/operation";
import {
  searchedSongsSet,
  searchFinished,
  searchStarted,
} from "../app/slices/search";
import { Song } from "../app/song";

function SearchBar() {
  const dispatch = useDispatch();

  const handleSearch = (e: FormEvent) => {
    const formInputs = e.target as HTMLFormElement;
    e.preventDefault();
    dispatch(changedToSearchedSongs());
    dispatch(searchStarted());

    const query = searchQuery((formInputs[0] as HTMLInputElement).value.trim());
    client
      .fetch(query)
      .then((res: Song[]) => {
        dispatch(searchedSongsSet(res));
      })
      .finally(() => dispatch(searchFinished()));
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
