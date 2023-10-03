import { Link } from "react-router-dom"
import { useState } from "react";
import Alert from "../components/Alert";
import axiosClient from "../config/axios";

export default function ForgetPassword() {

    const [email, setEmail] = useState('');
    const [alert, setAlert] = useState({});

    async function handleSubmit(e) {
        e.preventDefault();

        if (email === '') {
            setAlert({
                message: 'The email field must be filled',
                error: true
            })
            return;
        }

        try {
            const { data } = await axiosClient.post('/vets/i-forgot-password', {
                email
            });

            setAlert({
                message: data.msg
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
                    Recover your Access and don't Lose
                    <span className="text-black"> your Patients</span>
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
                    <input
                        type="submit"
                        value="Send instructions"
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
                        to='/register'
                    >
                        Don't have an account? Create one
                    </Link>
                </nav>
            </div>
        </>
    )
}