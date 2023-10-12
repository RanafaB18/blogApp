import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import BlogPost from "../components/BlogPost";
import { motion } from "framer-motion";
import { Loading } from "../components/Loading";

const Home = () => {
  const data = useContext(DataContext);
  if (!data) {
    return <></>;
  }
  const { posts, isLoading } = data;
  console.log("isLoading", isLoading, posts);

  if (isLoading) {
    return <Loading />
  }
  return (
    <>
      <motion.section initial={{ opacity: 0, y:100 }} animate={{ opacity: 1, y: 0}} transition={{ duration: .4 }}  className="grid grid-cols-1 gap-4 pt-16 p-8">
        {posts.map((post) => {
          const { author, mainImage, title, id, createdAt, excerpt, slug } =
            post;

          return (
            <BlogPost
              key={id}
              author={author}
              mainImage={mainImage}
              title={title}
              createdAt={createdAt}
              excerpt={excerpt}
              slug={slug}
            />
          );
        })}
      </motion.section>
    </>
  );
};

export default Home;
