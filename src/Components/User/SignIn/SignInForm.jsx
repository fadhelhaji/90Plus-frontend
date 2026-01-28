import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../../Contexts/UserContext";
import { signIn } from "../../../services/authService";

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (evt) => {
    setMessage("");
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const signedInUser = await signIn(formData);
      setUser(signedInUser);
      navigate("/home");
    } catch (error) {
      setMessage("Invalid username or password.");
    }
  };

  const isFormInvalid = !formData.username || !formData.password;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="bg-white p-6 shadow-md w-full max-w-md flex flex-col gap-4 rounded-3xl"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>

        {message && <p className="text-red-500 text-center">{message}</p>}

        <label className="flex flex-col">
          Username
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
            className="mt-1 p-2 border border-gray-300 rounded-xl"
          />
        </label>

        <label className="flex flex-col">
          Password
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="mt-1 p-2 border border-gray-300 rounded-xl"
          />
        </label>

        <button
          type="submit"
          disabled={isFormInvalid}
          className={`w-full py-2 rounded-lg transition-colors ${
            isFormInvalid
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          Sign In
        </button>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700 text-white transition-colors"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
