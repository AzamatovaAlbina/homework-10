import React, { useEffect, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState(""); //  Это для электронной почты пользователя
  const [emailIsValid, setEmailIsValid] = useState(); // Для проверки валидности email, если не верно, то border будет красным
  const [enteredPassword, setEnteredPassword] = useState(""); // / это для пароля
  const [passwordIsValid, setPasswordIsValid] = useState(); // Для проверки валидности пароля, если не верно, то border будет красным
  const [formIsValid, setFormIsValid] = useState(false); //  для выключения кнопки disabled

  useEffect(() => {
    // useEffect hook мы можем вызывать разные побочные эффекты
    const timer = setTimeout(() => {
      // setTimeout - функцияларды бе
      console.log("hello world");
      setFormIsValid(
        enteredEmail.includes("@") && enteredPassword.trim().length > 6
      );
    }, 1500);

    return () => {
      //  clean up function
      console.log("clean up");
      clearTimeout(timer);
    };
  }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
    // console.log('email');

    // setFormIsValid(
    //   event.target.value.includes('@') && enteredPassword.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
    // console.log('password');

    // setFormIsValid(
    //   event.target.value.trim().length > 6 && enteredEmail.includes('@')
    // );
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email" className={classes.title}>
            E-Mail
          </label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler} // onChangeсобытий — это реквизит, который вы можете передать в <input>
            onBlur={validateEmailHandler} // Обработчик onBlur inсобытия вызывается, когда фокус покидает элемент
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler} //
            onBlur={validatePasswordHandler} //
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
