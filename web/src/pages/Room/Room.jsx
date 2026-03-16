import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import "./room.scss";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

const SOCKET_URL = import.meta.env.VITE_API_URL;
const Room = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username;

  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const chatBoxRef = useRef(null);
  // Scroll auto en bas du chat à chaque nouveau message
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // 🔹 Création du socket au montage
  useEffect(() => {
    if (!username) {
      navigate("/");
      return;
    }

    const newSocket = io( SOCKET_URL, {
      transports: ["websocket"],
    }); // ⚠️ Render URL en prod
    // console.log("Tentative de connexion socket.io", newSocket);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connecté au serveur :", newSocket.id);

      // 🔹 Join dès que socket connecté
      // console.log("Emission join avec :", username);
      // console.log("socket readyState:", newSocket.connected)
      newSocket.emit("join", username);
    });

    newSocket.on("connect_error", (err) => {
      // console.log("Erreur connexion :", err.message);
    });

    newSocket.on("chat-message", (data) => {
      // console.log("chat-message reçu côté client :", data, "username:", data.username, "message:", data.message);
      setMessages((prev) => [...prev, data]);
    });

    newSocket.on("system-message", (data) => {
      setMessages((prev) => [
        ...prev,
        { username: "SYSTEM", message: data.message },
      ]);
    });

    newSocket.on("joined", () => {
      // console.log("Join confirmé côté serveur !");
    });

    return () => {
      newSocket.disconnect();
    };
  }, [username, navigate]);

  const sendMessage = () => {
    // console.log("sendMessage called", { message, socket });
    if (!message || !socket) return;
    socket.emit("send-message", message);
    setMessage("");
  };

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
          <div className="chat-box" ref={chatBoxRef}>
            {messages.map((msg, idx) => (
              <div key={idx} className="chat-message">
                <strong>{msg.username} :</strong> {msg.message}
              </div>
            ))}
          </div>
          <div className="input-row">
            <Input
              placeholder="Ton message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button onClick={sendMessage} disabled={!socket || !message}>Envoyer</Button>
          </div>
        </Card>

      </div>

    </div>
  );
};

export default Room;