import { Link as Connection } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";


const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  }

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="sunset"
    >

      {/* TOP-LEFT: Mailing service notice */}
      <div className="fixed bottom-3 left-50 z-50 max-w-xs bg-warning/20 border border-warning/50 text-warning-content rounded-lg px-3 py-2 shadow-md backdrop-blur-sm">
        <p className="text-xs font-medium leading-snug text-white">
          ⚠️ Mailing service is currently not working. Please use the provided credentials to log in and explore the app.
        </p>
      </div>

      {/* TOP-RIGHT: Demo credentials */}
      <div className="fixed top-3 right-3 z-50 bg-base-100/90 border border-white rounded-lg px-4 py-3 shadow-md backdrop-blur-sm text-xs space-y-2 max-w-[220px]">
        <p className="font-semibold text-sm opacity-80">🔑 Demo Credentials</p>
        <div className="space-y-1">
          <p className="font-medium opacity-70">User 1</p>
          <p className="font-mono break-all opacity-90">jangratanish0007@gmail.com</p>
          <p className="font-mono opacity-90">Password: 12345678</p>
        </div>
        <div className="divider my-1 opacity-30"></div>
        <div className="space-y-1">
          <p className="font-medium opacity-70">User 2</p>
          <p className="font-mono break-all opacity-90">sharmatanish0000007@gmail.com</p>
          <p className="font-mono opacity-90">Password: 12345678</p>
        </div>
      </div>

      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* LOGIN FORM SECTION */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* LOGO */}
          <div className="mb-4 flex items-center justify-start gap-2">
            <Connection className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
              MeetUp
            </span>
          </div>

          {/* ERROR MESSAGE DISPLAY */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response.data.message}</span>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Welcome Back</h2>
                  <p className="text-sm opacity-70">
                    Sign in to your account to continue your language journey
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="form-control w-full space-y-2">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="hello@example.com"
                      className="input input-bordered w-full"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-control w-full space-y-2">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="input input-bordered w-full"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-full" disabled={isPending}>
                    {isPending ? (
                      <>
                        <span className="loading loading-spinner loading-xs"></span>
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>

                  <div className="text-center mt-4">
                    <p className="text-sm">
                      Don't have an account?{" "}
                      <Link to="/signup" className="text-primary hover:underline">
                        Create one
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* IMAGE SECTION */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="/1.png" alt="Language connection illustration" className="w-full h-full" />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage