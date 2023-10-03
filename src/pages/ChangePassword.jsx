import AdminNav from "../components/AdminNav"
import { useState } from "react";
import Alert from "../components/Alert";
import useAuth from "../hooks/useAuth";

export default function ChangePassword() {

    const [passInfo, setPassInfo] = useState({
        password: '',
        new_password: ''
    });

    const { updatePassword } = useAuth();

    const [alert, setAlert] = useState({});

    const { message } = alert;

    async function handleSubmit(e) {
        e.preventDefault();

        if (Object.values(passInfo).some(field => field === '')) {
            setAlert({
                message: 'Both fields are required',
                error: true
            })

            return;
        }

        if (passInfo.new_password.length < 6) {
            setAlert({
                message: 'The new password must at least contain 6 characters',
                error: true
            })
        }

        const resp = await updatePassword(passInfo);

        setAlert(resp);
    }

    return (
        <>
            <AdminNav />
            
            <h2
                className="text-3xl text-center mt-10 font-black"
            >Change Password</h2>
            <p className="text-xl mt-5 mb-10 text-center">
                Modify your {''}
                <span className="text-indigo-600 font-bold">Password</span>
            </p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">

                    {message && <Alert alert={alert}/>}

                    <form onSubmit={handleSubmit}>
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600" htmlFor="password">Actual Password</label>
                            <input
                                type="password"
                                className="border bg-gray-50 mt-5 p-2 rounded-lg w-full"
                                onChange={(e) => setPassInfo({
                                    ...passInfo,
                                    [e.target.name]: e.target.value
                                })}
                                placeholder="Write your actual password"
                                name="password"
                                id="password" />
                        </div>
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600" htmlFor="new_password">New Password</label>
                            <input
                                type="password"
                                className="border bg-gray-50 mt-5 p-2 rounded-lg w-full"
                                onChange={(e) => setPassInfo({
                                    ...passInfo,
                                    [e.target.name]: e.target.value
                                })}
                                placeholder="Write your new password"
                                name="new_password"
                                id="new_password" />
                        </div>
                        <input
                            type="submit"
                            value='Save Changes'
                            className="bg-indigo-600 text-white rounded-lg uppercase w-full mt-5 py-3 px-10 font-bold cursor-pointer hover:bg-indigo-700"
                        />
                    </form>
                </div>
            </div>
        </>
    )
}