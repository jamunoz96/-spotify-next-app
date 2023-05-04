import { signIn } from "next-auth/react";
import Image from "next/image";
import { useCallback } from "react";
import Layout from "../components/Layout";

export default function Login() {
  const handleLogin = useCallback(
    () => signIn("spotify", { callbackUrl: "http://localhost:3000" }),
    []
  );

  return (
    <Layout title="Log in to Spotify">
      <div className="flex flex-col items-center justify-center w-screen h-screen gap-20">
        <Image
          src="/images/cbolivar.svg"
          alt="spotify logo"
          width={720}
          height={226}
          objectFit="contain"
        />
        <button
          className="flex px-12 py-2 text-lg tracking-widest uppercase rounded-full focus:outline-none bg-gray  text-btnText hover:bg-opacity-80"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </Layout>
  );
}
