import { signInWithPopup } from "firebase/auth";
import { NextPage } from "next";
import { v4 as uuidv4 } from "uuid";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { ImSpinner9 } from "react-icons/im";
import { auth, provider } from "../app/firebase";
import client from "../app/sanityClient";

const Login: NextPage = () => {
  const [authenticating, setAuthenticating] = useState<boolean>(false);
  const [loginError, setLoginError] = useState(false);
  const router = useRouter();

  const signIn = async function () {
    try {
      setAuthenticating(true);
      const googleResponse = await signInWithPopup(auth, provider);
      const { uid, displayName, photoURL } = googleResponse.user;

      const doc = {
        _type: "user",
        _id: uid,
        username: displayName,
        image: photoURL,
        libraryId: uuidv4(),
      };

      localStorage.setItem("localUserId", JSON.stringify(uid));
      const sanityResponse = await client.createIfNotExists(doc);
      router.push("/");
    } catch (err) {
      setLoginError(true);
    } finally {
      setAuthenticating(false);
      setTimeout(() => setLoginError(false), 3000);
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="min-h-screen flex flex-col justify-center items-center bg-blue font-bold">
        {authenticating ? (
          <ImSpinner9 className="text-white text-2xl animate-spin" />
        ) : (
          <button
            type="button"
            className="bg-white text-darkBlue flex flex-row items-center px-5 rounded-full"
            onClick={signIn}
          >
            <FcGoogle className="mr-2" />
            Sing in with google
          </button>
        )}
        {loginError && (
          <p className="text-red-300 mt-5">
            something went wrong. Please try again.
          </p>
        )}
        <span className="absolute bottom-2 right-4">
          <Image src="/brand.png" alt="brand logo" width={126} height={57} />
        </span>
      </div>
    </>
  );
};

export default Login;
