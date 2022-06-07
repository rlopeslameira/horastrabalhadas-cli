import React, { useEffect, useReducer, createContext, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({usuario: {}});

const usuarioReducer = (state = {}, action) => {
    switch (action.type) {
        case "LOGGIN":
            AsyncStorage.setItem('usuario', JSON.stringify(state));
            return state;
        case "LOGOUT":
            AsyncStorage.removeItem('usuario');
            return null;
        default:
            return state;

    }
}
    
const usuarioInicial = async () => { 
    return await AsyncStorage.getItem('usuario') ? JSON.parse(await AsyncStorage.getItem('usuario')) : null ;
};


export const AuthProvider = ({children}) => {

    const [usuario, dispatch] = useReducer(usuarioReducer, {}, usuarioInicial);

    useEffect(() => {
        AsyncStorage.setItem('usuario', JSON.stringify(usuario));
    }, [usuario])
    
    return (
        <AuthContext.Provider value={{usuario, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)