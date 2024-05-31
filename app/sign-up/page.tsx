import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import img from "@/public/1717149669840.jpg"

 function Login() {
  return (
    <div className="w-full h-lvh overflow-hidden  lg:grid  lg:grid-cols-2 ">
      <div className="flex h-lvh md:h-lvh items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-5 text-start">
            <h1 className="text-2xl font-bold">Sign Up</h1>
            <p className="text-balance text-sm text-muted-foreground">
             Enter your information to create an account
            </p>
          </div>
          <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" placeholder="Max" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" placeholder="Robinson" required />
            </div>
          </div>
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
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <Button type="submit" className="w-full">
            Create an account
          </Button>
          <Button variant="outline" className="w-full">
            Sign up with GitHub
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Sign in
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
