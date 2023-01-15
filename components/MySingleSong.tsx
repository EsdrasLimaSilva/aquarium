import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { useDispatch } from "react-redux";
import client from "../app/sanityClient";
import { songDeleted } from "../app/slices/mySongs";
import Song from "./Song";
import { Song as SongType } from "../app/song";

type Props = {
    song: SongType;
};

const MySingleSong = ({ song }: Props) => {
    const [deletingSong, setDeletingSong] = useState(false);
    const dispatch = useDispatch();

    async function deleteSong(
        imageAssetId: string,
        songAssetId: string,
        songId: string
    ) {
        try {
            setDeletingSong(true);
            await client.delete(imageAssetId);
            await client.delete(songAssetId);
            await client.delete(songId);
            dispatch(songDeleted(songId));
        } catch (err) {
        } finally {
            setDeletingSong(false);
        }
    }

    return (
        <div className="flex flex-col items-center my-4 gap-2">
            <Song key={song._id} song={song} />
            <button
                type="button"
                className="bg-red-600 px-3 py-2 rounded-lg flex justify-center text-sm"
                onClick={() =>
                    deleteSong(song.coverAssetId, song.songAssetId, song._id)
                }
                disabled={deletingSong ? true : false}
            >
                {deletingSong ? (
                    <ImSpinner9 className="animate-spin" />
                ) : (
                    "Delete this song"
                )}
            </button>
        </div>
    );
};

export default MySingleSong;
