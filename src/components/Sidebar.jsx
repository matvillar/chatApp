import React from 'react';
import Navbar from './Navbar';
import Search from './Search';
import Chats from './Chats';

const Sidebar = () => {
  return (
    <>
      <Navbar />
      <div className="messageChat">
        <Search />
      </div>

      <Chats />
    </>
  );
};

export default Sidebar;
