import { auth, storage, db } from '../firebase/firebase';
import { getDoc, doc, setDoc, collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

const userCollection = collection(db, 'users');
const userChatsCollection = collection(db, 'userChats');

export const registerUser = async (name, email, password, file) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    //upload file to storage (profile pic)
    const storageRef = ref(storage, `users/${user.uid}`);
    await uploadBytes(storageRef, file);
    //get download url
    const downloadURL = await getDownloadURL(storageRef);

    //update profile with name and photo url
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef); // checks if user exists
    // if user exists, then we are creating a new user
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        displayName: name,
        email,
        photoURL: downloadURL,
      });

      console.log(`Name: ${name}, Email: ${email}, PhotoURL: ${downloadURL}`);

      await updateProfile(user, {
        displayName: name, // Set the user's name
        photoURL: downloadURL, // Set the user's photo URL
      });

      console.log(`User profile updated:`, user);
    }

    //add user to userChats collection
    const userChatsRef = doc(db, 'userChats', user.uid);
    const userChatsSnap = await getDoc(userChatsRef);
    if (!userChatsSnap.exists()) {
      await setDoc(userChatsRef, {});
    }
  } catch (err) {
    throw err;
  }
};

// Login user
export const loginUser = async (email, password) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredentials;
  } catch (err) {
    throw new Error(err.message + 'User Login Failed');
  }
};

// Get user info by uid

export const getUserInfo = async (uid) => {
  try {
    const userRef = doc(userCollection, uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const user = userSnap.data();
      return user;
    } else {
      throw new Error('User not found');
    }
  } catch (err) {
    throw err;
  }
};
