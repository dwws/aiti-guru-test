import { api } from "@app/store/api";
import type {
  LoginRequest,
  LoginResponse,
  MeResponse,
} from "@shared/types/auth";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: ({ username, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: { username, password },
      }),
    }),

    me: build.query<MeResponse, void>({
      query: () => ({ url: "/auth/me", method: "GET" }),
    }),
  }),
});

export const { useLoginMutation, useMeQuery } = authApi;
