import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../app/slices/user";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/router";
import { uploadContainerSetToVisible } from "../app/slices/upload";

function Profile() {
  const user = useSelector(selectUser);
  const router = useRouter();
  const dispatch = useDispatch();

  if (!user.authenticated) {
    return (
      <button
        type="button"
        className=" block text-6xl mx-auto my-4 w-fi"
        onClick={() => router.push("/login")}
      >
        <FaUserCircle />
      </button>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center py-4 border-b-2 border-b-white">
      <span className="w-fit">
        <Image
          src={user.data.image}
          alt="your photo"
          width={60}
          height={60}
          className="rounded-full"
        />
      </span>
      <h2>{user.data.username}</h2>
      <button
        type="button"
        className="bg-white text-darkBlue px-4 rounded-full"
        onClick={() => dispatch(uploadContainerSetToVisible())}
      >
        upload song
      </button>
    </div>
  );
}

export default Profile;
