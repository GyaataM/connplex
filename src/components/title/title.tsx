import React from "react";
import styles from "./title.module.css";

interface TitleProps {
  title: string;
  desc?: string;
  headingVariant?: string;
  varient?: "white" | "blue";
  descClass?: string;
  titleClass?: string;
}

const Title: React.FC<TitleProps> = ({
  title,
  desc,
  varient = "blue",
  descClass,
  headingVariant,
  titleClass,
}) => {
  return (
    <>
      {headingVariant === "h2" ? (
        <h2
          className={`font-bold ${styles.title} ${titleClass && titleClass} ${
            varient === "white" ? "!text-white" : ""
          }`}
        >
          {title}
        </h2>
      ) : (
        <h3
          className={`!text-[30px] !text-[#D3B15F] font-bold ${styles.title} ${titleClass && titleClass} ${
            varient === "white" ? "!text-white" : ""
          }`}
        >
          {title}
        </h3>
      )}
      {desc && (
        <p className={`px-0 md:px-5 ${styles.description} ${descClass}`}>
          {desc}
        </p>
      )}
    </>
  );
};

export default Title;
