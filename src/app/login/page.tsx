// "use client";

// import Button from "@/components/common/buttons/MiniButton";
// import Input from "@/components/common/inputs/Input";
// import { useLogin } from "@/hooks/useLogin";
// import { useRouter } from "next/navigation";
// import { FormEvent, useEffect, useState } from "react";
// import { toast } from "sonner";
// import Spinner from "react-spinkit"
// import { useGlobalContext } from "@/context/GlobalContext";

// const Login = () => {
//   const router = useRouter();
//   const [loginState, setLoginState] = useState({
//     email: "",
//     password: ""
//   });

//   const { isLoggedIn, setIsLoggedIn } = useGlobalContext();

//   useEffect(() => {
//     if (isLoggedIn) {
//       router.push("/admin");
//     }
//   }, [isLoggedIn]);

//   const { login, error, loading, setState } = useLogin();

//   if (error) toast.error(error);

//   const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setState({ loading: true, error: null });
//     const message = await login(loginState.email, loginState.password);
//     if (message) {
//       localStorage.setItem("token", message.token);
//       setIsLoggedIn(true);
//       toast.success(message.message);
//     }
//   }

//   return (
//     <div className="bg-grey h-screen w-screen flex  justify-center items-center px-3">
//       <div className="bg-white rounded-lg px-8 py-10 max-w-lg w-full shadow-lg">
//         <p className="text-black font-bold text-4xl">Login</p>
//         <form
//           onSubmit={handleLogin}
//           className="flex flex-col space-y-4 mt-4"
//         >
//           <Input
//             type="email"
//             placeholder="Enter your email"
//             value={loginState.email}
//             onChange={e => setLoginState({ ...loginState, email: e.target.value })}
//             className="h-12 outline-black"
//           />
//           <Input
//             type="password"
//             placeholder="Enter your password"
//             value={loginState.password}
//             onChange={e => setLoginState({ ...loginState, password: e.target.value })}
//             className="h-12 outline-black"
//           />
//           <Button
//             text={loading ? <Spinner name="circle" color="white" />: "Login"}
//             disabled={loginState.email === "" || loginState.password === ""}
//             className="h-12 disabled:bg-dark-grey disabled:cursor-not-allowed border-none"
//           />
//         </form>
//         <div className="flex">
//           <p className="text-black mt-5">Having problem Logging In? <span className="font-bold underline cursor-pointer">Click Here</span></p>
//         </div>
//       </div>
//     </div>
//   )
// }
// export default Login

"use client";

import Button from "@/components/common/buttons/MiniButton";
import Input from "@/components/common/inputs/Input";
import { useLogin } from "@/hooks/useLogin";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import Spinner from "react-spinkit";
import { useGlobalContext } from "@/context/GlobalContext";
import ButtonLoader from "@/components/layouts/category/widget/ButtonLoader";

const Login = () => {
  const router = useRouter();
  const [loginState, setLoginState] = useState({
    email: "",
    password: ""
  });

  const { isLoggedIn, setIsLoggedIn, loading } = useGlobalContext();
  const { login, error, setState } = useLogin();

  useEffect(() => {
    if (!loading && isLoggedIn) {
      router.replace("/admin");
    }
  }, [isLoggedIn, loading]);

  if (error) toast.error(error);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState({ loading: true, error: null });
    const message = await login(loginState.email, loginState.password);
    if (message) {
      localStorage.setItem("token", message.token);
      setIsLoggedIn(true);
      toast.success(message.message);
    }
  };

  if (loading) {
    return <div className="h-screen flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="bg-grey h-screen w-screen flex justify-center items-center px-3">
      <div className="bg-white rounded-lg px-8 py-10 max-w-lg w-full shadow-lg">
        <p className="text-black font-bold text-4xl">Login</p>
        <form onSubmit={handleLogin} className="flex flex-col space-y-4 mt-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={loginState.email}
            onChange={e => setLoginState({ ...loginState, email: e.target.value })}
            className="h-12 outline-black"
          />
          <Input
            type="password"
            placeholder="Enter your password"
            value={loginState.password}
            onChange={e => setLoginState({ ...loginState, password: e.target.value })}
            className="h-12 outline-black"
          />
          <Button
            text={loading ? <ButtonLoader /> : "Login"}
            disabled={!loginState.email || !loginState.password || loading}
            className="h-12 disabled:bg-dark-grey disabled:cursor-not-allowed border-none"
          />
        </form>
      </div>
    </div>
  );
};
export default Login;
