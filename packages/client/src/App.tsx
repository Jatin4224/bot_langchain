import { useState } from "react";
import { motion } from "framer-motion";

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResponse("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error("Failed to fetch response");

      const data = await res.json();
      setResponse(data.message);
    } catch (err) {
      setError("Something went wrong. Try again!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6 relative">
      {/* Gradient background for orange glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1a0f00] to-[#ff6600]/20" />

      {/* Navbar */}
      <header className="w-full flex justify-between items-center py-4 px-6 relative z-10">
        <h1 className="text-2xl font-extrabold text-orange-500">Jarvis</h1>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow-md font-semibold">
          Login
        </button>
      </header>

      {/* Title */}
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold text-center mt-10 mb-4 text-white relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Ask Jarvis anything
      </motion.h2>
      <motion.p
        className="text-lg text-orange-400 text-center mb-8 max-w-2xl relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      ></motion.p>

      {/* Chat Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-lg flex flex-col gap-4 relative z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <textarea
          className="w-full p-4 rounded-lg bg-black bg-opacity-70 border border-orange-500 text-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
          rows={3}
          placeholder="Type your command..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <motion.button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 disabled:bg-gray-700 shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? "Processing..." : "Execute"}
        </motion.button>
      </motion.form>

      {/* Response Section */}
      <motion.div
        className="mt-6 w-full max-w-lg relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: response || error ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {error && (
          <p className="text-red-400 font-semibold bg-black bg-opacity-50 p-3 rounded-lg border border-red-600">
            {error}
          </p>
        )}
        {response && (
          <motion.div
            className="p-4 bg-black bg-opacity-70 rounded-lg border border-orange-500 shadow-md"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-bold text-orange-400">Jarvis Response:</h2>
            <p className="mt-2 text-orange-200 whitespace-pre-wrap leading-relaxed">
              {response}
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default App;
