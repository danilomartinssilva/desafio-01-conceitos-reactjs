import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([
    "Projeto 01",
    "Projeto 02",
  ]);
  useEffect(() => {
    api.get("repositories").then((resp) => {
      setRepositories(resp.data);
    });
  }, []);
  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: "Teste",
      links: 0,
      techs: ["php", "nodejs"],
    });
    setRepositories([...repositories, response.data]);
  }
  async function handleRemoveRepository(id) {
    const response = await api.delete("repositories/" + id);
    if (response.status === 204) {
      setRepositories(repositories.filter((item) => item.id !== id));
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((item, index) => {
          return (
            <li key={index}>
              {item.title}
              <button onClick={() => handleRemoveRepository(item.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
