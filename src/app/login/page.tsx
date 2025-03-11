"use client";
import { usersignup } from "../../../next.config";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Loginpage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    try {
      const response = await toast.promise(
        axios.post("/api/users", user),
        {
          pending: "Logged in....",
        },
        {
          autoClose: 3000, // Close the toast after 3 seconds
          position: "top-right", // Optional: Set toast position
          hideProgressBar: false, // Optional: Show progress bar
          closeOnClick: true, // Optional: Close on click
        }
      );
      console.log(response);
      if (response.status == 200) {
        toast.success(response?.data?.message || "successfully logged in");
        router.push(`/profile/${response.status}`);
      }
    } catch (error: any) {
      console.log(error.response.data);
      toast.error(error.response?.data?.message || "something is wrong");
    }
  };
  return (
    <div className=" flex flex-col  w-[50%] m-auto border gap-5 mt-20">
      <ToastContainer position="top-right" />
      <h1 className="text-center  text-white  text-2xl ">Login</h1>

      <label htmlFor="password">Password</label>
      <input
        id="password"
        className="px-4 py-2 text-black"
        type="text"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Enter password Here"
      />

      <label htmlFor="email">username</label>
      <input
        id="email"
        className="px-4 py-2 text-black" 
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Enter email Here"
      />
      <div className="text-center">
        <button
          className="px-4 py-2 bg-white rounded-lg w-[50%] text-center"
          onClick={onLogin}
        >
          Login Here
        </button>
      </div>
      <Link href={"/signup"} className="text-center">
        Visit Signup Here
      </Link>
    </div>
  );
}
