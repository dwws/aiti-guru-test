import type { AppDispatch } from "@app/store";
import { api } from "@app/store/api";
import { clearAuthStorage } from "@app/store/authPersistence";
import { clearCredentials } from "@app/store/authSlice";

export function resetSession(dispatch: AppDispatch): void {
  dispatch(clearCredentials());
  dispatch(api.util.resetApiState());
  clearAuthStorage();
}
