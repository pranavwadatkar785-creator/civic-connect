"use client";

import {
  login as loginService,
  logout as logoutService,
  signUp as signUpService,
  type LoginInput,
  type SignUpInput,
} from "@/services/auth";
import { useAuthStore } from "@/store/authStore";

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);

  const signUp = async (input: SignUpInput) => {
    return signUpService(input);
  };

  const login = async (input: LoginInput) => {
    const authenticatedUser = await loginService(input);
    setUser(authenticatedUser);

    return authenticatedUser;
  };

  const logout = async () => {
    await logoutService();
    clearUser();
  };

  return {
    user,
    isAuthenticated,
    setUser,
    clearUser,
    signUp,
    login,
    logout,
  };
}
