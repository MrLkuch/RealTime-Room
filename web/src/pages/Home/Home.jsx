import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.scss";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

function Home() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    if (!username) return;
    navigate("/room", { state: { username } });
  };

  return (
    <div className="home">

      <header className="hero">
        <div className="status">
          <span className="dot"></span>
          déconnecté
        </div>

        <span className="overline">Musicbox</span>
        <h1>
          Le coworking social en <br />
          <span>musique.</span>
        </h1>
        <p className="subtitle">Moins d’isolement, plus d’élan.</p>
      </header>

      <div className="home-grid">

        <Card>
          <span className="label">Accès Musicbox</span>
          <h2>Rejoins ta session en quelques secondes.</h2>
          <p>
            Avant d’entrer, choisis simplement un pseudo.
            Ensuite, tu peux lancer ton salon ou rejoindre une room existante.
          </p>
          <div className="tags">
            <span>Sans compte</span>
            <span>Temps réel</span>
            <span>Playlist partagée</span>
            <span>Connexion instantanée</span>
          </div>
        </Card>

        <Card className="visual-card">
          <div className="vinyl"></div>
          <div className="vinyl second"></div>
        </Card>

      </div>

      <div className="floating-entry">
        <span className="label">Entrée</span>
        <h3>Choisis ton pseudo pour continuer.</h3>

        <div className="input-row">
          <Input placeholder="ex: Aurora"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          
          <Button onClick={handleJoin} >Continuer</Button>
        </div>
      </div>

        <footer>
            © 2026 Musicbox. Site by <a href="#">createur-design.fr</a>.
        </footer>
    </div>
  );
};

export default Home;
