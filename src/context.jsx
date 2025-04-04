import { createContext, useState } from "react";

export const userContext = createContext();
export const AuthContext = ({ children }) => {
  const [userData, setUserData] = useState({});
  return (
    <userContext.Provider value={{ userData, setUserData }}>
      {children}
    </userContext.Provider>
  );
};

export const postContext = createContext();
export const PostContextProvider = ({children})=>{
  const [post,setPost] = useState('');
  return (
    <postContext.Provider value={{post, setPost}}>
      {children}
    </postContext.Provider>
  )
}