import React from "react";

export default function Sidebar({ setFilter, logout }) {
  return (
    <div
      style={{
        width: "220px",
        backgroundColor: "#4f46e5",
        color: "white",
        padding: "2rem 1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "2rem" }}>TaskMaster</h2>

        <div style={{ marginBottom: "1rem" }}>
          <button onClick={() => setFilter("all")} style={buttonStyle}>
            All Tasks
          </button>
          <button onClick={() => setFilter("completed")} style={buttonStyle}>
            Completed
          </button>
          <button onClick={() => setFilter("pending")} style={buttonStyle}>
            Pending
          </button>
        </div>

        {/* Connect with people box */}
        <div
          style={{
            backgroundColor: "#6366f1",
            padding: "1rem",
            borderRadius: "8px",
            marginTop: "2rem",
          }}
        >
          <h4>Connect with people</h4>
          <img
            src="https://via.placeholder.com/50"
            alt="connect"
            style={{ borderRadius: "50%", marginTop: "0.5rem" }}
          />
          <p style={{ fontSize: "0.85rem", marginTop: "0.3rem" }}>Share your tasks!</p>
        </div>
      </div>

      <button
        onClick={logout}
        style={{
          backgroundColor: "#ef4444",
          border: "none",
          padding: "0.5rem",
          borderRadius: "6px",
          cursor: "pointer",
          color: "white",
          marginTop: "2rem",
        }}
      >
        Logout
      </button>
    </div>
  );
}

const buttonStyle = {
  display: "block",
  width: "100%",
  textAlign: "left",
  padding: "0.5rem",
  marginBottom: "0.5rem",
  border: "none",
  borderRadius: "4px",
  backgroundColor: "#6366f1",
  color: "white",
  cursor: "pointer",
};
