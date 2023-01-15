import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectSongs } from "../app/slices/songs";
import Category from "./Category";
import Song from "./Song";
import SongListContainer from "./SongListContainer";

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
            className="min-h-screen pt-10 px-4 lg:ml-48 transition-all duration-500 ease-out translate-x-6 opacity-0 flex flex-col gap-32"
        >
            {/* Recents songs */}
            <div>
                <Category title="Recent" />
                <SongListContainer>
                    {songs.recent.map((song, i) => (
                        <Song key={song._id} song={song} likeButton={true} />
                    ))}
                </SongListContainer>
            </div>

            {/* Pop songs */}
            <div>
                <Category title="Pop" />
                <SongListContainer>
                    {songs.pop.map((song, i) => (
                        <Song key={song._id} song={song} likeButton={true} />
                    ))}
                </SongListContainer>
            </div>

            {/* Rock songs */}
            <div>
                <Category title="Rock" />
                <SongListContainer>
                    {songs.rock.map((song, i) => (
                        <Song key={song._id} song={song} likeButton={true} />
                    ))}
                </SongListContainer>
            </div>
        </div>
    );
}

export default HomeSongs;
