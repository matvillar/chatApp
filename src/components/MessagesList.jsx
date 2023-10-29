import React from 'react';
import MessageRow from './MessageRow';
import { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase/firebase';
import { onSnapshot, doc } from 'firebase/firestore';

const MessagesList = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <div className="messages">
      {messages.map((msg) => (
        <MessageRow message={msg} key={msg.id} />
      ))}
    </div>
  );
};

export default MessagesList;
