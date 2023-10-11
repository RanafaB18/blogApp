import { useState } from "react";
import { blogName } from "../data/constants";
import Menu from "./Menu";
import SearchButton from "./SearchButton";
import { AnimatePresence, motion } from "framer-motion";
const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  function searchHandler() {
    setSearchOpen(!searchOpen);
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between p-3">
        <Menu />
        <h1 className="text-3xl whitespace-pre-line text-center">{blogName}</h1>
        <SearchButton onSearch={searchHandler} />
      </div>
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: "5px", opacity: 0 }}
            animate={{ height: "74px", opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ height: "5px", opacity: 0 }}
            className="absolute flex flex-col justify-center px-4 text-lg w-full h-20 bg-white"
          >
            <input
              type="text"
              className="outline-none text-lg"
              placeholder="What are you looking for?"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
