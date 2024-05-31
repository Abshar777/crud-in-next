"use client"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import img from "@/public/1717149669840.jpg"
import {useState} from "react"
 function Login() {
     const [email,setEmail]=useState<string>("")
  return (
    <div className="w-full h-lvh overflow-hidden  lg:grid  lg:grid-cols-2 ">
      <div className="flex h-lvh md:h-lvh items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-5 text-start">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-sm text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
               
              </div>
              <Input id="password" type="password" required />
              <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
            </div>
            <Button type="submit" className="w-full   transition-all ease-in duration-[.5] ">
              Login
            </Button>
            <Button variant="outline" className=" transition-all ease-in duration-[.5]  w-full">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden relative  w-full h-full overflow-hidden rounded-2xl  lg:flex items-center justify-end">
        <Image
          src={img}
          alt="Image"
    placeholder="blur"
          className="h-full   w-[90%] rounded-2xl  object-cover dark:brightness-[0.3] "
        />
       
      </div>
    </div>
  )
}
export default Login
