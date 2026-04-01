import type { AppDispatch } from "@app/store";
import { useLoginMutation } from "@app/store/authApi";
import { saveAuth, saveRefreshToken } from "@app/store/authPersistence";
import { setAccessToken } from "@app/store/authSlice";
import {
  ActionIcon,
  Button,
  Checkbox,
  Divider,
  TextInput,
} from "@mantine/core";
import clsx from "clsx";
import { type ChangeEvent, type SubmitEvent, useState } from "react";
import { useDispatch } from "react-redux";
import classes from "./auth-form.module.scss";

export const AuthForm = () => {
  const [login, setLogin] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [passwordInputType, setPasswordInputType] = useState<
    "password" | "text"
  >("password");
  const [rememberMe, setRememberMe] = useState(false);
  const [loginFieldError, setLoginFieldError] = useState("");
  const [passwordFieldError, setPasswordFieldError] = useState("");
  const [apiError, setApiError] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const [loginApi, { isLoading: loginLoading }] = useLoginMutation();

  const handleShowPasswordClick = () => {
    setPasswordInputType(
      passwordInputType === "password" ? "text" : "password",
    );
  };

  const handleLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLogin(event.currentTarget.value);
    setLoginFieldError("");
    setApiError("");
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
    setPasswordFieldError("");
    setApiError("");
  };

  const handleRememberMeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRememberMe(event.currentTarget.checked);
  };

  const handleClearLogin = () => {
    setLogin("");
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoginFieldError("");
    setPasswordFieldError("");
    setApiError("");

    let valid = true;

    if (!login.trim()) {
      setLoginFieldError("Введите логин");
      valid = false;
    }

    if (!password) {
      setPasswordFieldError("Введите пароль");
      valid = false;
    }

    if (!valid) {
      return;
    }

    try {
      const result = await loginApi({
        username: login.trim(),
        password,
        rememberMe,
      }).unwrap();

      dispatch(setAccessToken(result.accessToken));
      saveAuth({ accessToken: result.accessToken }, rememberMe);
      saveRefreshToken(result.refreshToken, rememberMe);
    } catch {
      setApiError("Ошибка логина");
    }
  };

  return (
    <div className={classes.root}>
      <img
        src="/auth-icon.svg"
        alt="Иконка авторизации"
        className={classes.icon}
      />
      <h1 className={classes.title}>Добро пожаловать!</h1>
      <p className={classes.description}>Пожалуйста, авторизируйтесь</p>
      {loginLoading && <p>Выполняется вход...</p>}

      <form onSubmit={handleSubmit} className={classes.form}>
        <TextInput
          label="Логин"
          value={login}
          name="login"
          onChange={handleLoginChange}
          placeholder="Введите ваш логин"
          leftSection={
            <img
              src="/user-icon.svg"
              alt="Иконка пользователя"
              className={classes.leftSection}
            />
          }
          leftSectionPointerEvents="none"
          rightSection={
            login ? (
              <ActionIcon
                variant="subtle"
                color="gray"
                onClick={handleClearLogin}
                aria-label="Очистить логин"
                className={classes.iconButton}
              >
                <img src="/x-icon.svg" alt="Очистить логин" />
              </ActionIcon>
            ) : null
          }
          rightSectionWidth={52}
          error={loginFieldError}
          classNames={{
            root: clsx(classes.fieldRoot, classes.loginField),
            label: classes.label,
            input: classes.input,
          }}
        />

        <TextInput
          label="Пароль"
          name="password"
          value={password}
          type={passwordInputType}
          onChange={handlePasswordChange}
          placeholder="Введите ваш пароль"
          leftSection={
            <img
              src="/lock-icon.svg"
              alt="Иконка замка"
              className={classes.leftSection}
            />
          }
          leftSectionPointerEvents="none"
          rightSection={
            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={handleShowPasswordClick}
              aria-label="Показать или скрыть пароль"
              className={classes.iconButton}
            >
              <img src="/eye-off-icon.svg" alt="Скрыть пароль" />
            </ActionIcon>
          }
          rightSectionWidth={52}
          error={passwordFieldError}
          classNames={{
            root: clsx(classes.fieldRoot, classes.passwordField),
            label: classes.label,
            input: classes.input,
          }}
        />

        {apiError ? <p className={classes.apiError}>{apiError}</p> : null}

        <Checkbox
          label="Запомнить данные"
          checked={rememberMe}
          name="rememberMe"
          onChange={handleRememberMeChange}
          classNames={{
            root: classes.checkboxRoot,
            body: classes.checkboxBody,
            input: classes.checkboxInput,
            label: classes.checkboxLabel,
          }}
        />

        <Button type="submit" className={classes.submitButton}>
          Войти
        </Button>

        <div className={classes.orBlock}>
          <Divider className={classes.divider} />
          <span className={classes.orText}>или</span>
          <Divider className={classes.divider} />
        </div>

        <p className={classes.footerText}>
          Нет аккаунта?{" "}
          <a
            href="#"
            className={classes.link}
            onClick={(event) => event.preventDefault()}
          >
            Создать
          </a>
        </p>
      </form>
    </div>
  );
};
