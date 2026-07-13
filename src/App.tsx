import { useState } from 'react';
import './App.css'


interface GameData {
  title: string;
  usd_price: number | null;
  image: string | null;
}

function App() {
  const [searchGame, setSearchGame] = useState<string>("");
  const [game, setGame] = useState<GameData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  return (
    <div className="App">
      <h1>Gaming HUB</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a game..."
          value={searchGame}
          onChange={(e) => setSearchGame(e.target.value)}
        />
        <button onClick={() => {}}>Search</button>
      </div>
    </div>
  )
}

export default App