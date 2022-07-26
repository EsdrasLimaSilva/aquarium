export const formatString = (str: string) => {
  const stringArr = str.split("");
  if (stringArr.length > 20) {
    return (stringArr.slice(0, 20).join("") + "...").toLocaleLowerCase();
  } else {
    return stringArr.join("").toLocaleLowerCase();
  }
};
