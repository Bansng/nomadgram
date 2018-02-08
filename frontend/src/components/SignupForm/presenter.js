import React from "react";
import Ionicon from "react-ionicons";
import formStyles from "shared/formStyles.scss";

const SignupForm = props => {
  return(
    <div className={formStyles.formComponent}>
      <h3>Sign up to see photos and videos from your friends. </h3>
      <button className={formStyles.button}>
        <Ionicon icon="logo-facebook" fontSize="20px" color="white" /> Log in with Facebook
      </button>
      <span className={formStyles.divider}>or</span>
      <form className={formStyles.form}>
        <input type="email" placeholder="Email" className={formStyles.textInput} />
        <input type="text" placeholder="Full Name" className={formStyles.textInput} />
        <input type="username" placeholder="Username" className={formStyles.textInput} />
        <input type="password" placeholder="Password" className={formStyles.textInput} />
        <input type="submit" value="Log in" className={formStyles.button} />
      </form>
      <p className={formStyles.terms}>
        By signing up, you agree to our <span>Terms & Privacy Policy</span>
      </p>
    </div>
  );
};

export default SignupForm;