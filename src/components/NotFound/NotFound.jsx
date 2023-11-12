import { Link } from "react-router-dom";
import styled from "./styled.module.css";

const NotFound = () => {
  return (
    <section className={styled.notFound}>
      <div className={styled.wrapper}>
        <div className={styled.image}>
          <img
            src="https://res.cloudinary.com/dzzfmvtiu/image/upload/v1670326080/movie-ticketbooking/page-not-found_zkirlp.svg"
            alt="PageNotFound"
          />
        </div>
        <div className={styled.text}>
          <h2>We can't find that page</h2>
          <p>
            We're fairly sure that page used to be here, but seems to have gone
            missing. We do apologise on it's behalf.
          </p>
          <Link to="/admin">
            <button>Home</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
