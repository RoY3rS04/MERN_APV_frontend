import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Protected() {
    
    const { auth, loading } = useAuth();

    if (loading) {
        return 'Loading...'
    }

    return (
        <>
            <Header/>
            
            {auth?._id ?
                (
                    <main className="container mx-auto mt-10">
                        <Outlet />
                    </main>
                )
                : <Navigate to='/' />
            }
            
            <Footer/>
        </>
    )
}