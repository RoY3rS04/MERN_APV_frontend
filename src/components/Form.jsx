import { useState, useEffect } from "react"
import Alert from "./Alert";
import usePatients from "../hooks/usePatients";

export default function Form() {

    const [name, setName] = useState('');
    const [owner, setOwner] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [id, setId] = useState(null);

    const [alert, setAlert] = useState({});

    const { addPatient, patient } = usePatients();

    useEffect(() => {

        if (patient?.name) {
            setName(patient.name);
            setOwner(patient.owner);
            setEmail(patient.email);
            setDate(patient.date);
            setSymptoms(patient.symptoms);
            setId(patient._id);
        }

    }, [patient])

    function handleSubmit(e) {
        e.preventDefault();

        if ([name, email, owner, date, symptoms].includes('')) {
            setAlert({
                message: 'All fields must be filled',
                error: true
            });

            return;
        }

        addPatient({
            name,
            owner,
            email,
            date,
            symptoms,
            id
        });

        setAlert({
            message: 'Saved Correctly'
        });

        setName('');
        setOwner('');
        setEmail('');
        setDate('');
        setSymptoms('');
        setId('');
    }

    const { message } = alert;

    return (
        <>
            <h2 className="font-black text-center text-3xl">Patient Manager</h2>
            <p className="text-xl mt-5 mb-10 text-center">
                Add patients and {''}
                <span className="text-indigo-600 font-bold">Manage them</span>
            </p>
            <form onSubmit={handleSubmit} className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md">
                <div className="mb-5">
                    <label className="text-gray-700 uppercase font-bold" htmlFor="name">Pet's name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="pet's name"
                        className="w-full p-2 mt-2 border placeholder-gray-400 rounded-md"
                    />
                </div>
                <div className="mb-5">
                    <label className="text-gray-700 uppercase font-bold" htmlFor="owner-name">Owner's name</label>
                    <input
                        type="text"
                        id="owner-name"
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)}
                        placeholder="owner's name"
                        className="w-full p-2 mt-2 border placeholder-gray-400 rounded-md"
                    />
                </div>
                <div className="mb-5">
                    <label className="text-gray-700 uppercase font-bold" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="owner's email"
                        className="w-full p-2 mt-2 border placeholder-gray-400 rounded-md"
                    />
                </div>
                <div className="mb-5">
                    <label className="text-gray-700 uppercase font-bold" htmlFor="date">Discharge date</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full p-2 mt-2 border placeholder-gray-400 rounded-md"
                    />
                </div>
                <div className="mb-5">
                    <label className="text-gray-700 uppercase font-bold" htmlFor="pet-symptoms">Pet's symptoms</label>
                    <textarea
                        id="pet-symptoms"
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        placeholder="Describe the pet symptoms"
                        className="w-full p-2 mt-2 border placeholder-gray-400 rounded-md"
                    />
                </div>
                <input
                    type="submit"
                    value={id ? 'Update Patient' : 'Add Patient'}
                    className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold cursor-pointer hover:bg-indigo-800 transition-colors"
                />
            </form>
            {message && <Alert alert={alert}/>}
        </>
    )
}