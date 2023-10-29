import React from 'react';
import { BsFillCameraVideoFill } from 'react-icons/bs';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { BiDotsHorizontal } from 'react-icons/bi';
import MessagesList from './MessagesList';
import TypeBox from './TypeBox';
import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';

const ChatInfoTop = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className="chat_list">
      <div className="chat-info">
        <span>{data.user?.displayName}</span>
        <div className="chat-icons">
          <BsFillCameraVideoFill className="icon" />
          <BsFillPersonPlusFill className="icon" />
          <BiDotsHorizontal className="icon" />
        </div>
      </div>
      <MessagesList />
      <TypeBox />
    </div>
  );
};

export default ChatInfoTop;
