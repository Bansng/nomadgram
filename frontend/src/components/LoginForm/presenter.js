import React from "react";
import PropTypes from "prop-types";
import FacebookLogin from "react-facebook-login";
import formStyles from "shared/formStyles.scss";

const LoginForm = (props, context) => {
  return(
    <div className={formStyles.formComponent}>
      <form className={formStyles.form} onSubmit={props.handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          className={formStyles.textInput}
          value={props.usernameValue}
          onChange={props.handleInputChange}
          name="username"
        />
        <input
          type="password"
          placeholder="Password"
          className={formStyles.textInput}
          value={props.passwordValue}
          onChange={props.handleInputChange}
          name="password"
        />
        <input
          type="submit"
          value="Log in"
          className={formStyles.button}
        />
      </form>
      <span className={formStyles.divider}>or</span>
      <FacebookLogin
        appId="765457970309767"
        autoLoad={false}
        fields="name,email,picture"
        callback={props.handleFacebookLogin}
        cssClass={formStyles.button}
        icon="fa-facebook-official"
        textButton={context.t("Log in with Facebook")}
      />
      <span className={formStyles.forgotLink}>Forgot password</span>
    </div>
  );
};

LoginForm.propTypes = {
  usernameValue: PropTypes.string.isRequired,
  passwordValue: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

LoginForm.contextTypes = {
  t: PropTypes.func.isRequired
};

export default LoginForm;