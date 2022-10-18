import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";

const createChat = async (user) => {
  const currentUser = auth.currentUser;
  const chatID =
    currentUser?.uid > user?.uid
      ? currentUser?.uid + user?.uid
      : user?.uid + currentUser?.uid;
  try {
    const res = await getDoc(doc(db, "chats", chatID));
    if (!res.exists()) {
      await setDoc(doc(db, "chats", chatID), { messages: [] });
    }
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [chatID + ".userInfo"]: {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
      [chatID + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", user.uid), {
      [chatID + ".userInfo"]: {
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
      },
      [chatID + ".date"]: serverTimestamp(),
    });
  } catch (error) {
    console.log(error.message);
  }
};

export default createChat;
