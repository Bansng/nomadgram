import React from "react";
import PropTypes from "prop-types";
import formStyles from "shared/formStyles.scss";
import FacebookLogin from "react-facebook-login";

const SignupForm = (props, context) => {
  return(
    <div className={formStyles.formComponent}>
      <h3>Sign up to see photos and videos from your friends. </h3>
      <FacebookLogin
        appId="765457970309767"
        autoLoad={false}
        fields="name,email,picture"
        callback={props.handleFacebookLogin}
        cssClass={formStyles.button}
        icon="fa-facebook-official"
        textButton={context.t("Log in with Facebook")}
      />
      <span className={formStyles.divider}>or</span>
      <form className={formStyles.form} onClick={props.handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className={formStyles.textInput}
          name="email"
          value={props.emailValue}
          onChange={props.handleInputChange}
        />
        <input
          type="text"
          placeholder="Full Name"
          className={formStyles.textInput}
          name="fullname"
          value={props.fullnameValue}
          onChange={props.handleInputChange}
        />
        <input
          type="username"
          placeholder="Username"
          className={formStyles.textInput}
          name="username"
          value={props.usernameValue}
          onChange={props.handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          className={formStyles.textInput}
          name="password"
          value={props.passwordValue}
          onChange={props.handleInputChange}
        />
        <input
          type="submit"
          value="Sign up"
          className={formStyles.button}
        />
      </form>
      <p className={formStyles.terms}>
        By signing up, you agree to our <span>Terms & Privacy Policy</span>
      </p>
    </div>
  );
};

SignupForm.propTypes = {
  emailValue: PropTypes.string.isRequired,
  fullnameValue: PropTypes.string.isRequired,
  usernameValue: PropTypes.string.isRequired,
  passwordValue: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

SignupForm.contextTypes = {
  t: PropTypes.func.isRequired
};


export default SignupForm;