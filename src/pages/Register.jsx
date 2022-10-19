import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AvatarLogo from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  var status = {
    state: "online",
    last_changed: Timestamp.now().seconds,
  };

  const onSubmit = async () => {
    try {
      if (name && email && password && avatar) {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        const storageRef = ref(storage, name);
        const uploadTask = uploadBytesResumable(storageRef, avatar);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
          },
          (error) => {
            setError(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
              await updateProfile(res.user, {
                displayName: name,
                photoURL: url,
              });
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName: name,
                email,
                photoURL: url,
                status,
              });
              await setDoc(doc(db, "userChats", res.user.uid), {});
              navigate("/");
            });
          }
        );
        setError("");
      } else {
        setError("Fields can't be blank");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="formContainer">
      {progress ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p>Creating your account</p>
          <div style={{ width: 150, height: 150 }}>
            <CircularProgressbar
              value={progress}
              text={`${Math.round(progress)}%`}
            />
          </div>
        </div>
      ) : (
        <div className="formWrapper">
          <p className="logo">Purple</p>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div>
            <input
              required={true}
              type="text"
              placeholder="Name"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <input
              required={true}
              type="email"
              placeholder="Email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <input
              required={true}
              type="password"
              placeholder="Password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <input
              required={true}
              onChange={(event) => {
                setAvatar(event.target.files[0]);
              }}
              style={{ display: "none" }}
              type="file"
              id="file"
              accept="image/png, image/jpeg, image/webp, image/jpg"
            />

            <div
              style={{
                border: "1px solid whitesmoke",
                padding: "5px",
                borderRadius: "10px",
                textAlign: "center",
                display: "flex",
              }}
            >
              <label htmlFor="file">
                <img src={AvatarLogo} width="40" alt="avatar" />
                <span>Add an avatar</span>
              </label>
            </div>

            <button onClick={onSubmit}>Sign up</button>
          </div>
          <p style={{ marginTop: "5px" }}>Already have an account? </p>
          <Link className="link" to={"/login"}>
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Register;
