import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Header() {

    const { logOut } = useAuth();

    return (
        <header className="py-10 bg-indigo-600">
            <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
                <h1 className="font-bold text-2xl text-center text-indigo-200">
                    VPM - Veterinary Patient {''}
                    <span className="text-white font-black">Manager</span>
                </h1>
                <nav className="flex flex-col items-center lg:flex-row mt-5 lg:mt-0 gap-4">
                    <Link className="text-white text-sm uppercase font-bold" to='/admin'>
                        Patients
                    </Link>
                    <Link className="text-white text-sm uppercase font-bold" to='/admin/profile'>
                        Profile
                    </Link>
                    
                    <button type="button" className="text-white text-sm uppercase font-bold" onClick={logOut}>
                        Log Out
                    </button>
                </nav>
            </div>
        </header>
    )
}