import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside style={styles.sidebar}>
      <div>
        <h2 style={styles.logo}>🛍 Nexus Admin</h2>

        <nav style={styles.nav}>
          <Link to="/admin" style={styles.link}>
            📊 Dashboard
          </Link>

          <Link to="/admin/products" style={styles.link}>
            📦 Products
          </Link>

   

    
        
        </nav>
      </div>

      <button onClick={handleLogout} style={styles.logoutBtn}>
        🚪 Logout
      </button>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: "270px",
    minHeight: "100vh",
    background: "#111827",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "30px 20px",
    boxSizing: "border-box",
    boxShadow: "4px 0 20px rgba(0,0,0,0.2)",
  },

  logo: {
    fontSize: "26px",
    fontWeight: "700",
    marginBottom: "40px",
    color: "#60A5FA",
    textAlign: "center",
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  link: {
    textDecoration: "none",
    color: "#D1D5DB",
    padding: "14px 18px",
    borderRadius: "12px",
    fontWeight: "500",
    transition: "0.3s",
    background: "rgba(255,255,255,0.03)",
  },

  logoutBtn: {
    border: "none",
    background: "#EF4444",
    color: "#fff",
    padding: "14px",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default Sidebar;