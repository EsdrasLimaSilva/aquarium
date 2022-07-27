import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectUser } from "../app/slices/user";

function LikedSongs() {
  const user = useSelector(selectUser);
  const router = useRouter();

  if (!user.authenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>
          You need to{" "}
          <button
            type="button"
            className="px-2 bg-orange-500 rounded-lg"
            onClick={() => router.push("/login")}
          >
            sign in
          </button>
        </p>
      </div>
    );
  }

  return <div>LikedSongs</div>;
}

export default LikedSongs;
