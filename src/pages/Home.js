import { Link } from "react-router-dom";
import Header from "../component/Header";

export default function Home() {
  return (
    <div className="home">
      <Header />
      <section className="py-5 text-center container">
        <div className="jumbotron jumbotron-fluid py-5">
          <h1 className="display-4">Welcome to Chatty</h1>
          <p className="lead">
            A great place to share your though with friends
          </p>
          <div className="mt-4">
            <Link className="btn btn-primary px-5 me-3" to="/signup">
              Create New Account
            </Link>
            <Link className="btn px-5" to="/login">
              Login to Your Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
