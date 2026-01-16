import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_BASE || "";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [err, setErr]           = useState("");
  const [ok, setOk]             = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(""); setOk("");

    if (!userName.trim() || !password) {
      setErr("userName and password required");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API}/api/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);

      setOk("Account created");
      // after signup, send them to login
      navigate("/");
    } catch (e) {
      setErr(e.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto w-full max-w-sm rounded-lg bg-white p-6 shadow">
        <h1 className="mb-6 text-center text-2xl font-semibold">Sign up</h1>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Username</label>
            <input
              className="w-full rounded border px-3 py-2 outline-none focus:ring focus:ring-blue-200"
              name="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="username"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Password</label>
            <input
              className="w-full rounded border px-3 py-2 outline-none focus:ring focus:ring-blue-200"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create account"}
          </button>

          <button
            type="button"
            className="ml-auto block px-2 py-1 font-mono font-semibold text-blue-500"
            onClick={() => navigate("/")}
          >
            Already have an account? Log in
          </button>
        </form>

        {err && <p className="mt-4 text-sm text-red-600">Error: {err}</p>}
        {ok && <p className="mt-4 text-sm text-green-700">{ok}</p>}
      </div>
    </div>
  );
}
