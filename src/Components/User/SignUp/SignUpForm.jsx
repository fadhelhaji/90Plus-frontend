import { useContext, useState } from "react";
import { useNavigate } from "react-router"; // ✅ correct import
import * as authService from "../../../services/authService";
import { UserContext } from "../../Contexts/UserContext";

function SignUpForm() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: "",
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
      alert("Passwords do not match!");
      return;
    }

    try {
      // 1️⃣ Sign up and get user
      const user = await authService.signUp(formData);

      // 2️⃣ Set user in context
      setUser(user);

      // 3️⃣ Navigate after context is set
      navigate("/");
    } catch (error) {
      console.error("Signup failed:", error);
      alert(error.response?.data?.message || "Signup failed");
    }
  }

  const isFormInvalid =
    !formData.username ||
    !formData.password ||
    formData.password !== formData.confirmPassword;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Account</h2>

      <label htmlFor="username">Username</label>
      <input
        id="username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        type="text"
        placeholder="Username"
        required
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        type="password"
        placeholder="Password"
        required
      />

      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        id="confirmPassword"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        type="password"
        placeholder="Confirm Password"
        required
      />

      <button type="submit" disabled={isFormInvalid}>
        Create Account
      </button>

      <button type="button" onClick={() => navigate("/auth/sign-in")}>
        Sign In Instead
      </button>
    </form>
  );
}

export default SignUpForm;