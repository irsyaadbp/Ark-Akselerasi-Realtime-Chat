import { Link } from "react-router-dom";
import { auth } from "../services/firebase";

export default function Header() {
  return (
    <header>
      <nav className="navbar narvbar-expand-sm fixed-top navbar-light bg-light px-4">
        <Link to="/" className="navbar-brand">
          Chatty
        </Link>
        <div className="justify-content-end">
          {auth().currentUser ? (
            <div className="navbar-brand">
              <button
                className="btn btn-outline-danger"
                onClick={() => auth().signOut()}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="navbar-brand">
              <Link className="nav-item me-3" to="/login">
                Login
              </Link>
              <Link className="nav-item me-3" to="/signup">
                Signup
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
