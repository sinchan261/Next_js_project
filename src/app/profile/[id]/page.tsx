"use client"; // Ensure this is a client component
import { useParams } from "next/navigation";

export default function UserProfile() {
  const params = useParams(); // Get dynamic params safely

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile Page{" "}
        <span className="p-2 rounded bg-orange-400 px-10">{params?.id || "Loading..."}</span>
      </p>
    </div>
  );
}
