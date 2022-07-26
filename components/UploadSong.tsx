import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { BsFillCloudArrowUpFill, BsTrash2Fill } from "react-icons/bs";
import { ImSpinner9 } from "react-icons/im";
import { MdDone, MdMotionPhotosOn } from "react-icons/md";
import { RiFolderUploadFill } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import client from "../app/sanityClient";
import { selectUser } from "../app/slices/user";

import React, { useEffect, useState } from "react";
import Router from "next/router";
import {
  imageAssetRemoved,
  imageAssetSet,
  imageWasNotProcessed,
  imageWasProcessed,
  processingImageFinished,
  processingImageStarted,
  processingSongFinished,
  processingSongStarted,
  selectUpload,
  songAssetSet,
  songUploadFinished,
  songUploadStarted,
  songWasNotProcessed,
  songWasProcessed,
  uploadContainerSetToHidden,
} from "../app/slices/upload";

function UploadSong() {
  const {
    imageProcessed,
    imageAsset,
    processingImage,
    processingSong,
    songProcessed,
    songAsset,
    uploadingSong,
  } = useSelector(selectUpload);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      document
        .querySelector("#upload-song-container")!
        .classList.remove("translate-x-12");
      document
        .querySelector("#upload-song-container")!
        .classList.remove("opacity-0");
    }, 100);
  }, []);

  function uploadSong(e: React.FormEvent) {
    e.preventDefault();
    if (
      user.authenticated &&
      imageAsset.url &&
      songAsset.url &&
      !processingImage &&
      !processingSong
    ) {
      dispatch(songUploadStarted());
      const inputs = e.target as HTMLFormElement;
      const songNameInput = inputs[2] as HTMLInputElement;
      const genreInput = inputs[3] as HTMLInputElement;
      const tagsInput = inputs[4] as HTMLInputElement;

      const doc = {
        _type: "song",
        _id: uuidv4(),
        name: songNameInput.value,
        cover: imageAsset.url,
        coverAssetId: imageAsset.id,
        author: user.data.username,
        authorId: user.data.id,
        genre: genreInput.value,
        songUrl: songAsset.url,
        songAssetId: songAsset.id,
        tags: tagsInput.value.split(","),
      };

      client
        .createIfNotExists(doc)
        .then(() => {
          (songNameInput.value = ""),
            (genreInput.value = ""),
            (tagsInput.value = ""),
            dispatch(songWasNotProcessed());
          dispatch(imageWasNotProcessed());
          setSuccess(true);
          setTimeout(() => setSuccess(false), 2000);
        })
        .finally(() => dispatch(songUploadFinished()));
    }
  }

  function setCover(e: React.ChangeEvent<HTMLInputElement>) {
    const { type } = e.target.files![0];
    const file = e.target.files![0];

    if (
      (file && type == "image/png") ||
      type === "image/jpg" ||
      type === "image/jpeg"
    ) {
      dispatch(processingImageStarted());
      client.assets
        .upload("image", file, { contentType: type })
        .then((res: { url: string; _id: string }) => {
          dispatch(imageAssetSet({ id: res._id, url: res.url }));
        })
        .finally(() => {
          dispatch(processingImageFinished());
        });
    }
  }

  function removeCover() {
    dispatch(processingImageStarted());
    client
      .delete(imageAsset.id)
      .then(() => dispatch(imageAssetRemoved()))
      .finally(() => {
        dispatch(processingImageFinished());
        dispatch(imageWasNotProcessed());
      });
  }

  function setSong(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files![0];
    const { type, name } = e.target.files![0];

    if ((file && type === "audio/mpeg") || type === "audio/mp3") {
      dispatch(processingSongStarted());
      client.assets
        .upload("file", file, { contentType: type })
        .then((res: { url: string; _id: string }) => {
          dispatch(songAssetSet({ url: res.url, id: res._id, name: name }));
        })
        .finally(() => dispatch(processingSongFinished()));
    }
  }

  function removeSong() {
    dispatch(processingSongStarted());
    client
      .delete(songAsset.id)
      .then(() => dispatch(songWasNotProcessed()))
      .finally(() => dispatch(processingSongFinished()));
  }

  return (
    <div
      id="upload-song-container"
      className="w-fit mx-auto mt-10 translate-x-12 opacity-0 transition-all duration-300"
    >
      <div
        id="success-upload-message"
        className={`fixed top-2 right-0 transition-all duration-300 bg-green-500 w-fit rounded-l-xl opacity-0 ease-out ${
          success ? "translate-x-0 opacity-100" : "translate-x-full"
        }`}
      >
        <p className="text-white text-sm flex flex-row items-center p-3 border-2 border-green-500 rounded-l-xl">
          <MdDone className="mr-2 text-xl" />
          Song Uploaded
        </p>
      </div>

      <button
        type="button"
        className="flex flex-row justify-center items-center my-5 bg-white text-blue w-fit px-3 rounded-lg"
        onClick={() => dispatch(uploadContainerSetToHidden())}
      >
        <IoIosArrowBack /> back
      </button>

      <form className="flex flex-col items-center w-80" onSubmit={uploadSong}>
        {processingImage ? (
          <div className="w-60 h-44 bg-blue rounded-lg flex flex-col justify-center items-center">
            <ImSpinner9 className="text-xl animate-spin" />
          </div>
        ) : imageProcessed ? (
          <div className="relative bg-blue rounded-lg flex flex-col justify-center items-center ">
            <Image
              src={imageAsset.url}
              alt="song cover"
              width={240}
              height={180}
              className=" rounded-lg"
            />
            <button
              type="button"
              className="absolute bottom-0 right-0 text-3xl text-red-800 bg-white rounded-lg"
              onClick={removeCover}
            >
              <BsTrash2Fill />
            </button>
          </div>
        ) : (
          <label className="w-60 h-44 bg-blue rounded-lg flex flex-col justify-center items-center cursor-pointer">
            <p className="text-xs">chosse a image less than 20mb</p>
            <BsFillCloudArrowUpFill className="text-3xl mt-2" />
            <input
              type="file"
              onChange={(e) => setCover(e)}
              accept="image/jpeg, image/png, image/jpg"
              required
              className="hidden"
            />
          </label>
        )}

        {processingSong ? (
          <div className="w-60 bg-orange-600 text-white p-2 rounded-lg my-5 flex justify-center items-center">
            <ImSpinner9 className="animate-spin" />
          </div>
        ) : songProcessed ? (
          <div className="w-60 bg-orange-600 text-white p-2  rounded-lg my-5">
            <p className="flex flex-row items-center justify-center">
              {songAsset.name}
              <button type="button" onClick={removeSong}>
                <BsTrash2Fill className="ml-2" />
              </button>
            </p>
          </div>
        ) : (
          <label className="w-60 bg-orange-600 text-white px-2 rounded-lg my-5 cursor-pointer">
            <p className="flex flex-row items-center justify-center py-2">
              choose a song <RiFolderUploadFill className="ml-2" />
            </p>
            <input
              type="file"
              accept="audio/mpeg, audio/mp3"
              required
              className="hidden"
              onChange={setSong}
            />
          </label>
        )}

        <label className="my-3 w-full">
          Song name
          <input type="text" required className="outline-none text-darkBlue " />
        </label>

        <label className="my-3 w-full">
          Genre
          <input type="text" className="outline-none text-darkBlue " />
        </label>

        <label className="my-3 w-full">
          Tags (Separated with commas)
          <textarea
            cols={30}
            rows={5}
            className="outline-none text-darkBlue w-full p-2 rounded-lg"
          ></textarea>
        </label>

        {uploadingSong ? (
          <button
            type="submit"
            className="my-16 bg-white w-fit px-3 py-1 rounded-lg text-darkBlue opacity-60 flex flex-row items-center justify-center"
            disabled
          >
            uploading <ImSpinner9 className="ml-2 animate-spin" />
          </button>
        ) : (
          <button
            type="submit"
            className="my-16 bg-white w-fit px-3 py-1 rounded-lg text-darkBlue"
          >
            upload song
          </button>
        )}
      </form>
    </div>
  );
}

export default UploadSong;
