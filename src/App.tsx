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

  const handleSearch = async () => {
    if (!searchGame.trim()) return;

    setLoading(true);
    setError(null);
    setGame(null);

    try {
      const response = await fetch(`http://localhost:8000/api/games?name=${searchGame}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail);
      }

      const data = await response.json();
      setGame(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <nav>
        <span>GG</span>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Notícias</a></li>
            <li><a href="#">Guias</a></li>
            <li><a href="#">Perfil</a></li>
            <li><a href="#">Sobre</a></li>
          </ul>
      </nav>

      <main>
        <h1>Gaming HUB</h1>
        
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for a game..."
            value={searchGame}
            onChange={(e) => setSearchGame(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="game-card">
          {loading && (
            <p>Loading...</p>
          )}

          {error && (
            <p className="error">An error occurred: {error}</p>
          )}

          {game && (
            <div>
              <h2>{game.title}</h2>
              {game.image && <img src={game.image} alt={game.title} />}
              <p>
                <strong>Price:</strong> {game.usd_price ? `$${game.usd_price.toFixed(2)}` : 'N/A'}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
      
      

export default App;