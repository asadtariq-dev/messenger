import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AvatarLogo from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

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
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              name,
              photoURL: downloadURL,
            });
            navigate("/login");
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
      <div className="formWrapper">
        <p className="logo">Purple</p>
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
            {progress ? (
              <>
                {progress > 50 ? (
                  <>
                    {progress === 100 ? (
                      <p style={{ color: "white" }}>Account created</p>
                    ) : (
                      <p>Creating your account...</p>
                    )}
                  </>
                ) : (
                  <>
                    <p>Uploading your avatar...</p>
                    <p>{Math.round(progress)}%</p>
                  </>
                )}
              </>
            ) : (
              <label htmlFor="file">
                <img src={AvatarLogo} width="40" alt="avatar" />
                <span>Add an avatar</span>
              </label>
            )}
          </div>

          <button onClick={onSubmit}>Sign up</button>
        </div>
        <p>{error}</p>
        <p>Already have an account? </p>
        <Link className="link" to={"/login"}>
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
