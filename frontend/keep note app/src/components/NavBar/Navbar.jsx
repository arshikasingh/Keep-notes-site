import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import ProfileInfo from "../Cards/ProfileInfo";

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleSearch = () => {
    if (searchQuery) {
    }
  };

  const onCLearSearch = () => {
    setSearchQuery("");
  };

  const onLogOut = () => {
    navigate("/login");
  };
  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <Link to={"/"}>
        <h2 className="text-xl font-medium text-blackpy-2">
          <span className="text-slate-500">Keep</span>
          <span className="text-slate-900">Notes</span>
        </h2>
      </Link>
      <SearchBar
        value={searchQuery}
        onChange={({ target }) => setSearchQuery(target.value)}
        handleSearch={handleSearch}
        onCLearSearch={onCLearSearch}
      />

      <ProfileInfo userInfo={userInfo} onLogOut={onLogOut} />
    </div>
  );
};

export default Navbar;
