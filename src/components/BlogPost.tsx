import { useContext } from "react";
import { IPosts } from "../interface";
import { DataContext } from "../context/DataContext";
import { colors } from "../data/constants";

const BlogPost = ({ mainImage, title, author, createdAt, excerpt }: IPosts) => {
  const data = useContext(DataContext);
  const color = colors[Math.floor(Math.random() * colors.length)]
  console.log("Rendered");
  
  if (!data) {
    return <></>;
  }
  const { urlFor } = data;
  return (
    <article className="flex flex-col pb-8">
      <div className="w-full tracking-wider">
        <img src={urlFor(mainImage).url()} alt={title} className="h-44 w-full"/>
        <div style={{ backgroundColor: color }} className="w-full flex justify-between uppercase text-xs text-white px-2 py-2">
          <p>{createdAt}</p>
          <p>By {author}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 text-center pt-5 px-3">
        <p className="text-xl">{title}</p>
        <p className="px-2">{excerpt}</p>
      </div>
    </article>
  );
};

export default BlogPost;
