import { useSelector } from "react-redux";
import { selectOperation } from "../app/slices/operation";
import HomeSongs from "./HomeSongs";
import Library from "./Library";
import MySongs from "./MySongs";
import SearchedSongs from "./SearchedSongs";
import Support from "./Support";

function Container() {
  const operation = useSelector(selectOperation);

  switch (operation) {
    case "homeSongs":
      return <HomeSongs />;
    case "mySongs":
      return <MySongs />;
    case "library":
      return <Library />;
    case "searchedSongs":
      return <SearchedSongs />;
    case "support":
      return <Support />;
    default:
      return <HomeSongs />;
  }
}

export default Container;
