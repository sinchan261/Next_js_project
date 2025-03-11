"use client"
import axios from 'axios'
import Link from 'next/link'
import React,{useState,useEffect} from "react"
export default function  VerifyEmailPage (){
    const [token,setToken]=useState("");
    const [verified,setVerified]=useState(true);
    const[error,setError]=useState(false)
    const verifyUserEmail=async()=>{
        try{
await axios.post("/api/users/verifyemail",{token})
setVerified(true);
        }catch(error:any){
            setError(true)
            console.log(error.message)
        }
    }
    useEffect(()=>{
  const urltoken=window.location.search.split("=")[1];
  setToken(urltoken)
    },[token])
    useEffect(()=>{
        if(token.length>0)
            verifyUserEmail()
    },[token])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">verify Email</h1>
            <h2>{token?`${token}`:"no token"}</h2>
            {verified&&(
                <div>
                    <h2 className="text-2xl">Email Verifed</h2>
                    <Link href="/login">Login</Link></div>
            )}
               {error&&(
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error </h2>
                    <Link href="/login">Login</Link></div>
            )}
        </div>
    )
}