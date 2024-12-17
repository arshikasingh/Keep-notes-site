import React, { useState } from "react";
import Navbar from "../../components/NavBar/Navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();
  const onSearchNote = () => {};
  const handleClearSearch = () => {
    setIsSearch(false);
  };
  return (
    <div>
      <Navbar
        userInfo={userInfo}
        handleClearSearch={handleClearSearch}
        onSearchNote={onSearchNote}
      />
    </div>
  );
};

export default Home;
