import { useEffect, useRef, useState } from "react";
import Header from "../component/Header";
import Loading from "../component/Loading";
import { auth, db } from "../services/firebase";

export default function Chat() {
  const [user, setUser] = useState(auth().currentUser);
  const [dataChats, setDataChats] = useState([]);
  const [error, setError] = useState();
  const [loadingGet, setLoadingGet] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const [message, setMessage] = useState("");

  const chatArea = useRef();

  const getData = () => {
    try {
      setError(null);
      db.ref("chats").on("value", (snapshot) => {
        let chats = [];

        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });

        chats.sort((a, b) => {
          return a.timestamp - b.timestamp;
        });
        setDataChats(chats);
        setLoadingGet(false);
        chatArea.current.scrollBy(0, chatArea.current.scrollHeight);
      });
    } catch (err) {
      setError(err.message);
      setLoadingGet(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (event) => {
    const { value } = event.target;
    setMessage(value);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (!message) {
        return setError("Message can't be empty");
      }

      setError(null);
      setLoadingSubmit(true);
      await db.ref("chats").push({
        message,
        timestamp: Date.now(),
        uid: user.uid,
        email: user.email,
      });
      setMessage("");
      chatArea.current.scrollBy(0, chatArea.current.scrollHeight);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingSubmit(false);
    }
  };

  const formatTime = (timestamp) => {
    const dataDate = new Date(timestamp);
    const date = dataDate.getDate();
    const month = dataDate.getMonth() + 1;
    const year = dataDate.getFullYear();
    const time = `${dataDate.getHours()}:${dataDate.getMinutes()}`;

    return `${date}/${month}/${year} ${time}`;
  };
  return (
    <div>
      <Header />
      <div className="chat-area" ref={chatArea}>
        {loadingGet && <Loading />}
        {dataChats.map((chat) => (
          <p
            key={chat.timestamp}
            className={
              "chat-bubble " + (user.uid === chat.uid ? "current-user" : "")
            }
          >
            <b>{chat.email}</b>
            <br />
            {chat.message}
            <br />
            <span className="chat-time">{formatTime(chat.timestamp)}</span>
          </p>
        ))}
      </div>
      <form className="mx-3" onSubmit={handleSubmit}>
        <textarea
          name="message"
          className="form-control"
          onChange={handleChange}
          value={message}
        />
        {error && <p className="text-danger">{error}</p>}
        {loadingSubmit ? (
          <Loading />
        ) : (
          <button className="btn btn-submit px-5 mt-4">Submit</button>
        )}
      </form>
      <div className="py-5 mx-3">
        Login in as: <strong>{user.email}</strong>
      </div>
    </div>
  );
}
