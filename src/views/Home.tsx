import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import BlogPost from "../components/BlogPost";

const Home = () => {
  const data = useContext(DataContext);

  if (!data) {
    return <></>;
  }
  const { posts } = data;
  return (
    <>
      <section className="grid grid-cols-1 gap-4 pt-16 p-8">
        {posts.map((post) => {
          const { author, mainImage, title, id, createdAt, excerpt } = post;

          const date = new Date(createdAt);
          const formattedDate = date.toLocaleString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          return (
            <BlogPost
              key={id}
              author={author}
              mainImage={mainImage}
              title={title}
              createdAt={formattedDate}
              excerpt={excerpt}
            />
          );
        })}
      </section>
    </>
  );
};

export default Home;
