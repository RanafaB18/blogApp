import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../client";
import { IPosts } from "../interface";
import { PortableText } from "@portabletext/react";
import { urlFor } from "../data/util";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const SinglePost = () => {
  const { slug } = useParams();
  const [content, setContent] = useState<IPosts>();

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post" && slug.current == "${slug}"][0]{
        title,
        "author": author->name,
        mainImage,
        "id": _id,
        "createdAt": _updatedAt,
        body
      }`
      )
      .then((result: IPosts) => {
        setContent(result);
      });
  }, [slug]);
  if (!content || !content.body) {
    return <></>;
  }
  const { mainImage, title, author, createdAt, body } = content;
  const date = new Date(createdAt);

  const formattedDate = date.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const components = {
    types: {
        image: ({value} : { value: SanityImageSource}) => <img src={urlFor(value).url()} />,
    }
  }
  return (
    <>
      <div className="w-full flex justify-between uppercase text-xs px-4 py-2">
        <p>{formattedDate}</p>
        <p>By <span className="text-[#f28f81]">{author}</span></p>
      </div>
      <div className="flex flex-col p-8">
        <h2 className="text-xl text-center font-semibold mb-8">{title}</h2>
        <img src={urlFor(mainImage).url()} alt="" />
        <hr className="my-8"/>
        <PortableText value={body} components={components}/>
      </div>
    </>
  );
};

export default SinglePost;
