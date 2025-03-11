"use client";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Profilepage() {
  const [data, setdata] = useState("nothing");
  const router = useRouter();
  const logout = async () => {
    console.log("hh");
    try {
      const response = await axios.get("/api/users/logout", {
        withCredentials: true,
      });
      router.push("/login");
      console.log(response);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getuser = async () => {
    console.log("dss");
    const res = await axios.get("/api/users/me");
    
    setdata(res.data.data._id);
    console.log(res);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <h2>
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <button
        className="text-red-200 bg-red-500 p-3 px-6 rounded-lg cursor-pointer"
        onClick={() => logout()}
      >
        Logout
      </button>
      <button
        className="bg-orange-500 text-black px-6 rounded-xl  mt-8"
        onClick={() => getuser()}
      >
        Get Data
      </button>
    </div>
  );
}
