import { IoMdAttach } from 'react-icons/io';
import { AiFillPicture } from 'react-icons/ai';
import { IoSendSharp } from 'react-icons/io5';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { useContext, useState } from 'react';
import { db } from '../firebase/firebase';
import {
  updateDoc,
  arrayUnion,
  doc,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import { storage } from '../firebase/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const TypeBox = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (image) {
      const storageRef = ref(storage, `images/${uuid()}`);
      await uploadBytes(storageRef, image);
      const url = await getDownloadURL(storageRef);
      await updateDoc(doc(db, 'chats', data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
          image: url,
        }),
      });
    } else {
      await updateDoc(doc(db, 'chats', data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    });
    await updateDoc(doc(db, 'userChats', data.user.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    });

    setText('');
    setImage(null);
  };
  return (
    <div className="type-box">
      <input
        type="text"
        placeholder="Start typing..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send-msg">
        <input
          type="file"
          style={{ display: 'none' }}
          name=""
          id="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label htmlFor="file">
          <IoMdAttach className="icon" />
          <AiFillPicture className="icon" />
        </label>
        <button onClick={handleSend}>
          <IoSendSharp className="icon" />
        </button>
      </div>
    </div>
  );
};

export default TypeBox;
