import type { AppDispatch, RootState } from "@app/store";
import { useMeQuery } from "@app/store/authApi";
import { resetSession } from "@app/store/resetSession";
import { Button } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import classes from "./user-profile.module.scss";

export const UserProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const {
    data: user,
    isFetching,
    isError,
  } = useMeQuery(undefined, {
    skip: !accessToken,
  });

  const handleLogout = () => {
    resetSession(dispatch);
  };

  if (isFetching) {
    return <p>Загрузка данных пользователя...</p>;
  }

  if (isError || !user) {
    return <p style={{ color: "red" }}>Не удалось получить профиль.</p>;
  }

  return (
    <div className={classes.loggedInBlock}>
      <h2>Профиль пользователя</h2>

      <p>
        <strong>ID:</strong> {user.id}
      </p>
      <p>
        <strong>firstName:</strong> {user.firstName}
      </p>
      <p>
        <strong>lastName:</strong> {user.lastName}
      </p>
      <p>
        <strong>maidenName:</strong> {user.maidenName}
      </p>
      <p>
        <strong>Age:</strong> {user.age}
      </p>
      <p>
        <strong>Пол:</strong> {user.gender}
      </p>
      <p>
        <strong>phone:</strong> {user.phone}
      </p>
      <p>
        <strong>E-mail:</strong> {user.email}
      </p>

      <Button variant="outline" onClick={handleLogout}>
        Выйти
      </Button>
    </div>
  );
};
