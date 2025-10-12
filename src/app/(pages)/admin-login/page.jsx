"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { HiEye } from "react-icons/hi"
import { HiEyeSlash } from "react-icons/hi2";



export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleLogin = async () => {
    setIsLoading(true)
    setError("")

    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (res.ok) {
        router.push("/dashboard")
      } else {
        setError("Invalid credentials")
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleLogin()
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50 p-4 relative overflow-hidden">
      {/* Elegant Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Circles */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-teal-200/20 to-teal-400/10 animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-24 h-24 rounded-full bg-gradient-to-br from-slate-300/15 to-slate-500/10 animate-bounce"
          style={{ animationDuration: "3s" }}
        ></div>
        <div
          className="absolute bottom-32 left-20 w-20 h-20 rounded-full bg-gradient-to-br from-teal-300/25 to-emerald-400/15 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        {/* Geometric Shapes */}
        <div
          className="absolute top-60 right-10 w-16 h-16 rotate-45 bg-gradient-to-br from-slate-400/10 to-slate-600/5 animate-spin"
          style={{ animationDuration: "8s" }}
        ></div>
        <div
          className="absolute bottom-20 right-32 w-12 h-12 rotate-12 bg-gradient-to-br from-teal-400/20 to-teal-600/10 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Abstract Lines */}
        <div
          className="absolute top-32 left-1/4 w-1 h-24 bg-gradient-to-b from-teal-300/30 to-transparent animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-40 right-1/4 w-1 h-20 bg-gradient-to-t from-slate-400/20 to-transparent animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
              linear-gradient(rgba(61, 201, 162, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(61, 201, 162, 0.1) 1px, transparent 1px)
            `,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>
      </div>

      <div className="w-full max-w-sm relative z-10">
        {/* Minimal Admin Login Card */}
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg">
          <div className="px-6 py-8">
            {/* Logo Section */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center mb-4">
                <img src="/logo.png" alt="simplyTalk Logo" width={120} height={40} />
              </div>
              <h1 className="text-xl font-bold text-slate-800 mb-1">Admin Portal</h1>
              <p className="text-xs text-slate-500">Sign in to your simplyTalk dashboard</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="xyz@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all duration-300 hover:border-gray-300"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-xs font-medium text-slate-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-10 px-3 pr-10 bg-gray-50 border border-gray-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all duration-300 hover:border-gray-300"
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                    >
                      {showPassword ? <HiEyeSlash className="h-4 w-4" /> : <HiEye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-2">
                  <p className="text-red-600 text-xs text-center">{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full h-10 bg-[#3dc9a2]  text-white text-sm font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.005] hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={isLoading || !email || !password}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign In to Dashboard"
                )}
              </button>
            </form>

            {/* Additional Options */}
            <div className="mt-4 text-center">
              <button className="text-xs text-slate-500 hover:text-teal-600 transition-colors duration-200">
                Forgot your password?
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center">
          <p className="text-xs text-slate-400">© 2025 simplyTalk. Secure admin access.</p>
        </div>
      </div>
    </div>
  )
}
