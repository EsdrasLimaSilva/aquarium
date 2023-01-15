import { Component, ReactComponentElement } from "react";

interface Props {
    title: string;
}

const Category: React.FunctionComponent<Props> = ({ title }) => {
    return <h2 className="font-bold text-white text-3xl lg:pl-28">{title}</h2>;
};

export default Category;
