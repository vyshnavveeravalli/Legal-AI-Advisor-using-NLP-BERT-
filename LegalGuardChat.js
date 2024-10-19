import React, { useState } from 'react';

const LegalGuardChat = () => {
  // State for handling the user input and response
  const [userInput, setUserInput] = useState("");
  const [chatResponse, setChatResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle user input
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  // Submit the query to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInput.trim() === "") return;

    setLoading(true);
    setChatResponse(null);

    try {
      // Make the API call to the backend
      const response = await fetch("/api/legal-query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: userInput }),
      });

      const data = await response.json();
      setChatResponse(data.response);
    } catch (error) {
      setChatResponse("Error fetching response. Please try again.");
    }

    setLoading(false);
    setUserInput(""); // Clear the input field
  };

  return (
    <div className="chat-container">
      <h2>Legal Guard Chatbot</h2>

      {/* Input Form */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="query">Enter your legal query:</label>
        <textarea
          id="query"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Type your legal question or situation here..."
          required
        />
        <button type="submit">Submit</button>
      </form>

      {/* Display Response */}
      <div className="response-section">
        {loading ? <p>Loading...</p> : chatResponse && (
          <div className="chat-response">
            <strong>Chatbot:</strong> <p>{chatResponse}</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .chat-container {
          max-width: 600px;
          margin: 50px auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
        }
        form {
          display: flex;
          flex-direction: column;
        }
        textarea {
          height: 100px;
          margin-bottom: 10px;
          padding: 10px;
          font-size: 16px;
        }
        button {
          padding: 10px;
          background-color: #4caf50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .response-section {
          margin-top: 20px;
        }
        .chat-response {
          padding: 10px;
          background-color: #f4f4f4;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default LegalGuardChat;
