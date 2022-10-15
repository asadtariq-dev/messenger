import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AvatarLogo from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
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

  const onSubmit = async () => {
    try {
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
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          });
        }
      );

      setError("");
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
          {error && <p>{error}</p>}
          <div>
            <input
              type="text"
              placeholder="Name"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <input
              onChange={(event) => {
                setAvatar(event.target.files[0]);
              }}
              style={{ display: "none" }}
              type="file"
              id="file"
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
