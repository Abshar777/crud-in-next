"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import img from "@/public/1717149669840.jpg";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema, { LoginSchema } from "@/lib/loginSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/apiResponse";
import { AppDispatch } from "../state/store";
import { addUser} from "../state/user/userSlice";
function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPass] = useState<string>("");
  const [err, setErr] = useState<string | undefined>();
  const [loading,setLoding]=useState<boolean>(false);
  const router=useRouter()
  const dispatch=useDispatch<AppDispatch>()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const onsubmit: SubmitHandler<LoginSchema> =async peyload=>{
      setErr(undefined);
      setLoding(true);
    try{
      const {data}=await axios.post('/api/login',peyload)
      dispatch(addUser(data))
      router.push('/dashboard')
      toast.success("login succesfull",{description:data.message,})
    }catch(err){
      const error=err as AxiosError<ApiResponse>;
      setErr(error.response?.data?.message);
      toast.error("login failed", {description: error.response?.data?.message ?? "sign-up failed",})
      setLoding(false);
    }
  }

  useEffect(() => {
    Object.values(errors).forEach((error) => {
      setErr(error.message);
      if (error) toast.error(error.message);
    });
  }, [errors]);

  return (
    <div className="w-full  px-5 md:px-0 py-2 md:py-0 h-lvh overflow-hidden  lg:grid  lg:grid-cols-2 ">
      <div className="flex px-5 h-lvh md:h-lvh items-center justify-center py-12">
        <form  onSubmit={handleSubmit(onsubmit)}>
            <div className="grid gap-5 text-start">
              <h1 className="text-3xl font-bold">Login</h1>
              {err && (
                <p
                  style={{ border: "1px dashed red" }}
                  className=" text-sm  bg-[#ff000033] p-2 rounded-lg text-center"
                >
                  {err}
                </p>
              )}
              <p className="text-balance w-full  md:text-sm text-[.8rem] text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            <div className="grid gap-4 mt-2">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register('email')}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  {...register('password')}
                  value={password}
                  onChange={e => setPass(e.target.value)}
                  id="password"
                  type="password"
                  required
                />
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Button disabled={loading} type="submit" className="w-full">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Login
              </Button>
              <Button
                variant="outline"
                className=" transition-all ease-in duration-[.5]  w-full"
              >
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="underline">
                Sign up
              </Link>
            </div>
        </form>
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
  );
}
export default Login;
