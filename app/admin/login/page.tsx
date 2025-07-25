"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Shield, User, Lock } from "lucide-react";
import { z } from "zod";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const adminLoginSchema = z.object({
  username: z.string().refine((val) => val.length > 0, {
    message: "Username is required",
  }),
  password: z.string().refine((val) => val.length > 0, {
    message: "Password is required",
  }),
});

type AdminLoginForm = z.infer<typeof adminLoginSchema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginForm>({
    resolver: zodResolver(adminLoginSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        {/* Logo and Admin badge */}
        <div className="flex flex-col items-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm">
            <Shield className="w-5 h-5 text-slate-600" />
            <span className="text-gray-700 font-medium">
              Job Board Admin Portal
            </span>
          </div>
        </div>

        {/* Main form container */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Sign in to access the admin dashboard
            </p>
          </div>

          <form
            onSubmit={handleSubmit(async (data) => {
              setIsLoading(true);

              try {
                adminLoginSchema.parse({
                  username: data.username,
                  password: data.password,
                });

                const response = await axiosInstance.post("/auth/login", {
                  username: data.username,
                  password: data.password,
                });

                if (response) {
                  localStorage.setItem(
                    "adminAuthData",
                    JSON.stringify(response.data)
                  );

                  setIsLoading(false);
                  toast.success("Logged in Successfully");
                  router.push("/admin");
                }
              } catch (error: any) {
                if (error instanceof z.ZodError) {
                  console.error("Validation errors:", error);
                  toast.error("Invalid input. Please check your credentials.");
                } else if (axios.isAxiosError(error)) {
                  if (error.response?.status === 401) {
                    toast.error("Invalid credentials, Please try again.");
                  } else if (error.response?.status === 400) {
                    toast.error("Missing fields. Please check and try again.");
                  } else {
                    toast.error("Server error. Please try again later.");
                  }
                  console.error(
                    "Login failed:",
                    error.response?.data || error.message
                  );
                } else {
                  toast.error("Something went wrong, try again");
                  console.error("An unexpected error occurred:", error);
                }
              } finally {
                setIsLoading(false);
              }
            })}
          >
            {/* Username field */}
            <div className="space-y-2 mb-6">
              <label className="text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register("username")}
                  type="text"
                  placeholder="Enter your username"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                />
              </div>
              {errors.username && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password field */}
            <div className="space-y-2 mb-6">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`flex items-center justify-center w-full text-white py-4 cursor-pointer rounded-xl transition-all duration-300 ${
                isLoading ? "bg-[#666]" : "bg-slate-600"
              } hover:bg-slate-700
      '}
  `}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Sign In
                </span>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-500 text-sm">
              Protected by enterprise-grade security
            </p>
          </div>
        </div>

        {/* Bottom decorative text */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            © 2025 Admin Dashboard. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
