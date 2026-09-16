import { useState } from "react";
import { updateStudent } from "../api";

function UpdateStudent() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    age: "",
    email: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: Number(formData.id),
      name: formData.name,
      age: Number(formData.age),
      email: formData.email,
      phoneNumber: formData.phoneNumber,
    };

    await updateStudent(payload);
    alert("Updated successfully");
  };

  return (
    <section className="panel">
      <h2>4. Update a student</h2>

      <form onSubmit={handleSubmit}>
        <input name="id" onChange={handleChange} placeholder="ID" />
        <input name="name" onChange={handleChange} placeholder="Name" />
        <input name="age" onChange={handleChange} placeholder="Age" />
        <input name="email" onChange={handleChange} placeholder="Email" />
        <input name="phoneNumber" onChange={handleChange} placeholder="Phone" />

        <button type="submit">Update</button>
      </form>
    </section>
  );
}

export default UpdateStudent;