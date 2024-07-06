import styles from "./index.module.css";
import sqlLogo from "./assets/sql-logo.png";

import { useState } from "react";

function App() {
  const [queryDescription, setQueryDescription] = useState("");
  const [sqlQuery, setsqlQuery] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    const generatedQuery = await generateQuery();
    setsqlQuery(generatedQuery);
    console.log(generatedQuery);
  };

  const generateQuery = async () => {
    const respone = await fetch("http://localhost:3005/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ queryDescription: queryDescription }),
    });

    const data = await respone.json();
    return data.respone.trim();
  };

  return (
    <main className={styles.main}>
      <img src={sqlLogo} alt="" className={styles.icon} />
      <h3>Generate SQL with AI</h3>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="query-description"
          placeholder="Describe your query"
          onChange={(e) => setQueryDescription(e.target.value)}
        />
        <input type="submit" value="Generate query" />
        <pre>{sqlQuery}</pre>
      </form>
    </main>
  );
}

export default App;
