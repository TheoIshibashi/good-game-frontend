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
        if (!searchGame.trim()) return; // Se o input estiver vazio, mata a função aqui

        setLoading(true); // Ativa o sinal de "carregando"
        setError(null);    // Limpa erros de buscas anteriores
        setGame(null);     // Limpa o jogo anterior da tela

        try {
          const response = await fetch(`http://localhost:8000/api/games?name=${searchGame}`);
          if (!response.ok) {
            throw new Error("Erro ao buscar o jogo.");
          }
          const data = await response.json();
          setGame(data); // Atualiza o estado com os dados do jogo
        } catch (err: any) {
          setError(err.message); // Atualiza o estado de erro
        } finally {
          setLoading(false); // Desativa o sinal de "carregando"
        }
      };
      
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
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="game-card">
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
    </div>
  )
}

export default App