import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import Alert from "../components/Alert";
import axiosClient from "../config/axios";

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({});
    const navigate = useNavigate();
    const { setAuth } = useAuth();

    const { message } = alert;

    async function handleSubmit(e) {
        e.preventDefault();

        if([email, password].includes('')) {
            setAlert({
                message: 'All fields are required',
                error: true
            })

            return;
        }

        try {
            const { data } = await axiosClient.post('/vets/login', {
                email,
                password
            });

            localStorage.setItem('token', data.token);
            setAuth(data);

            navigate('/admin');
        } catch (error) {
            setAlert({
                message: error.response.data.msg,
                error: true
            })
        }
    }

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Login and Administrate your
                    <span className="text-black"> Patients</span>
                </h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

                {message && <Alert
                    alert={alert}
                />}

                <form onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label
                            className="uppercase text-gray-600 block text-xl font-bold"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your email"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        />
                    </div>
                    <div className="my-5">
                        <label
                            className="uppercase text-gray-600 block text-xl font-bold"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Your password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        />
                    </div>
                    <input
                        type="submit"
                        value="Login"
                        className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                    />
                </form>
                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link
                        className="block text-center my-5 text-gray-500"
                        to='/register'
                    >
                        Don't have an account? Create one
                    </Link>
                    <Link
                        className="block text-center my-5 text-gray-500"
                        to='/i-forgot-password'
                    >
                        I forgot my password
                    </Link>
                </nav>
            </div>
        </>
    )
}