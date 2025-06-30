import { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const { register, updateUserProfile, googleLogin } = use(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoURL = form.photoURL.value;

    //  Password Validation
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isValidLength = password.length >= 6;

    if (!isValidLength || !hasUppercase || !hasLowercase) {
      setError(
        "Password must be at least 6 characters long and at least one uppercase letter and at least one lowercase letter."
      );
      return;
    }

    try {
      await register(email, password);
      await updateUserProfile(name, photoURL);
      Swal.fire({
        icon: "success",
        title: "Registered Successfully",
        text: "You can now Explore RateDeck",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message,
      });
    } finally {
      setLoading(false);
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
    <div>
      <title>RateDeck | Register</title>

      <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10">
        <div className="bg-base-100 shadow-xl rounded-xl p-10 max-w-md w-full border border-primary">
          <h2 className="text-3xl font-bold text-center text-primary mb-2">
            Create an Account
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Register to manage services with RateDeck.
          </p>

          <form onSubmit={handleRegister}>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="input input-bordered w-full"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered w-full"
                required
              />
              <input
                type="text"
                name="photoURL"
                placeholder="Photo URL"
                className="input input-bordered w-full"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered w-full"
                required
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button className="btn btn-primary w-full " type="submit">
                Register
              </button>
            </div>
          </form>

          <div className="divider">OR</div>

          <button
            onClick={handleGoogleLogin}
            className="btn w-full border border-gray-300 bg-secondary text-white hover:bg-gray-500"
          >
            <FcGoogle size={20} className="mr-2" />
            Continue with Google
          </button>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-secondary font-semibold hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
