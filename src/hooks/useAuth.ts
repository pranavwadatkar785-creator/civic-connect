"use client";

import {
  login as loginService,
  logout as logoutService,
  signUp as signUpService,
  type LoginInput,
  type SignUpInput,
} from "@/services/auth";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

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
    //clearUser();
  };
  useEffect(() => {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(
    async (_event, session) => {
      console.log(
        "Auth changed:",
        _event
      );

      if (!session) {
        clearUser();
        return;
      }

      // keep store synced
      const currentUser =
        useAuthStore.getState().user;

      if (!currentUser) {
        // session exists but store empty
        // future: load profile here
      }
    }
  );

  return () => {
    subscription.unsubscribe();
  };
}, [clearUser]);
  

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
