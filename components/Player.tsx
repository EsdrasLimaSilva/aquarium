import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  BsFillPauseFill,
  BsFillPlayFill,
  BsVolumeOffFill,
  BsVolumeUpFill,
} from "react-icons/bs";
import { ImSpinner9 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import {
  currentSongStartedToPlay,
  currentSongWasPaused,
  playerSetToHidden,
  selectSongs,
} from "../app/slices/songs";

function Player() {
  const { currentSong } = useSelector(selectSongs);
  const [loading, setLoading] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentMin, setCurrentMin] = useState(0);
  const [currentSec, setCurrentSec] = useState(59);
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentSec(59);
  }, [duration]);

  const handlePlay = (e: React.SyntheticEvent) => {
    const audio = e.target as HTMLAudioElement;
    const audioDuration = Math.ceil(audio.duration);

    if (duration === 0 || duration !== audioDuration) {
      setDuration(audioDuration);
    }
    setLoading(false);
    dispatch(currentSongStartedToPlay());
  };

  const handleAudioProgress = (e: React.SyntheticEvent) => {
    const audio = e.target as HTMLAudioElement;

    setCurrentTime(audio.currentTime);
    setCurrentMin(Math.floor((audio.duration - audio.currentTime) / 60));
    setCurrentSec(Math.floor((audio.duration - audio.currentTime) % 60));
  };

  const toggleSong = () => {
    const audio = document.querySelector("#song-on-player") as HTMLAudioElement;

    if (currentSong.playing) {
      audio.pause();
      dispatch(currentSongWasPaused());
    } else {
      audio.play();
      dispatch(currentSongStartedToPlay());
    }
  };

  const handleInputChange = (e: React.ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    const audio = document.getElementById("song-on-player") as HTMLAudioElement;

    setCurrentTime(Number(input.value));
    audio.currentTime = Number(input.value);
  };

  const controlVolume = (e: React.ChangeEvent) => {
    const audio = document.querySelector("#song-on-player") as HTMLAudioElement;

    audio.volume = Number(+(e.target as HTMLInputElement).value / 100);
  };

  return (
    <div
      className={`fixed bottom-0 right-0 h-44 w-screen sm:max-w-xs rounded-lg bg-translucens backdrop-blur-xl text-white p-3 transition-all duration-500 ease-in ${
        currentSong.visible ? "" : "translate-y-full"
      }`}
    >
      <audio
        src={currentSong.songUrl}
        id="song-on-player"
        preload="metadata"
        autoPlay
        onCanPlay={(e) => handlePlay(e)}
        onWaiting={() => setLoading(true)}
        onEnded={() => toggleSong()}
        onTimeUpdate={(e) => handleAudioProgress(e)}
      ></audio>

      <button
        type="button"
        className="absolute top-0 right-2 text-2xl z-10"
        onClick={() => {
          if (currentSong.playing) toggleSong();
          dispatch(playerSetToHidden());
        }}
      >
        X
      </button>

      <div>
        <div className="flex flex-row justify-center items-start">
          <span className="mr-5">
            <h2 className="text-xl">{currentSong.name}</h2>
            <h3 className="opacity-70">{currentSong.author}</h3>
            {currentTime ? (
              <h4>
                {currentMin > 9 ? currentMin : `0${currentMin}`} :
                {currentSec > 9 ? currentSec : `0${currentSec}`}
              </h4>
            ) : (
              "00:00"
            )}
          </span>
          {currentSong.visible && (
            <span className="mr-2">
              <Image
                src={currentSong.cover}
                alt="song cover"
                width={100}
                height={70}
                className="rounded-lg"
              />
            </span>
          )}
        </div>

        <div className="flex flex-col justify-start items-center">
          <div className="w-full flex flex-row items-center">
            {loading ? (
              <ImSpinner9 className="text-3xl animate-spin mr-2" />
            ) : (
              <button type="button" className="text-3xl" onClick={toggleSong}>
                {currentSong.playing ? <BsFillPauseFill /> : <BsFillPlayFill />}
              </button>
            )}
            <input
              type="range"
              className="w-full"
              max={duration}
              value={currentTime}
              onChange={(e) => handleInputChange(e)}
            />
          </div>

          <div className="flex flex-row w-64 items-center">
            <BsVolumeOffFill className="text-4xl" />
            <input
              type="range"
              min={0}
              max={100}
              className="w-full"
              defaultValue={100}
              onChange={(e) => controlVolume(e)}
            />
            <BsVolumeUpFill className="text-4xl ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player;
