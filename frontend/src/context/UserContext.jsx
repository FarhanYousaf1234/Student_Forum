// UserContext.js
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const setUser = (id) => {
    setUserId(id);
  };
  return (
    <UserContext.Provider value={{ userId, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
