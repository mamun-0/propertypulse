"use client";
import { useSession } from "next-auth/react";
import { useState, createContext, useContext, useEffect } from "react";
import unreadMessage from "@/app/actions/unreadMessage";
// Create context
const GlobalContext = createContext();

// create provider
export function GlobalProvider({ children }) {
  const [unreadMessages, setUnreadMessages] = useState(0);
  const { data: session } = useSession();
  useEffect(() => {
    if (session && session.user) {
      unreadMessage().then(({ totalUnreadMessages }) => {
        setUnreadMessages(totalUnreadMessages);
      });
    }
  }, [session]);

  return (
    <GlobalContext.Provider value={{ unreadMessages, setUnreadMessages }}>
      {children}
    </GlobalContext.Provider>
  );
}
export function useGlobalContext() {
  return useContext(GlobalContext);
}
