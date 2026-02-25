import { createContext, useContext, useState } from "react";

const Mycontext = createContext();

const Provider = ({ children }) => {
  const [Name, ValueName] = useState("all communties");
  const [AddedValue, SetValueadd] = useState([]);
  let data = {
    Name,
    ValueName,
    AddedValue,
    SetValueadd,
  };
  return (
    <>
      <Mycontext.Provider value={data}>{children}</Mycontext.Provider>
    </>
  );
};
const useAppContext = () => useContext(Mycontext);
export { useAppContext, Provider };
