import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav"
import useAuth from '../hooks/useAuth'
import Alert from '../components/Alert';

export default function EditProfile() {

    const { auth, updateProfile } = useAuth();
    const [profile, setProfile] = useState({});
    const [alert, setAlert] = useState({});

    useEffect(() => {
        setProfile(auth);
    }, [auth]);

    async function handleSubmit(e) {
        e.preventDefault();

        const { name, email } = profile;

        if ([name, email].includes('')) {
            setAlert({
                message: 'Name and email are required fields',
                error: true
            });

            return;
        }

        const result = await updateProfile(profile);

        setAlert(result);
    }

    const { message } = alert;

    return (
        <>
            <AdminNav />
            
            <h2
                className="text-3xl text-center mt-10 font-black"
            >Edit your Profile</h2>
            <p className="text-xl mt-5 mb-10 text-center">
                Modify your {''}
                <span className="text-indigo-600 font-bold">Info</span>
            </p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">

                    {message && <Alert alert={alert}/>}

                    <form onSubmit={handleSubmit}>
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600" htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="border bg-gray-50 mt-5 p-2 rounded-lg w-full"
                                value={profile.name ?? ''}
                                onChange={(e) => setProfile({
                                    ...profile,
                                    [e.target.name]: e.target.value
                                })}
                                name="name"
                                id="name" />
                        </div>
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600" htmlFor="web">Web</label>
                            <input
                                type="text"
                                className="border bg-gray-50 mt-5 p-2 rounded-lg w-full"
                                value={profile.web ?? ''}
                                onChange={(e) => setProfile({
                                    ...profile,
                                    [e.target.name]: e.target.value
                                })}
                                name="web"
                                id="web" />
                        </div>
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600" htmlFor="phone">Phone</label>
                            <input
                                type="text"
                                className="border bg-gray-50 mt-5 p-2 rounded-lg w-full"
                                value={profile.phone ?? ''}
                                onChange={(e) => setProfile({
                                    ...profile,
                                    [e.target.name]: e.target.value
                                })}
                                name="phone"
                                id="phone" />
                        </div>
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600" htmlFor="email">Email</label>
                            <input
                                type="tel"
                                className="border bg-gray-50 mt-5 p-2 rounded-lg w-full"
                                value={profile.email ?? ''}
                                onChange={(e) => setProfile({
                                    ...profile,
                                    [e.target.name]: e.target.value
                                })}
                                name="email"
                                id="email" />
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