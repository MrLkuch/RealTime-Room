import "./room.scss";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

const Room = () => {
  return (
    <div className="room">

      <div className="room-grid">

        <Card>
          <div className="card-header">
            <div>
              <h2>Scène YouTube</h2>
              <p>Partage un lien pour synchroniser l’écoute.</p>
            </div>
            <Button variant="soft">Synchroniser</Button>
          </div>

          <div className="video-placeholder">
            Colle un lien YouTube pour lancer la musique en live.
          </div>

          <div className="input-row">
            <Input placeholder="https://youtu.be/..." />
            <Button>Partager</Button>
          </div>

        </Card>

        <Card>
          <h2>Chat live</h2>

          <div className="chat-box"></div>

          <div className="input-row">
            <Input placeholder="Ton message..." />
            <Button>Envoyer</Button>
          </div>
        </Card>

      </div>

    </div>
  );
};

export default Room;
