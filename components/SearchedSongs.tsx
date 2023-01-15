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
        <div className=" flex justify-center items-center pt-16  mb-56  mx-auto">
            {search.searching ? (
                <ImSpinner9 className="animate-spin text-2xl" />
            ) : search.songs.length === 0 ? (
                <h2 className="flex flex-row items-center">
                    sorry, we couldn&apos;t find any song{" "}
                    <GiMusicalNotes className="ml-2" />
                </h2>
            ) : (
                <div className="w-full flex flex-col">
                    <button
                        type="button"
                        className="flex flex-row gap-2 font-bold text-xl justify-start items-center my-5 text-white w-fit lg:ml-72"
                        onClick={() => dispatch(changedToHomeSongs())}
                    >
                        <IoIosArrowBack /> back
                    </button>
                    <div className="w-full flex flex-row flex-wrap justify-center p-2 gap-4 lg:pl-64 lg:pr-10">
                        {search.songs.map((song) => (
                            <Song
                                song={song}
                                key={song._id}
                                likeButton={true}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchedSongs;
