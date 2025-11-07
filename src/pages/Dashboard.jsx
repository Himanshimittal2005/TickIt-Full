import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";

export default function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");
  const [theme, setTheme] = useState("blue");
  const token = localStorage.getItem("token");

  const themes = {
    blue: {
      primary: "#6366f1",
      secondary: "#10b981",
      background: "#f0f4f8",
      completed: "#d1fae5",
      text: "#4b5563",
    },
    pink: {
      primary: "#ec4899",
      secondary: "#f472b6",
      background: "#fff0f6",
      completed: "#ffe4f0",
      text: "#4b5563",
    },
    green: {
      primary: "#22c55e",
      secondary: "#4ade80",
      background: "#f0fdf4",
      completed: "#d1fae5",
      text: "#4b5563",
    },
    dark: {
      primary: "#1f2937",
      secondary: "#4b5563",
      background: "#111827",
      completed: "#374151",
      text: "#f9fafb",
    },
  };

  const navigate = () => (window.location.href = "/login");

  // Fetch todos from backend
  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/todos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(res.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) navigate();
    }
  };

  useEffect(() => {
    if (!token) navigate();
    else fetchTodos();
  }, []);

  // Add new todo
  const addTodo = async () => {
    if (!text) return;
    try {
      const res = await axios.post(
        "http://localhost:5000/api/todos",
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos([res.data, ...todos]);
      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle complete
  const toggleComplete = async (id, completed) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/todos/${id}`,
        { completed: !completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos(todos.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error(err);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(todos.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // Filtered todos
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  // Task progress
  const completedCount = todos.filter((t) => t.completed).length;
  const progressPercent = todos.length ? (completedCount / todos.length) * 100 : 0;

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial, sans-serif" }}>
      {/* Sidebar */}
      <Sidebar setFilter={setFilter} logout={logout} theme={theme} />

      {/* Main content */}
      <div style={{ flex: 1, padding: "2rem", backgroundColor: themes[theme].background, overflowY: "auto" }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: themes[theme].text }}>My Tasks</h1>

            {/* Date and Theme Switcher */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ fontSize: "1rem", color: themes[theme].text }}>
                {new Date().toLocaleDateString()} ({new Date().toLocaleString("en-US", { weekday: "long" })})
              </div>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                style={{
                  marginLeft: "1rem",
                  padding: "0.3rem",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  cursor: "pointer",
                }}
              >
                <option value="" disabled>
                  Change Theme
                </option>
                <option value="blue">Blue</option>
                <option value="pink">Pink</option>
                <option value="green">Green</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ marginBottom: "1rem" }}>
            <div style={{ height: "12px", background: "#e5e7eb", borderRadius: "6px" }}>
              <div
                style={{
                  width: `${progressPercent}%`,
                  height: "12px",
                  background: themes[theme].secondary,
                  borderRadius: "6px",
                  transition: "width 0.3s",
                }}
              />
            </div>
            <p style={{ marginTop: "0.3rem", fontSize: "0.9rem", color: themes[theme].text }}>
              {completedCount}/{todos.length} completed
            </p>
          </div>

          {/* Add task */}
          <div style={{ display: "flex", marginBottom: "1rem" }}>
            <input
              type="text"
              placeholder="Add new task"
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{
                flex: 1,
                padding: "0.5rem",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
              }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={addTodo}
              style={{
                marginLeft: "0.5rem",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                backgroundColor: themes[theme].primary,
                color: "white",
                border: "none",
              }}
            >
              Add
            </motion.button>
          </div>

          {/* Task list */}
          {filteredTodos.map((todo) => (
            <motion.div
              key={todo._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: todo.completed ? themes[theme].completed : "#ffffff",
                padding: "0.75rem 1rem",
                borderRadius: "8px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                marginBottom: "0.5rem",
              }}
            >
              <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                {todo.text} ({new Date(todo.createdAt).toLocaleDateString()})
              </span>
              <div>
                <button
                  onClick={() => toggleComplete(todo._id, todo.completed)}
                  style={{
                    marginRight: "0.5rem",
                    padding: "0.3rem 0.6rem",
                    borderRadius: "4px",
                    border: "none",
                    backgroundColor: themes[theme].secondary,
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  ✓
                </button>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  style={{
                    padding: "0.3rem 0.6rem",
                    borderRadius: "4px",
                    border: "none",
                    backgroundColor: "#ef4444",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  🗑
                </button>
              </div>
            </motion.div>
          ))}

          {/* Connect with people box */}
          <div
            style={{
              position: "fixed",
              bottom: "1rem",
              right: "1rem",
              backgroundColor: "#ffffff",
              padding: "1rem",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaUserCircle size={40} color={themes[theme].primary} />
            <div style={{ marginLeft: "0.5rem" }}>
              <p style={{ margin: 0, fontWeight: "bold" }}>Connect with People</p>
              <p style={{ margin: 0, fontSize: "0.8rem", color: "#6b7280" }}>Collaborate and share tasks</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
