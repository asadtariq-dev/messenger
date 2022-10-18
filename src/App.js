import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./styles.scss";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import { getDatabase, onDisconnect, ref, set } from "firebase/database";
import { doc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

const App = () => {
  const realDB = getDatabase();

  var isOfflineForDatabase = {
    state: "offline",
    last_changed: Timestamp.now().seconds,
  };

  var isOnlineForDatabase = {
    state: "online",
    last_changed: Timestamp.now().seconds,
  };

  const { currentUser } = useContext(AuthContext);

  var uid = currentUser?.uid;
  if (uid) {
    var userStatusDatabaseRef = ref(realDB, "/status/" + uid);

    const disconnect = onDisconnect(userStatusDatabaseRef);

    uid && disconnect.set(isOfflineForDatabase);
  }
  const writeToFirestore = async () => {
    await updateDoc(doc(db, "/users/", uid), { status: isOnlineForDatabase });
  };
  useEffect(() => {
    uid && writeToFirestore();
    uid && set(userStatusDatabaseRef, isOnlineForDatabase);
  });
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to={"/login"} />;
    }
    return children;
  };
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
