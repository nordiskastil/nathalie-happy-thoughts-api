import React, { useEffect, useState } from "react";
import https://nathalie-happy-thoughts-api.onrender.com

export const App = () => {
  const [thoughts, setThoughts] = useState([]);
  const [newThought, setNewThought] = useState("");
  const [error, setError] = useState("");
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    fetch("https://happy-thoughts-api-4ful.onrender.com/thoughts")
      .then((res) => res.json())
      .then(setThoughts);
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (newThought.length < 5 || newThought.length > 140) {
      setError("Message must be between 5 and 140 characters.");
      return;
    }

    // Trigger heart burst animation
    const heartId = Date.now(); // unique ID
    setHearts((prev) => [...prev, heartId]);

    // Remove heart burst after 2s
    setTimeout(() => {
      setHearts((prev) => prev.filter((id) => id !== heartId));
    }, 2000);


    fetch("https://happy-thoughts-api-4ful.onrender.com/thoughts", {
      method: "POST",
      body: JSON.stringify({ message: newThought }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((createdThought) => {
        setThoughts((prev) => [createdThought, ...prev]);
        setNewThought("");
        setError("");
      });
  };

  const handleLike = (id) => {
    fetch(`https://happy-thoughts-api-4ful.onrender.com/thoughts/${id}/like`, {
      method: "POST",
    }).then(() => {
      setThoughts((prev) =>
        prev.map((thought) =>
          thought._id === id
            ? { ...thought, hearts: thought.hearts + 1 }
            : thought
        )
      );
    });
  };

  return (
    <div className="app-container">
      <form className="thought-form" onSubmit={handleFormSubmit}>
        <label htmlFor="message">What’s making you happy right now?</label>
        <textarea
          id="message"
          value={newThought}
          onChange={(e) => setNewThought(e.target.value)}
          rows="3"
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">❤️ Send Happy Thought ❤️</button>
      </form>

      <div className="heart-container">
        {hearts.map((id) => (
          <span key={id} className="heart-float">❤️</span>
        ))}
      </div>

      <section className="thoughts-list">
        {thoughts.map((thought) => (
          <ThoughtCard key={thought._id} thought={thought} onLike={handleLike} />
        ))}
      </section>
    </div>
  );
};