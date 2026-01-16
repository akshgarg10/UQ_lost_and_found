import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

// const API = "http://localhost:3000/api"; // your backend
const API = process.env.REACT_APP_API_BASE || "";

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const loadItems = async () => {
    try {
      setLoading(true);
      setErr("");
      const res = await fetch(`${API}/api/reviewItems`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : data.data || []);
    } catch (e) {
      setErr(String(e.message || e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const deleteItem = async (id) => {
    if (!id) return;
    const ok = window.confirm("Delete this item?");
    if (!ok) return;
    try {
      const res = await fetch(`${API}/api/deleteItems/${id}`, { method: "DELETE" });
      setItems((list) => list.filter((it) => it._id !== id));
    } catch (e) {
      alert(`Delete failed : ${e.message || e}`);
    }
  };

  return (
    <>
      <NavBar />
      <h1 className="p-5">Lost items are listed below</h1>

      <div className="min-h-screen p-6 bg-gray-50">
        <div className="mx-auto max-w-3xl">

          {err && <p className="mt-3 text-red-600">Error: {err}</p>}

          <ul className="mt-6 space-y-3">
            {items.map((it) => (
              <li key={it._id} className="rounded border bg-white p-4">
                <div className="font-medium">{it.itemName}</div>
                {it.found_at && (
                  <div className="p-2">
                    <div className="text-sm text-gray-600 p-1">
                      Found at: {it.found_at}
                    </div>
                    <div className="text-sm text-gray-600 p-1">
                      Description: {it.description}
                    </div>
                    <div className="text-sm text-green-600 p-1">
                      Placed at: {it.placed_at}
                    </div>
                    <div className="text-sm text-gray-600 p-1">
                      Date Time of the item seen is : {it.date_time_seen_at}
                    </div>
                    <div className="text-sm text-gray-600 p-1">
                      Quantity is: {it.quantity}
                    </div>
                    <button
                      onClick={() => deleteItem(it._id)}
                      className="rounded bg-red-600 px-3 py-1 mt-2 text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
            {items.length === 0 && !loading && !err && (
              <li className="text-gray-500">No items yet.</li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
