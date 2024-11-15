import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AuthForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/selectors";
import { loginUser, registerUser } from "../../redux/slices/authSlice";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const clearInputs = () => {
    setUsername("");
    setPassword("");
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (isLogin) {
      try {
        const payload = {
          email: username,
          password,
        };

        await dispatch(loginUser(payload));

        if (user.isAuthenticated) {
          navigate("/");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const payload = {
          email: username,
          password,
        };
        await dispatch(registerUser(payload));
      } catch (error) {
        console.error(error);
      }
    }

    clearInputs()
  };

  const toggleAuthState = () => {
    setIsLogin((prevState) => !prevState);
  };

  const actionIsNotLoading = (
    <button>{isLogin ? "Login" : "Create new account"}</button>
  );

  return (
    <div className={styles.auth}>
      <h2>{isLogin ? "Login" : "Create new Account"}</h2>
      <form onSubmit={submitHandler} autoComplete="off" noValidate>
        <div className={styles.control}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className={styles.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <div className={styles.actions}>
          {user.error && <p>Please try again!</p>}
          {user.loading && <p>Sending request...</p>}
          {!user.loading && actionIsNotLoading}
          <button
            type="button"
            className={styles.toggle}
            onClick={toggleAuthState}
          >
            {isLogin ? "Create new account" : "Login with an existing account"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
