"use client";
import { signIn } from "next-auth/react";
import AuthButtons from "../_utils/AuthButtons";

export default function LoginButtons() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <p>Try after two minutes</p>
      <AuthButtons/>
    </div>
  );
}
