const sanityClient = require("@sanity/client");

const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECTID,
  dataset: "production",
  apiVersion: "2022-07-21",
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  useCdn: true,
});

export const userQuery = (userId: string) => {
  const query = `*[ _type == "user" && _id == "${userId}"]{
    _id,
    username,
    image
  }`;
  return query;
};

export const recentSongsQuery = () => {
  const query = `*[_type == "song"][0...8]{
    author,
    authorId,
    cover,
    coverAssetId,
    genre,
    name,
    songAssetId,
    songUrl,
    tags,
    _id
  }`;
  return query;
};

export const genreSongQuery = (genre: string) => {
  const query = `*[_type == "song" && genre == "${genre}"][0...8]{
    author,
    authorId,
    cover,
    coverAssetId,
    genre,
    name,
    songAssetId,
    songUrl,
    tags,
    _id
  }`;
  return query;
};

export default client;
