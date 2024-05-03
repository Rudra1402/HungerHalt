import { useState, useEffect } from "react";
import AppContext from "./AppContext";

const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (!user) {
            let userItem = localStorage.getItem('user')
            userItem = JSON.parse(userItem)
            setUser(userItem)
        }
    }, [])

    return (
        <AppContext.Provider value={{ user, setUser, cart, setCart }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider