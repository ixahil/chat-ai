import { Link } from "react-router-dom";
import "./homePage.css";

const HomePage = () => {
  return (
    <section className="home">
      <img src="/orbital.png" alt="" className="orbital" />
      <div className="left">
        <h1>Chat Ai</h1>
        <h2>Supercharge your creativity and productivity</h2>
        <h3>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet
          temporibus autem unde cupiditate aspernatur aliquam est, labore
        </h3>
        <Link to={"/dashboard"}>Get Started</Link>
      </div>
      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
          <img src="/bot.png" alt="" className="bot" />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
