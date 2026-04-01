import type { RootState } from "@app/store";
import { AuthForm } from "@features/auth-form";
import { UserProfile } from "@features/user-profile";
import { Container } from "@mantine/core";
import { useSelector } from "react-redux";
import classes from "./AuthPage.module.scss";

export default function AuthPage() {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  return (
    <Container size="lg" py="md">
      <div className={classes.root}>
        {accessToken ? <UserProfile /> : <AuthForm />}
      </div>
    </Container>
  );
}
