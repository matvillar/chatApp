import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { useState, useContext, useEffect } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase/firebase';

const SearchChat = () => {
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(null);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, 'users'),
      where('displayName', '==', userName)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      console.log(err);
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === 'Enter' && handleSearch();
  };

  const handleSelect = async () => {
    // Check if chatGroup between 2 users already exists, if not create then new chatGroup
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const combinedChatsRef = doc(db, 'chats', combinedId);
      const combinedChatsSnap = await getDoc(combinedChatsRef);

      if (!combinedChatsSnap.exists()) {
        // create new chatGroup => add to chats collection
        await setDoc(combinedChatsRef, { messages: [] });
        // create user chats
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [`${combinedId}.userInfo`]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [`${combinedId}.date`]: serverTimestamp(),
        });
        await updateDoc(doc(db, 'userChats', user.uid), {
          [`${combinedId}.userInfo`]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [`${combinedId}.date`]: serverTimestamp(),
        });
      }
    } catch (err) {
      setErr(true);
    }
    setUser(null);
    setUserName('');

    // create user chats
  };
  return (
    <div className="search">
      {err && <div className="error">No user found</div>}
      <div className="searchForm">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Find Someone"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          onKeyDown={handleKey}
          value={userName}
        />
      </div>

      {user && (
        <div className="found_result" onClick={handleSelect}>
          <img src={user?.photoURL} alt="" />
          <div className="other_user_info">{user?.displayName}</div>
        </div>
      )}
    </div>
  );
};
export default SearchChat;

// import React, { useEffect, useState, useContext } from 'react';
// import { FaSearch } from 'react-icons/fa';
// // import ProfilePic from '../assets/profilePic.jpeg';
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   getDoc,
//   setDoc,
//   doc,
//   updateDoc,
//   serverTimestamp,
// } from 'firebase/db';
// import { db } from '../firebase/firebase';
// import { AuthContext } from '../context/AuthContext';
// const Search = () => {
//   const [userName, setUserName] = useState('');
//   const [user, setUser] = useState(null);
//   const [err, setErr] = useState(null);

//   const { currentUser } = useContext(AuthContext);

//   const handleSearch = async () => {
//     const q = query(
//       collection(db, 'users'),
//       where('displayName', '==', userName)
//     );

//     try {
//       const querySnapshot = await getDocs(q);
//       querySnapshot.forEach((doc) => {
//         setUser(doc.data());
//       });
//     } catch (err) {
//       console.log(err);
//       setErr(true);
//     }
//   };

//   const handleKey = (e) => {
//     e.code === 'Enter' && handleSearch();
//   };

//   const handleSelect = async () => {
//     // Check if chatGroup between 2 users already exists, if not create then new chatGroup
//     const combinedId =
//       currentUser.uid > user.uid
//         ? currentUser.uid + user.uid
//         : user.uid + currentUser.uid;

//     try {
//       const combinedChatsRef = doc(db, 'chats', combinedId);
//       const combinedChatsSnap = await getDoc(combinedChatsRef);

//       if (!combinedChatsSnap.exists()) {
//         // create new chatGroup => add to chats collection
//         await setDoc(combinedChatsRef, { messages: [] });
//         // create user chats
//         await updateDoc(doc(db, 'userChats', currentUser.uid), {
//           [`${combinedId}.userInfo`]: {
//             uid: user.uid,
//             displayName: user.displayName,
//             photoURL: user.photoURL,
//           },
//           [`${combinedId}.date`]: serverTimestamp(),
//         });
//         await updateDoc(doc(db, 'userChats', user.uid), {
//           [`${combinedId}.userInfo`]: {
//             uid: currentUser.uid,
//             displayName: currentUser.displayName,
//             photoURL: currentUser.photoURL,
//           },
//           [`${combinedId}.date`]: serverTimestamp(),
//         });
//       }
//     } catch (err) {
//       setErr(true);
//     }
//     setUser(null);
//     setUserName('');

//     // create user chats
//   };
//   return (
//     <div className="search">
//       {err && <div className="error">No user found</div>}
//       <div className="searchForm">
//         <FaSearch className="search-icon" />
//         <input
//           type="text"
//           placeholder="Find Someone"
//           onKeyDown={handleKey}
//           onChange={(e) => {
//             setUserName(e.target.value);
//           }}
//           value={userName}
//         />
//       </div>

//       {user && (
//         <div className="found_results" onClick={handleSelect}>
//           <img src={user?.photoURL} alt="" />
//           <div className="other_user_info">{user?.displayName}</div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Search;
