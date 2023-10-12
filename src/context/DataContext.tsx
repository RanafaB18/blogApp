import React, { createContext, useEffect, useState } from "react";
import { DataContextType, IPosts } from "../interface";
import { client } from "../client";

export const DataContext = createContext<DataContextType | null>(null);

const DataContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<IPosts[]>([]);


  useEffect(() => {
    client
      .fetch(
        `*[_type == "post"]{
        title,
        "author": author->name,
        mainImage,
        "id": _id,
        "createdAt": _updatedAt,
        excerpt,
        "slug": slug.current
      }`
      )
      .then((data: Array<IPosts>) => {
        console.log(data);
        setPosts(data);
      });
  }, []);
  return (
    <DataContext.Provider
      value={{
        posts,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
