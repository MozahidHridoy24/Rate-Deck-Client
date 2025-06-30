import { use, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import loginLottie from "../assets/Lottie/login.json";

const Login = () => {
  const { login, googleLogin } = use(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await login(email, password);
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome back to RateDeck!",
        showConfirmButton: false,
        timer: 1800,
      });
      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid email or password.",
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      Swal.fire({
        icon: "success",
        title: "Google Login Successful!",
        text: "Welcome back to RateDeck!",
        showConfirmButton: false,
        timer: 1800,
      });
      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Authentication Failed",
        text: "Google login was not successful.",
      });
    }
  };

  return (
    <div className="bg-base-200">
      <title>RateDeck | Login</title>
      <div className="w-11/12 mx-auto flex flex-row-reverse justify-center items-center">
        <div className="min-h-screen py-4 flex items-center justify-center bg-base-200">
          <div className="bg-base-100 shadow-md rounded-lg p-8 max-w-md w-[90%] space-y-6 border border-primary">
            <h2 className="text-3xl font-bold text-center text-primary">
              Login Now!
            </h2>
            <p className="text-center text-gray-500">
              Please login to access your RateDeck dashboard and manage
              services.
            </p>

            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered w-full"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input input-bordered w-full"
                />
                {/* Forgot Password link */}
                <div className="text-right">
                  <button
                    className="text-sm text-secondary hover:underline focus:outline-none hover:cursor-pointer"
                    type="button"
                  >
                    Forgot Password?
                  </button>
                </div>
                {/* <div className="text-red-500">{error}</div> */}

                <button className="btn btn-primary w-full">Login</button>
              </div>
            </form>
            <div className="divider">OR</div>

            <button
              onClick={handleGoogleLogin}
              className="btn w-full border border-gray-300 bg-secondary text-white hover:shadow-lg"
            >
              <FcGoogle size={20} className="mr-2" />
              Continue with Google
            </button>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?
              <Link
                to="/register"
                className="text-secondary font-semibold ml-1 hover:underline"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
        <div className="hidden md:block  mb-6">
          <Lottie
            animationData={loginLottie}
            loop
            className="w-[80%] h-[80%]"
          />
        </div>
      </div>
    </div>
  );
};
export default Login;
