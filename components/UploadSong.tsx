import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { BsFillCloudArrowUpFill, BsTrash2Fill } from "react-icons/bs";
import { ImSpinner9 } from "react-icons/im";
import { MdMotionPhotosOn } from "react-icons/md";
import { RiFolderUploadFill } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import client from "../app/sanityClient";
import { selectUser } from "../app/slices/user";
import {
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
  songWasNotUploaded,
  songWasProcessed,
  uploadContainerSetToHidden,
} from "../app/slices/upload";

function UploadSong() {
  const {
    processingImage,
    imageProcessed,
    imageAsset,
    processingSong,
    songProcessed,
    songAsset,
    uploadingSong,
    songWasUploaded,
  } = useSelector(selectUpload);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      songProcessed &&
      imageProcessed &&
      !processingSong &&
      !processingImage
    ) {
      dispatch(songUploadStarted());
      const inputs = e.target as HTMLFormElement;
      const nameInput = inputs[3] as HTMLInputElement;
      const genreInput = inputs[4] as HTMLInputElement;
      const tagsInput = inputs[5] as HTMLInputElement;

      const songDoc = {
        _id: uuidv4(),
        _type: "song",
        cover: imageAsset!.url,
        coverAssetId: imageAsset!.id,
        name: nameInput.value,
        genre: genreInput.value,
        songUrl: songAsset!.url,
        songAssetId: songAsset!.id,
        tags: tagsInput.value.split(","),
        author: user.data.username,
        authorId: user.data.id,
      };

      client
        .createIfNotExists(songDoc)
        .then((response: any) => {
          console.log(response);
          nameInput.value = "";
          genreInput.value = "";
          tagsInput.value = "";
          (inputs[0] as HTMLInputElement).value = "";
          console.log(inputs[2]);
        })
        .finally(() => dispatch(songUploadFinished()));
    }
  };

  const processSong = function (e: React.ChangeEvent<HTMLInputElement>) {
    const { type, name } = e.target.files![0];

    if ((type && type === "audio/mp3") || type === "audio/mpeg") {
      dispatch(processingSongStarted());
      client.assets
        .upload("file", e.target.files![0])
        .then((doc: any) => {
          dispatch(songAssetSet({ url: doc.url, id: doc._id, name: name }));
          dispatch(songWasProcessed());
          e.target.files = null;
        })
        .finally(() => {
          dispatch(processingSongFinished());
        });
    }
  };

  const removeSongAsset = function () {
    dispatch(processingSongStarted());
    client
      .delete(songAsset!.id)
      .then(() => dispatch(songWasNotProcessed()))
      .finally(() => dispatch(processingSongFinished()));
  };

  const uploadImage = function (e: React.ChangeEvent<HTMLInputElement>) {
    const { type } = e.target.files![0];

    if (
      (type && type === "image/png") ||
      type === "image/jpg" ||
      type == "image/jpeg"
    ) {
      dispatch(processingImageStarted());

      client.assets
        .upload("image", e.target.files![0], { contentType: type })
        .then((doc: { url: string; _id: string }) => {
          dispatch(imageWasProcessed());
          dispatch(imageAssetSet({ url: doc.url, id: doc._id }));
        })
        .finally(() => dispatch(processingImageFinished()));
    }
  };

  const removeImageAsset = () => {
    dispatch(processingImageStarted());
    client
      .delete(imageAsset!.id)
      .then(() => {
        dispatch(imageWasNotProcessed());
      })
      .finally(() => dispatch(processingImageFinished()));
  };

  return (
    <div className="w-fit mx-auto mt-10">
      <button
        type="button"
        className="flex flex-row justify-center items-center my-5 bg-white text-blue w-fit px-3 rounded-lg"
        onClick={() => dispatch(uploadContainerSetToHidden())}
      >
        <IoIosArrowBack /> back
      </button>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label className="w-60 h-44 flex justify-center items-center mx-auto bg-white text-darkBlue rounded-md mb-5">
          {imageProcessed ? (
            <Image
              src={imageAsset!.url}
              alt="pamonha"
              width={240}
              height={176}
              className="rounded-md"
            />
          ) : processingImage ? (
            <MdMotionPhotosOn className="text-2xl animate-spin" />
          ) : (
            <BsFillCloudArrowUpFill />
          )}
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            className="hidden"
            onChange={(e) => uploadImage(e)}
          />
        </label>

        {imageProcessed &&
          (processingImage ? (
            <MdMotionPhotosOn className="text-2xl animate-spin mx-auto" />
          ) : (
            <button
              type="button"
              onClick={removeImageAsset}
              className="mx-auto flex flex-row items-center mb-2"
            >
              remove cover
              <BsTrash2Fill className="ml-2" />
            </button>
          ))}

        {processingSong ? (
          <ImSpinner9 className="text-xl mx-auto animate-spin my-2" />
        ) : songProcessed ? (
          <span className="flex flex-row justify-center items-center w-fite bg-orange-500 text-white rounded-lg p-2 my-2">
            {songAsset?.name}{" "}
            <button
              type="button"
              className="text-xl ml-2"
              onClick={removeSongAsset}
            >
              <BsTrash2Fill />
            </button>
          </span>
        ) : (
          <label className="flex flex-row justify-center items-center w-36 bg-orange-500 text-white rounded-lg">
            song <RiFolderUploadFill className="ml-2" />
            <input
              type="file"
              required
              accept="audio/mp3, audio/mpeg"
              className="hidden"
              onChange={processSong}
            />
          </label>
        )}

        <label>
          song name:
          <input
            type="text"
            required
            className="outline-none text-darkBlue"
            placeholder="E.g. Ride"
          />
        </label>

        <label>
          genre:
          <input
            type="text"
            required
            className="outline-none text-darkBlue"
            placeholder="E.g. pop"
          />
        </label>

        <label className="mt-5">
          Tags(separeted with commas)
          <textarea
            name="tags-input"
            cols={30}
            rows={5}
            required
            className="outline-none text-darkBlue p-2 rounded-md"
            placeholder="E.g. pop, rock, reaggae fusion, indie"
          ></textarea>
        </label>

        {uploadingSong ? (
          <span className="bg-white text-darkBlue w-fit px-2 mx-auto mt-10 rounded-lg flex flex-row items-center opacity-80">
            uploading song <ImSpinner9 className="animate-spin ml-2" />
          </span>
        ) : (
          <button
            type="submit"
            className="bg-white text-darkBlue w-32 mx-auto mt-10 rounded-lg"
          >
            upload
          </button>
        )}
      </form>
    </div>
  );
}

export default UploadSong;
