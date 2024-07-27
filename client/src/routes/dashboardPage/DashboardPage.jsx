import Search from "../../components/search/Search";
import "./dashboardPage.css";

const DashboardPage = () => {
  return (
    <section className="dashboard">
      <div className="texts">
        <div className="logo">
          <img src="/logo.png" alt="" />
          <h1>Chat Ai</h1>
        </div>
        <div className="options">
          <div className="option">
            <img src="/chat.png" alt="" />
            <span>Create a New Chat</span>
          </div>
          <div className="option">
            <img src="/image.png" alt="" />
            <span>Analyze Images</span>
          </div>
          <div className="option">
            <img src="/code.png" alt="" />
            <span>Help me with my Code</span>
          </div>
        </div>
      </div>
      <Search />
    </section>
  );
};

export default DashboardPage;
