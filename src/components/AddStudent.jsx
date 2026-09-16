import { useState, useEffect } from "react";
import { addStudent } from "../api";

const initialFormState = {
  name: "",
  age: "",
  email: "",
  phoneNumber: "",
};

function AddStudent() {
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = formData.name.trim();
    const age = formData.age.trim();
    const email = formData.email.trim();
    const phoneNumber = formData.phoneNumber.trim();

    if (!name || !age || !email || !phoneNumber) {
      setFeedback("All fields are required.");
      setIsError(true);
      return;
    }

    if (!/^\d+$/.test(age) || Number(age) <= 0) {
      setFeedback("Age must be a positive number.");
      setIsError(true);
      return;
    }

    if (!email.includes("@")) {
      setFeedback("Email must contain @.");
      setIsError(true);
      return;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      setFeedback("Phone number must be exactly 10 digits.");
      setIsError(true);
      return;
    }

    setLoading(true);
    setFeedback("");
    setIsError(false);

    try {
      const payload = {
        name,
        age: Number(age),
        email,
        phoneNumber,
      };

      await addStudent(payload);
      setFeedback("Student added successfully.");
      setFormData(initialFormState);
    } catch (err) {
      setFeedback(err.message || "Failed to add student.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="panel">
      <h2>3. Add a student</h2>

      <form className="stack-form" onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
        <input name="age" value={formData.age} onChange={handleChange} placeholder="Age" />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone number" />

        <button type="submit">{loading ? "Saving..." : "POST"}</button>
      </form>

      {feedback && <p className={isError ? "error-text" : "success-text"}>{feedback}</p>}
    </section>
  );
}

export default AddStudent;