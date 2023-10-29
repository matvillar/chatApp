import React, { useEffect, useState, useContext } from 'react';
import { db } from '../firebase/firebase';
import { onSnapshot, doc } from 'firebase/firestore';
import ProfilePic from '../assets/profilePic.jpeg';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { useNavigate } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';

const Chats = () => {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (user) => {
    dispatch({
      type: 'CHANGE_USER',
      payload: user,
    });
    navigate(`/${user.uid}`); // navigate to chat room
  };
  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => {
          return (
            <div
              className="found_results"
              key={chat[0]}
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              <img src={chat[1].userInfo?.photoURL} alt="" />
              <div className="chatUser_info">
                <span>{chat[1].userInfo?.displayName}</span>
                <p>{chat[1].lastMessage?.text}</p>
              </div>
              <FaChevronRight className="right-icon" />
            </div>
          );
        })}
    </div>
  );
};

export default Chats;
