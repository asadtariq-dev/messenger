import React from "react";
import AvatarLogo from "../img/addAvatar.png";

const Register = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <p className="logo">Puprple</p>
        <form>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <div style={{ border: '1px solid whitesmoke', padding: '5px', borderRadius: '10px', color: 'purple'}}>
            <label htmlFor="file">
              <img src={AvatarLogo} width="40" alt="avatar" />
              <span>Add an avatar</span>
            </label>
          </div>
          <button>Sign up</button>
        </form>
        <p>Already have an account? Login</p>
      </div>
    </div>
  );
};

export default Register;
