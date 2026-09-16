import { useState, useEffect } from "react";
import { getAllStudents } from "../api";

function GetAllStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllStudents()
      .then((data) => setStudents(data))
      .catch((error) => setError(error.message));
  }, []);

  const handleGetAll = () => {
    setLoading(true);
    setError("");
    getAllStudents()
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <section className="panel full-width">
      <h2>1. Get all students</h2>

      {error && <p className="error-text">{error}</p>}

      <button onClick={handleGetAll}>
        {loading ? "Loading..." : "GET ALL"}
      </button>

      {students.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.age}</td>
                <td>{s.email}</td>
                <td>{s.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default GetAllStudents;