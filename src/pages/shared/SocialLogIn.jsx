import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";

const SocialLogIn = () => {
  const { signInGoogle } = useContext(AuthContext);
  const handleGoogleSign = () => {
    signInGoogle()
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="m-4">
      <div className="divider divider-horizontal">OR</div>
      <button onClick={handleGoogleSign} className="btn">
        Google
      </button>
    </div>
  );
};

export default SocialLogIn;
