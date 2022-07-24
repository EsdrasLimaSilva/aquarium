import { useSelector } from "react-redux";
import { selectOperation } from "../app/slices/operation";
import HomeSongs from "./HomeSongs";
import LikedSongs from "./LikedSongs";
import MySongs from "./MySongs";
import SearchedSongs from "./SearchedSongs";

function Container() {
  const operation = useSelector(selectOperation);

  switch (operation) {
    case "homeSongs":
      return <HomeSongs />;
    case "mySongs":
      return <MySongs />;
    case "likedSongs":
      return <LikedSongs />;
    case "searchedSongs":
      return <SearchedSongs />;
    default:
      return <HomeSongs />;
  }
}

export default Container;
