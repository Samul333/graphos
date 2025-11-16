"use client";
import { useState } from "react";
import { SignIn, SignUp } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-0 relative">

    <div className="flex flex-row items-center absolute top-0 left-0 cursor-pointer">
            <img src="/doggo-logo-min.png" className="w-[90px] object-contain" alt="" />

            <Link href={"/"}>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-700 text-transparent bg-clip-text">
              Graphos
            </h1>
            </Link>

          </div>
  

      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-6xl h-[90vh] overflow-hidden grid md:grid-cols-2">
        {/* Left Image Section */}
        <div className="relative hidden md:block bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-200 p-6">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-200 via-purple-100 to-pink-50 opacity-60"></div>
          <Image
            src="/doggo-login.png"
            alt="Doggo Illustration"
            fill
            className="object-contain drop-shadow-2xl relative z-10"
          />
        </div>

        {/* Right Auth Section */}
        <div className="flex flex-col justify-center p-12 relative">
          {/* Toggle */}
          <div className="flex w-full mb-10 bg-gray-100 rounded-full p-1 shadow-inner">
            <button
              className={`flex-1 py-3 text-center rounded-full transition-all duration-300 font-semibold ${
                mode === "signin"
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-indigo-600"
              }`}
              onClick={() => setMode("signin")}
            >
              Sign In
            </button>
            <button
              className={`flex-1 py-3 text-center rounded-full transition-all duration-300 font-semibold ${
                mode === "signup"
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-indigo-600"
              }`}
              onClick={() => setMode("signup")}
            >
              Sign Up
            </button>
          </div>

          {/* Animated Container */}
          <div className="relative h-[480px] overflow-hidden">
            <div
              className={`absolute inset-0 transition-all duration-500 transform ${
                mode === "signin"
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <SignIn appearance={{ elements: { rootBox: "w-full" } }} />
            </div>

            <div
              className={`absolute inset-0 transition-all duration-500 transform ${
                mode === "signup"
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <SignUp appearance={{ elements: { rootBox: "w-full" } }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
