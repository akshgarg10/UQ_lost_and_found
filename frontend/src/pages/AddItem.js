import React from "react";
import NavBar from "../components/NavBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


// const API = "http://localhost:3000/api";
const API = process.env.REACT_APP_API_BASE || "";

const AddItem = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    quantity: 1,
    description: "",
    found_at: "",
    placed_at: "",
    photos: "",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  // const [ok, setOk] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: form.name.trim(),
      quantity: Number(form.quantity),
      description: form.description.trim(),
      found_at: form.found_at.trim(),
      placed_at: form.placed_at.trim(),
      photos: form.photos,
    };

    try {
      setLoading(true);
      const res = await fetch(`${API}/api/createItems`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      // const data = await res.json();
      // setOk(`Created item with id ${data._id || ""}`);
      navigate("/home")
    } catch (error) {
      setErr(String(error.message || error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="mx-auto w-full max-w-xl rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-2xl font-semibold">Add Item</h2>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Item name*
              </label>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                required
                className="w-full rounded border px-3 py-2 outline-none focus:ring focus:ring-blue-200"
                placeholder="e.g., Black Umbrella"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Quantity</label>
              <input
                type="number"
                name="quantity"
                min="1"
                value={form.quantity}
                onChange={onChange}
                className="w-full rounded border px-3 py-2 outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Found at</label>
              <input
                name="found_at"
                value={form.found_at}
                onChange={onChange}
                className="w-full rounded border px-3 py-2 outline-none focus:ring focus:ring-blue-200"
                placeholder="e.g., Central Library"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Placed at
              </label>
              <input
                name="placed_at"
                value={form.placed_at}
                onChange={onChange}
                className="w-full rounded border px-3 py-2 outline-none focus:ring focus:ring-blue-200"
                placeholder=" "
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Description
              </label>
              <textarea
                name="description"
                rows={3}
                value={form.description}
                onChange={onChange}
                className="w-full rounded border px-3 py-2 outline-none focus:ring focus:ring-blue-200"
                placeholder=" "
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Photos
              </label>
              <input
                name="photos"
                value={form.photos}
                onChange={onChange}
                className="w-full rounded border px-3 py-2 outline-none focus:ring focus:ring-blue-200"
                placeholder=" "
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Saving..." : "Create"}
            </button>
          </form>

          {err && <p className="mt-4 text-sm text-red-600">Error: {err}</p>}
        </div>
      </div>
    </>
  );
};

export default AddItem;
