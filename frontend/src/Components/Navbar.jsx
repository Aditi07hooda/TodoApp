import React from "react";

export const Navbar = () => {
  return (
    <>
      <div className="bg-white flex justify-between px-16 py-4">
        <h2 className="text-2xl font-semibold cursor-default">TodoApp</h2>
        <h5 className="text-xl font-medium cursor-pointer">Profile</h5>
      </div>
    </>
  );
};
