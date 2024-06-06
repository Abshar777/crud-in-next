"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import userSchemas, { signUpSchema } from "@/lib/signUpSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import img from "@/public/1717149669840.jpg";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import { Loader2 } from "lucide-react";
import { addUser } from "../state/user/userSlice";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/apiResponse";
function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpSchema>({
    resolver: zodResolver(userSchemas),
  });
  const route = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState<string>("");
  const [firstname, setfirstName] = useState<string>("");
  const [lastname, setlastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [err, setErr] = useState<string | undefined>();
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const onSubmit: SubmitHandler<signUpSchema> = async (data: any) => {
    setErr(undefined);
    setLoading(true);
    try {
      const res = await axios.post("/api/sign-up", data);
      dispatch(addUser(data));
      toast.success('successfully creat account',{description:res.data.message})
      route.push('/dashboard')
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<ApiResponse>;
      toast.error("sign-up failed", {description: err?.response?.data?.message ?? "sign-up failed",});
      setErr(err?.response?.data?.message ?? (error as Error)?.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    Object.values(errors).forEach((error) => {
      setErr(error.message);
      if (error) toast.error(error.message);
    });
  }, [errors]);

  return (
    <div className="w-full px-5 md:px-0 h-lvh overflow-hidden  lg:grid  lg:grid-cols-2 ">
      <div className="flex h-lvh md:h-lvh items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-5 text-start">
            <h1 className="text-2xl font-bold">Sign Up</h1>
            {err && (
              <p
                style={{ border: "1px dashed red" }}
                className=" text-sm bg-[#ff000033] p-2 rounded-lg text-center"
              >
                {err}
              </p>
            )}
            <p className="text-balance text-[0.8rem] text-start text-muted-foreground">
              Enter your information to create an account
            </p>
          </div>
          <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input
                    {...register("firstname")}
                    value={firstname}
                    onChange={(e) => setfirstName(e.target.value)}
                    id="first-name"
                    placeholder="Max"
                    required
                    className={`border-[1px] ${errors.firstname && "border-red-900"}`}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input
                    {...register("lastname")}
                    value={lastname}
                    onChange={(e) => setlastName(e.target.value)}
                    id="last-name"
                    placeholder="Robinson"
                    required
                    className={`border-[1px] ${errors.lastname && "border-red-900"}`}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className={`border-[1px] ${errors.email && "border-red-900"}`}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="flex items-center justify-end relative">
                  <Input
                    placeholder=""
                    {...register("password")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    type={`${show ? "text" : "password"}`}
                    className={`border-[1px]  ${errors.password && "border-red-900"}`}
                  />
                  <i
                    onClick={() => setShow(!show)}
                    className={`cursor-pointer ${show ? "ri-eye-close-line" : "ri-eye-2-line"} absolute me-2`}
                  ></i>
                </div>
              </div>
              <Button disabled={loading} type="submit" className="w-full">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create an account
              </Button>
              <Button variant="outline" className="w-full">
                Sign up with GitHub
              </Button>
            </div>
          </form>
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
  );
}
export default SignUp;
