import React, { useEffect, useState, useRef } from 'react';
import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase/firebase';
import {
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore';
import { useNavigate } from 'react-router';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { AuthContext } from '../context/AuthContext';
import { v4 as uuid } from 'uuid';
import { IoSend } from 'react-icons/io5';

const ChatRoom = () => {
  const [messages, setMessages] = useState([]); // [ {user: 'userId', message: 'message'}, ...
  const { currentUser } = useContext(AuthContext);
  const [text, setText] = useState(''); //
  const { data } = useContext(ChatContext);
  const { dispatch } = useContext(ChatContext);

  // auto scroll to bottom
  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unsubscribe();
    };
  }, [data.chatId]);
  const goBack = () => {
    navigate('/');
    dispatch({ type: 'CLEAR_CHAT_ID' });

    // Dispatch an action to clear the chatId
  };

  // handle send message
  const handleSend = async () => {
    await updateDoc(doc(db, 'chats', data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });

    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    });
    await updateDoc(doc(db, 'userChats', data.user.uid), {
      [data.chatId + '.chatId']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    });
    setText('');
  };
  return (
    <div className="chat-room">
      <div className="user-info">
        <button onClick={goBack}>
          <MdOutlineArrowBackIosNew className="back-icon" />
        </button>
        <h2 className="user-name">{data.user?.displayName}</h2>
        <img src={data.user?.photoURL} alt="" />
      </div>
      <div className="message-thread">
        {messages.map((message) => (
          <div
            // if the message is from the current user, add the 'owner' class}
            key={message.id}
            className={`message-row ${
              message.senderId === currentUser.uid && 'ownerUser'
            }`}
          >
            <div className="message-user">
              <img
                src={
                  message.senderId === currentUser.uid
                    ? currentUser.photoURL
                    : data.user.photoURL
                }
                className="profilePic"
                alt=""
              />
              <span>Just Now</span>
            </div>
            <div className="message-content">
              <p>{message.text}</p>
              {message.image && (
                <img className="image-sent" src={message.image} alt="" />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="input-text">
        <input
          type="text"
          placeholder="Type a message"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button onClick={handleSend}>
          <IoSend className="send-icon" />
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
