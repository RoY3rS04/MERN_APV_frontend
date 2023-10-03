import usePatients from "../hooks/usePatients";
import Patient from "./Patient";

export default function PatientsList() {

    const {patients} = usePatients();

    return (
        <>
            {patients.length ? (
                <>
                    <h2 className="font-black text-center text-3xl">Patients List</h2>

                    <p className="text-xl mt-5 mb-10 text-center">
                        Manage your {''}
                        <span className="text-indigo-600 font-bold">patients</span>
                    </p>

                    {patients.map((patient) => 
                    (
                        <Patient key={patient._id} patient={patient} />
                    )
                    )}
                </>
            ) : (
                <>
                    <h2 className="font-black text-center text-3xl">There are no patients</h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Start adding patients {''}
                        <span className="text-indigo-600 font-bold">and they'll appear here</span>
                    </p>
                </>
            )}
        </>
    )
}