"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Define the usersignup type (if not defined elsewhere)
interface UserSignup {
  email: string;
  password: string;
  username: string;
}

export default function Registerpage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserSignup>({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const onSignup = async () => {
    console.log("Signup attempt");

    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success:", response);
      toast.success("Signup successful! Redirecting to login...");
      // router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col w-[50%] m-auto border gap-5 mt-20 p-5 bg-gray-900 text-white rounded-lg">
      <ToastContainer />
      <h1 className="text-center text-2xl">Signup</h1>

      <label htmlFor="username">Username</label>
      <input
        id="username"
        className="px-4 py-2 text-black"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Enter Name Here"
        autoComplete="username"
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        className="px-4 py-2 text-black"
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Enter Email Here"
        autoComplete="email"
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        className="px-4 py-2 text-black"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Enter Password Here"
        autoComplete="new-password"
      />

      <div className="text-center">
        <button
          disabled={buttonDisabled || loading}
          className={`px-4 py-2 bg-white text-black rounded-lg w-[50%] text-center ${
            buttonDisabled || loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={onSignup}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </div>

      <Link href="/login" className="text-center text-blue-400">
        Visit login here
      </Link>
    </div>
  );
}
