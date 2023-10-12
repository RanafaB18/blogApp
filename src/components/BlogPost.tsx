import { useContext } from "react";
import { IPosts } from "../interface";
import { DataContext } from "../context/DataContext";
import { colors } from "../data/constants";
import { Link } from "react-router-dom";
import { urlFor } from "../data/util";

const BlogPost = ({
  mainImage,
  title,
  author,
  createdAt,
  excerpt,
  slug,
}: IPosts) => {
  const data = useContext(DataContext);

  if (!data) {
    return <></>;
  }
  const color = colors[Math.floor(Math.random() * colors.length)];

  const date = new Date(createdAt);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formattedDate = date.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <Link
      to={`/${year}/${month}/${day}/${slug}`}
      className="flex flex-col pb-8"
    >
      <div className="w-full tracking-wider">
        <img
          src={urlFor(mainImage).width(348).height(176).url()}
          alt={title}
          className="h-44 w-full"
        />
        <div
          style={{ backgroundColor: color }}
          className="w-full flex justify-between uppercase text-xs text-white px-2 py-2"
        >
          <p>{formattedDate}</p>
          <p>By {author}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 text-center pt-5 px-3">
        <p className="text-xl">{title}</p>
        <p className="px-2">{excerpt}</p>
      </div>
    </Link>
  );
};

export default BlogPost;
