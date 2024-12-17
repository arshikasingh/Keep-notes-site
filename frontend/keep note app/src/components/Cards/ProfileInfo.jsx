import React from "react";

const ProfileInfo = ({ onLogOut, userInfo }) => {
  return (
    <div className="flex items-centergap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100"></div>
      <div>
        <p className="text-sm font-medium">{userInfo}</p>
      </div>
      <button
        className="text-sm bg-red-500 p-1 rounded-md text-white hover:opacity-80"
        onClick={onLogOut}
      >
        {" "}
        Logout{" "}
      </button>
    </div>
  );
};

export default ProfileInfo;
