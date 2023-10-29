// import React from 'react';
// // import ProfilePic from '../assets/profilePic.jpeg';
// import { useContext, useState } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { ChatContext } from '../context/ChatContext';

// const MessageRow = ({ message }) => {
//   const { currentUser } = useContext(AuthContext);
//   const { data } = useContext(ChatContext);
//   return (
//     <div
//       // if the message is from the current user, add the 'owner' class}
//       className={`message-row ${
//         message.senderId === currentUser.uid && 'ownerUser'
//       }`}
//     >
//       <div className="message-user">
//         <img
//           src={
//             message.senderId === currentUser.uid
//               ? currentUser.photoURL
//               : data.user.photoURL
//           }
//           className="profilePic"
//           alt=""
//         />
//         <span>Just Now</span>
//       </div>
//       <div className="message-content">
//         <p>{message.text}</p>
//         {message.image && (
//           <img className="image-sent" src={message.image} alt="" />
//         )}
//       </div>
//     </div>
//   );
// };

// export default MessageRow;
