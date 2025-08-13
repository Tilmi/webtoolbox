"use client";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

const companyImages = [
  "https://admin-web.pupuk-kujang.co.id/proxy-file?source=produksi/profil_unit_produksi/file-2OyZc1729838631.jpg",
  "https://admin-web.pupuk-kujang.co.id/proxy-file?source=corporate-info/profil_singkat/file-n3abh1738569823.jpg",
  "https://www.pupuk-kujang.co.id/_next/image?url=https%3A%2F%2Fadmin-web.pupuk-kujang.co.id%2Fproxy-file%3Fsource%3Dnews%2Fthumbnail-nJZZA1723902969.jpg&w=3840&q=75",
  "https://www.pupuk-kujang.co.id/_next/image?url=https%3A%2F%2Fadmin-web.pupuk-kujang.co.id%2Fproxy-file%3Fsource%3Dnews%2Fthumbnail-X14mY1723903257.jpg&w=3840&q=75",
];

// Logo perusahaan PT Pupuk Kujang - ganti dengan path logo Anda
const companyLogo = "/kujang.svg";
export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  // Auto-rotate images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === companyImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = () => {
    if (validateForm()) {
      // Redirect ke dashboard page
      router.push("/dashboard");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail("");
    setPassword("");
    setErrors({ email: "", password: "" });
  };

  // Login form - show login page
  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side - Image carousel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 z-10" />

        {companyImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`PT Pupuk Kujang ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-4">
              PT Pupuk Kujang Cikampek
            </h1>
            <p className="text-xl mb-2">
              Leading Fertilizer Company in Indonesia
            </p>
            <p className="text-lg opacity-90">
              Innovating agriculture for a better future
            </p>
          </div>

          {/* Image indicators */}
          <div className="flex space-x-2 mt-6">
            {companyImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentImageIndex
                    ? "bg-white"
                    : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 shadow-md bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center">
                {/* Ganti src dengan path logo Anda */}
                <img
                  src={companyLogo}
                  alt="PT Pupuk Kujang Logo"
                  className="w-full h-full object-cover rounded-full"
                />
                {/* Fallback jika tidak ada logo */}
                {/* <span className="text-white font-bold text-xl">PK</span> */}
              </div>
            </div>
            <h2 className="text-3xl font-bold text-black mb-2">
              Welcome Back!
            </h2>
            <p className="text-muted-foreground">Sign in to your account</p>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                className={`w-full h-12 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  className={`w-full h-12 px-3 pr-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRememberMe(e.target.checked)
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  Remember me
                </label>
              </div>
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-500 font-medium"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="button"
              onClick={handleLogin}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Sign In
            </button>
          </div>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <button className="font-medium text-blue-600 hover:text-blue-500">
              Contact Administrator
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
