import { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../component/Loading";
import { signUp } from "../helpers/auth";

export default function Signup({ history }) {
  const [dataSubmit, setDataSubmit] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDataSubmit((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      setError(null);

      await signUp(dataSubmit);
      history.push("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form className="mt-5 py-5 px-5" onSubmit={handleSubmit}>
        <h1>
          Sign Up to <Link to="/">Chatty</Link>
        </h1>
        <p className="lead">Fill in the form below to create an account</p>
        <div className="form-group">
          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="ex: irsyaad@email.com"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            className="form-control"
          />
        </div>
        <div className="form-group">
          {error && <p className="text-danger">{error}</p>}
          {loading ? (
            <Loading />
          ) : (
            <button type="submit" className="btn btn-primary px-5">
              Sign Up
            </button>
          )}
        </div>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
