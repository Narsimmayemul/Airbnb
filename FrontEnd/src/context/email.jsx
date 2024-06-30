import { createContext, useState } from "react";

export const emailContext = createContext();

export const EmailContextProvider = ({children})=>{
const [userMail , setUserMail] = useState(null);

return (
    <emailContext.Provider value={{userMail , setUserMail}}>
        {children}
    </emailContext.Provider>
    )

}