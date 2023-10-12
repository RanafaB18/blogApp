import { ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../client";
import { IPosts } from "../interface";
import { PortableText } from "@portabletext/react";
import { urlFor } from "../data/util";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Lottie from "lottie-react";
import loadingAnimation from "../../src/assets/loading.json"
import { motion } from "framer-motion";
const SinglePost = () => {
  const { slug } = useParams();
  const [content, setContent] = useState<IPosts>();
  const [isLoading, setIsLoading] = useState(true)

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
        setTimeout(() => {
          setIsLoading(false)
        }, 1200);
      });
  }, [slug]);
  if (!content || !content.body || isLoading) {
    return <Lottie animationData={loadingAnimation} className="absolute top-0 bottom-0"/>;
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
      image: ({ value }: { value: SanityImageSource }) => {
        return <>
        <img src={urlFor(value).url()} className="my-2" />
        </>;
      },
    },
    block: {
      p: ({ children }: { children: ReactNode}) => {
        console.log("Children", children);
        return <p className="text-red-600">{ children }</p>
      },
      h1: ({ children }: { children: ReactNode}) => <h1 className="text-2xl">{children}</h1>,
      h2: ({ children }: { children: ReactNode}) => <h1 className="text-xl text-red-600">{children}</h1>,
    },
    marks: {
      color: ({ children }: { children: ReactNode}) => {
        return <span className="text-red-400">{children}</span>
      }
    }
  };
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .8}}>
      <div className="w-full flex justify-between uppercase text-xs px-4 py-2">
        <p>{formattedDate}</p>
        <p>
          By <span className="text-[#f28f81]">{author}</span>
        </p>
      </div>
      <div className="flex flex-col p-8">
        <h2 className="text-xl text-center font-semibold mb-8">{title}</h2>
        <img src={urlFor(mainImage).url()} alt="" />
        <hr className="my-8" />
        <PortableText value={body} components={components} />
      </div>
    </motion.div>
  );
};

export default SinglePost;
