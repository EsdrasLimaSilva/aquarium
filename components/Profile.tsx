import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../app/slices/user";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/router";
import { uploadContainerSetToVisible } from "../app/slices/upload";
import { ImSpinner9 } from "react-icons/im";

function Profile() {
  const user = useSelector(selectUser);
  const router = useRouter();
  const dispatch = useDispatch();

  const closeMenu = () => {
    dispatch(uploadContainerSetToVisible());
    document.querySelector("#side-menu")!.classList.add("-translate-x-full");
    document.querySelector("#overlay-close-side-menu")!.classList.add("hidden");
  };

  if (user.authenticating) {
    return (
      <span className="flex justify-center items-center py-8 text-2xl">
        <ImSpinner9 className="animate-spin" />
      </span>
    );
  }

  if (!user.authenticated) {
    return (
      <button
        type="button"
        className=" block text-6xl mx-auto my-4 w-fi"
        onClick={() => router.push("/login")}
      >
        <FaUserCircle />
        <p className="text-sm mt-2">Sign in</p>
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
        onClick={closeMenu}
      >
        upload song
      </button>
    </div>
  );
}

export default Profile;
