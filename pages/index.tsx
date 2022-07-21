import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import client, { userQuery } from "../app/sanityClient";
import { selectUser, userAuthenticated } from "../app/slices/user";

const Home: NextPage = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(function getUserData() {
    if (typeof window !== "undefined" && !user.authenticated) {
      if (localStorage.getItem("localUserId")) {
        const userId = JSON.parse(localStorage.getItem("localUserId") || "");
        const query = userQuery(userId);

        if (userId !== "") {
          client
            .fetch(query)
            .then(
              (
                response: { username: string; image: string; _id: string }[]
              ) => {
                const { username, image, _id } = response[0];

                dispatch(
                  userAuthenticated({
                    username: username,
                    image: image,
                    id: _id,
                  })
                );
              }
            );
        }
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        <h2>Hello My Chapa</h2>
      </div>
    </>
  );
};

export default Home;
