import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../../Contexts/UserContext";
import * as authService from "../../../services/authService";

function SignUpForm() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return;
    }

    try {
      // 1️⃣ Sign up and get user
      const user = await authService.signUp(formData);

      // 2️⃣ Set user in context
      setUser(user);

      // 3️⃣ Navigate after context is set
      navigate("/home");
    } catch (error) {
      console.log("Signup failed:", error);
    }
  }

  const isFormInvalid =
    !formData.username ||
    !formData.password ||
    formData.password !== formData.confirmPassword;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-md w-full max-w-md flex flex-col gap-4 rounded-3xl"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>

        <label className="flex flex-col">
          Username
          <input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            type="text"
            placeholder="Username"
            required
            className="mt-1 p-2 border border-gray-300 rounded-xl"
          />
        </label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="select select-bordered select-sm h-10 w-full bg-[#f8fafc] border-[#d8dee9] rounded-xl text-xs"
          required
        >
          <option value="">Select Role</option>
          <option value="Coach">Coach</option>
          <option value="Player">Player</option>
        </select>

        <label className="flex flex-col">
          Password
          <input
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            required
            className="mt-1 p-2 border border-gray-300 rounded-xl"
          />
        </label>

        <label className="flex flex-col">
          Confirm Password
          <input
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
            placeholder="Confirm Password"
            required
            className="mt-1 p-2 border border-gray-300 rounded-xl"
          />
        </label>

        <button
          type="submit"
          disabled={isFormInvalid}
          className={`w-full py-2 rounded-lg transition-colors ${isFormInvalid ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"}`}
        >
          Create Account
        </button>

        <button
          type="button"
          onClick={() => navigate("/auth/sign-in")}
          className="w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700 text-white transition-colors"
        >
          Sign In Instead
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
