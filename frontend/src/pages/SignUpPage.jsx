import { useState } from "react";
import { Link as Connection } from "lucide-react";
import { Link } from "react-router";
import useSignUp from "../hooks/useSignUp";
import { useSendOtp, useVerifyOtp } from "../hooks/useOTPauth";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpSuccess, setOtpSuccess] = useState("");

  const sendOtpMutation = useSendOtp();
  const verifyOtpMutation = useVerifyOtp();
  const { isPending, error, signupMutation } = useSignUp();

  const handleSendOtp = () => {
    setOtpError("");
    setOtpSuccess("");
    sendOtpMutation.mutate(signupData.email, {
      onSuccess: () => {
        setOtpSent(true);
        setOtpSuccess("OTP sent successfully to your email.");
      },
      onError: (err) => {
        setOtpError(err.response?.data?.message || "Failed to send OTP.");
      },
    });
  };

  const handleVerifyOtp = () => {
    setOtpError("");
    setOtpSuccess("");
    verifyOtpMutation.mutate({ email: signupData.email, otp }, {
      onSuccess: () => {
        setOtpVerified(true);
        setOtpSuccess("OTP verified successfully.");
      },
      onError: (err) => {
        setOtpVerified(false);
        setOtpError(err.response?.data?.message || "Invalid OTP.");
      },
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!otpVerified) return;
    signupMutation(signupData);
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8" data-theme="sunset">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">

        {/* FORM LEFT SIDE */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">

          <div className="mb-4 flex items-center justify-start gap-2">
            <Connection className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              MeetUp
            </span>
          </div>

          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response?.data?.message}</span>
            </div>
          )}

          {otpError && (
            <div className="alert alert-error mb-4">
              <span>{otpError}</span>
            </div>
          )}

          {otpSuccess && (
            <div className="alert alert-success mb-4">
              <span>{otpSuccess}</span>
            </div>
          )}

          <form onSubmit={handleSignup}>
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold">Create an Account</h2>
                <p className="text-sm opacity-70">
                  Join MeetUp and start your language learning adventure!
                </p>
              </div>

              <div className="space-y-3">

                {/* FULLNAME */}
                <div className="form-control w-full">
                  <label className="label"><span className="label-text">Your Full Name</span></label>
                  <input
                    type="text"
                    placeholder="Jack Sparrow"
                    className="input input-bordered w-full"
                    value={signupData.fullName}
                    onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                    required
                  />
                </div>

                {/* EMAIL */}
                <div className="form-control w-full">
                  <label className="label"><span className="label-text">Email</span></label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="email"
                      placeholder="jacksparrow@gmail.com"
                      className="input input-bordered w-full"
                      value={signupData.email}
                      onChange={(e) => {
                        setSignupData({ ...signupData, email: e.target.value });
                        setOtpSent(false);
                        setOtpVerified(false);
                        setOtp("");
                        setOtpSuccess("");
                        setOtpError("");
                      }}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={handleSendOtp}
                      disabled={sendOtpMutation.isPending || !signupData.email}
                    >
                      {sendOtpMutation.isPending ? "Sending..." : "Send OTP"}
                    </button>
                  </div>
                </div>

                {/* OTP FIELD */}
                {otpSent && (
                  <div className="form-control w-full">
                    <label className="label"><span className="label-text">Enter OTP</span></label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="123456"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                      <button
                        type="button"
                        className="btn btn-outline btn-sm"
                        onClick={handleVerifyOtp}
                        disabled={verifyOtpMutation.isPending || !otp}
                      >
                        {verifyOtpMutation.isPending ? "Verifying..." : "Verify"}
                      </button>
                    </div>
                  </div>
                )}

                {/* PASSWORD */}
                <div className="form-control w-full">
                  <label className="label"><span className="label-text">Password</span></label>
                  <input
                    type="password"
                    placeholder="********"
                    className="input input-bordered w-full"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    required
                  />
                  <p className="text-xs opacity-70 mt-1">
                    Password must be at least 8 characters long
                  </p>
                </div>

                {/* AGREEMENT */}
                <div className="form-control">
                  <label className="label cursor-pointer justify-start gap-2">
                    <input type="checkbox" className="checkbox checkbox-sm" required />
                    <span className="text-xs leading-tight">
                      I agree to the{" "}
                      <span className="text-primary hover:underline">terms of service</span> and{" "}
                      <span className="text-primary hover:underline">privacy policy</span>
                    </span>
                  </label>
                </div>
              </div>

              <button
                className="btn btn-primary w-full"
                type="submit"
                disabled={!otpVerified || isPending}
              >
                {isPending ? (
                  <>
                    <span className="loading loading-spinner loading-xs"></span>
                    Creating...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

              <div className="text-center mt-4">
                <p className="text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>

        {/* ILLUSTRATION RIGHT SIDE */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
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
  );
};

export default SignUpPage;