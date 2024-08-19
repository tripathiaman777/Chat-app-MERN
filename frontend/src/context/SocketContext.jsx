import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";
const SocketContext = createContext();
export const useSocketContext = () => useContext(SocketContext);
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(false);
  const { authUser } = useAuthContext();
  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:8000/", {
        query: {
          userId: authUser._id,
        },
      });

      setSocket(socket);
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
