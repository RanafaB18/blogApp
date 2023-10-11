import React, { createContext, useEffect, useState } from "react";
import { DataContextType, IPosts } from "../interface";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const DataContext = createContext<DataContextType | null>(null);

const DataContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<IPosts[]>([]);
  const builder = imageUrlBuilder(client)
  function urlFor(source: SanityImageSource) {
    return builder.image(source)
  }

  useEffect(() => {
    client.fetch(
      `*[_type == "post"]{
        title,
        "author": author->name,
        mainImage,
        "id": _id,
        "createdAt": _updatedAt,
        excerpt
      }`
    ).then((data: Array<IPosts>) => {
      console.log(data);
      setPosts(data)
    })
  }, [])
  return (
    <DataContext.Provider
      value={{
        posts,
        urlFor,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
