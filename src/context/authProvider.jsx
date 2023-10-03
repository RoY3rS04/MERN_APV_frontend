import { useState, useEffect, createContext } from "react";
import axiosClient from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const authenticateUser = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setLoading(false);
                return;
            }

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await axiosClient('/vets/profile', config);

                setAuth(data);
            } catch (error) {
                console.log(error.response.data.msg);

                setAuth({})
            }

            setLoading(false);
        }

        authenticateUser();

    }, []);

    function logOut() {
        localStorage.removeItem('token');

        setAuth({});
    }

    async function updateProfile(vetData) {
        const token = localStorage.getItem('token');

        if (!token) {
            setLoading(false);
            return;
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        
        try {
            const url = `/vets/profile/${vetData._id}`;

            const { data } = await axiosClient.put(url, vetData, config)

            return {
                message: 'Profile updated successfully'
            }
        } catch (error) {
            return {
                message: error.response.data.msg,
                error: true
            }
        }

    }

    async function updatePassword(vetData) {
        const token = localStorage.getItem('token');

        if (!token) {
            setLoading(false);
            return;
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/vets/update-password`;

            const { data } = await axiosClient.put(url, vetData, config);

            return {
                message: data.msg
            }
        } catch (error) {
            return {
                message: error.response.data.msg,
                error: true
            }  
        }
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                loading,
                logOut,
                updateProfile,
                updatePassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
};

export default AuthContext;