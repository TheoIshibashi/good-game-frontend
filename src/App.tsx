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
    <div>
      <h1>Gaming HUB</h1>
    </div>
  )
}

export default App