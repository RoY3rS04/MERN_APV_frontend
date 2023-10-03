import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Alert from '../components/Alert';
import axiosClient from "../config/axios";
import { Link } from "react-router-dom";

export default function NewPassword() {

    const [newPassword, setNewPassword] = useState('');
    const { token } = useParams();
    const [alert, setAlert] = useState({});
    const [validToken, setValidToken] = useState(false);
    const [modifiedPassword, setModifiedPassword] = useState(false);

    useEffect(() => {
        const proveToken = async () => {
            try {
                await axiosClient(`/vets/i-forgot-password/${token}`);

                setAlert({
                    message: 'Write down your new password',
                    error: false
                });
                setValidToken(true);
            } catch (error) {
                setAlert({
                    message: 'There was an error with the link',
                    error: true
                })
            }
        };

        proveToken();
    }, [])

    async function handleSubmit(e) {
        e.preventDefault();

        if (password.length < 6) {
            setAlert({
                message: 'The password must at least include 6 characters',
                error: true
            })

            return;
        }

        try {
            const url = `/vets/i-forgot-password/${token}`;

            const { data } = await axiosClient.post(url, { newPassword });
            
            setAlert({
                message: data.msg
            })

            setModifiedPassword(true);
        } catch (error) {
            setAlert({
                message: error.response.data.msg,
                error: true
            })
        }
    }

    const { message } = alert;
    //console.log(message)

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Restore your Password and don't lose access to
                    <span className="text-black"> your Patients</span>
                </h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

                {message && <Alert
                    alert={alert}
                />}

                {validToken && (
                    <>
                        <form onSubmit={handleSubmit}>
                            <div className="my-5">
                                <label
                                    className="uppercase text-gray-600 block text-xl font-bold"
                                    htmlFor="password"
                                >
                                    New Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Your new password"
                                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                                />
                            </div>
                            <input
                                type="submit"
                                value="Save new password"
                                className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                            />
                        </form>
                    </>
                )}

                {modifiedPassword &&
                    <Link
                        className="block text-center my-5 text-gray-500"
                        to='/'
                    >
                        Login
                    </Link>
                }
            </div>
        </>
    )
}