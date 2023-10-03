import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Alert from "../components/Alert";
import axiosClient from "../config/axios";

export default function ConfirmAccount() {

    const { id } = useParams();
    const [confirmedAccount, setConfirmedAccount] = useState(false);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({});

    useEffect(() => {
        const confirmAccount = async () => {
            try {
                
                const url = `/vets/confirm/${id}`;
                const { data } = await axiosClient(url);

                setConfirmedAccount(true);

                setAlert({
                    message: data.msg
                })
            } catch (error) {
                setAlert({
                    message: error.response.data.msg,
                    error: true
                })
            }

            setLoading(false);
        }

        confirmAccount();
    }, [])

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Confirm your account and start to manage
                    <span className="text-black"> your Patients</span>
                </h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {!loading && <Alert alert={alert} />}
                
                {confirmedAccount && <Link className="block text-center my-5 text-gray-500" to='/'>Login</Link>}
            </div>
        </>
    )
}