import { getDatabase, onValue, ref } from "firebase/database";

const getStatus = (userId) => {
  let status = {};
  const db = getDatabase();

  onValue(ref(db, `status/${userId}`), (snapshot) => {
    const data = snapshot.val();
    if (data != null) {
      status = data;
    }
  });
  return status;
};
export default getStatus;
