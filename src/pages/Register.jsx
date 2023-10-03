import { Link } from "react-router-dom";
import { useState } from "react";
import axiosClient from "../config/axios";
import Alert from "../components/Alert";

export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [alert, setAlert] = useState({});

    async function handleSubmit(e) {
        e.preventDefault();

        if ([name, email, password, repeatedPassword].includes('')) {
            setAlert({
                message: 'There are empty fields',
                error: true
            });
            return;
        }

        if (password !== repeatedPassword) {
            setAlert({
                message: 'Passwords are not equal',
                error: true
            });
            return;
        }

        if (password.length < 6) {
            setAlert({
                message: 'Password must contain 6 characters at least',
                error: true
            });
            return; 
        }

        setAlert({});

        //Create the user
        
        try {
            await axiosClient.post('/vets', {
                name,
                email,
                password
            });

            setAlert({
                message: 'Created successfully, check your email',
                error: false
            })
        } catch (error) {
            setAlert({
                message: error.response.data.msg,
                error: true
            })
        }
    }

    const { message } = alert;

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Create an Account and Administrate
                    <span className="text-black"> your Patients</span>
                </h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

                {message && <Alert
                    alert={alert}
                />}

                <form
                    onSubmit={handleSubmit}
                >
                    <div className="my-5">
                        <label
                            className="uppercase text-gray-600 block text-xl font-bold"
                            htmlFor="name"
                        >
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={name}
                            onChange={(e) => {setName(e.target.value)}}
                            placeholder="Your name"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        />
                    </div>
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
                            onChange={(e) => {setEmail(e.target.value)}}
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
                            onChange={(e) => {setPassword(e.target.value)}}
                            placeholder="Your password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        />
                    </div>
                    <div className="my-5">
                        <label
                            className="uppercase text-gray-600 block text-xl font-bold"
                            htmlFor="confirm-password"
                        >
                            Confirm your Password
                        </label>
                        <input
                            id="confirm-password"
                            name="confirm-password"
                            type="password"
                            value={repeatedPassword}
                            onChange={(e) => {setRepeatedPassword(e.target.value)}}
                            placeholder="Confirm your Password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        />
                    </div>
                    <input
                        type="submit"
                        value="Create Account"
                        className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                    />
                </form>
                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link
                        className="block text-center my-5 text-gray-500"
                        to='/'
                    >
                        Already have an account? Login
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