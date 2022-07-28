import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../app/slices/user";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import {
  selectLibrary,
  songAddedToLibrary,
  songRemovedFromLibrary,
} from "../app/slices/library";
import { Song } from "../app/song";
import client from "../app/sanityClient";

type Props = {
  song: Song;
};

function LikeButton({ song }: Props) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const library = useSelector(selectLibrary);
  const songFound = library.songs.find((sng) => sng._id === song._id);

  const addSong = () => {
    dispatch(songAddedToLibrary(song));

    client
      .patch(user.data.libraryId)
      .setIfMissing({ songs: [] })
      .insert("after", "songs[-1]", [{ _type: "song", _ref: song._id }])
      .commit({
        autoGenerateArrayKeys: true,
      })
      .then((res: Song[]) => console.log(res));
  };

  const removeSong = () => {
    dispatch(songRemovedFromLibrary(song._id));

    const songToBeRemoved = [`songs[_ref =="${song._id}"]`];

    client.patch(user.data.libraryId).unset(songToBeRemoved).commit();
  };

  if (!user.authenticated) {
    return null;
  }

  if (songFound) {
    return (
      <button
        type="button"
        className="like-button text-2xl text-red-600"
        onClick={removeSong}
      >
        <AiFillHeart />
      </button>
    );
  }

  return (
    <button
      type="button"
      className="like-button text-2xl text-red-600"
      onClick={addSong}
    >
      <AiOutlineHeart />
    </button>
  );
}

export default LikeButton;
