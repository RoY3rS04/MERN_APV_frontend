import PatientsList from "../components/PatientsList";
import Form from "../components/Form";
import { useState } from "react";

export default function ManagePatients() {

    const [showForm, setShowForm] = useState(false);
    
    return (
        <div className="flex flex-col md:flex-row">
            <button
                className="bg-indigo-600 font-bold uppercase text-white rounded-md mx-10 p-3 mb-10 md:hidden"
                type="button"
                onClick={() => setShowForm(!showForm)}
            >
                {showForm ? 'Close form' : 'Show form'}
            </button>
            <div className={`${showForm ? 'block' : 'hidden'} md:w-1/2 md:block lg:w-2/5`}>
                <Form/>
            </div>
            <div className="md:w-1/2 lg:w-3/5">
                <PatientsList/>
            </div>
        </div>
    )
}