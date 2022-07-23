import { BiSearch } from "react-icons/bi";

function SearchBar() {
  return (
    <form className="flex flex-row items-center bg-white text-darkBlue px-2 mt-2 rounded-full">
      <input
        type="search"
        name="song-search-input"
        id="song-search-input"
        className="bg-transparent placeholder:text-xs text-sm p-1 outline-none"
        placeholder="search for a song, artist or gender"
        required
      />
      <button type="submit">
        <BiSearch />
      </button>
    </form>
  );
}

export default SearchBar;
