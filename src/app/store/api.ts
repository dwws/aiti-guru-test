import type { AppDispatch, RootState } from "@app/store";
import {
  getRefreshToken,
  hasPersistentAuth,
  saveRefreshToken,
  updateStoredAccessToken,
} from "@app/store/authPersistence";
import { setAccessToken } from "@app/store/authSlice";
import { resetSession } from "@app/store/resetSession";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RefreshResponse } from "@shared/types/auth";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://dummyjson.com",
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).auth.accessToken;

    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, apiInstance, extraOptions) => {
  let result = await baseQuery(args, apiInstance, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      resetSession(apiInstance.dispatch as AppDispatch);
      return result;
    }

    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
        body: { refreshToken },
      },
      apiInstance,
      extraOptions,
    );

    if (refreshResult.data) {
      const data = refreshResult.data as RefreshResponse;

      if (data.accessToken) {
        apiInstance.dispatch(setAccessToken(data.accessToken));
        updateStoredAccessToken(data.accessToken);
      }

      if (data.refreshToken) {
        saveRefreshToken(data.refreshToken, hasPersistentAuth());
      }

      result = await baseQuery(args, apiInstance, extraOptions);
    } else {
      resetSession(apiInstance.dispatch as AppDispatch);
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
