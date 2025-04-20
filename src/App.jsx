import React, { useState } from "react";
import './App.css';  // Custom styles

function App() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);  // To keep track of generated images

  const handleGenerate = async () => {
    if (!prompt) return;  // Don't generate if prompt is empty
    setLoading(true);
    const res = await fetch("http://127.0.0.1:8000/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setImageUrl(data.image_url);  // Assuming the backend sends URL or base64
    setHistory([...history, data.image_url]);  // Add new result to history
    setLoading(false);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>ImAgIne</h1>
        <p>Generate AI-powered images based on your prompts</p>
      </header>

      <main className="main-content">
        <div className="input-section">
          <label htmlFor="prompt-input">Enter your prompt:</label>
          <input
            id="prompt-input"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A futuristic city at night"
          />
          <button onClick={handleGenerate} disabled={loading}>
            {loading ? "Generating..." : "Generate Image"}
          </button>
        </div>

        {loading && <div className="loading-spinner">Loading...</div>}  {/* Show a spinner */}

        {imageUrl && (
          <div className="output-section">
            <h2>Generated Image</h2>
            <img src={imageUrl} alt="Generated" className="generated-image" />
          </div>
        )}

        {/* Display history of generated images */}
        <div className="history-section">
          <h3>History</h3>
          <div className="history-images">
            {history.map((url, index) => (
              <img key={index} src={url} alt={`History Image ${index}`} className="history-image" />
            ))}
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>Developed by Codegez - HACKHAZARDS '25</p>
      </footer>
    </div>
  );
}

export default App;
