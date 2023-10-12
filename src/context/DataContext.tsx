import React, { createContext, useEffect, useState } from "react";
import { DataContextType, IPosts } from "../interface";
import { client } from "../client";

export const DataContext = createContext<DataContextType | null>(null);

const DataContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<IPosts[]>([]);
  const [isLoading, setIsLoading] = useState(true)

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
      setTimeout(() => {
        setIsLoading(false)
      }, 4000);
  }, []);
  return (
    <DataContext.Provider
      value={{
        posts,
        isLoading
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
