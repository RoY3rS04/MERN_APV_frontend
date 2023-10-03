import usePatients from '../hooks/usePatients';

export default function Patient({ patient }) {

    const { setEdit, deletePatient } = usePatients();

    const { email, name, owner, date, symptoms, _id } = patient;

    const formatDate = (date) => {
        const newDate = new Date(date);

        return new Intl.DateTimeFormat('en-US', {dateStyle: 'long'}).format(newDate);
    }

    return (
        <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
            <p className="font-bold uppercase text-indigo-700 my-2">Name: {''}
                <span className="normal-case font-normal text-black">{name}</span>
            </p>
            <p className="font-bold uppercase text-indigo-700 my-2">Owner: {''}
                <span className="normal-case font-normal text-black">{owner}</span>
            </p>
            <p className="font-bold uppercase text-indigo-700 my-2">Email: {''}
                <span className="normal-case font-normal text-black">{email}</span>
            </p>
            <p className="font-bold uppercase text-indigo-700 my-2">Discharge Date: {''}
                <span className="normal-case font-normal text-black">{formatDate(date)}</span>
            </p>
            <p className="font-bold uppercase text-indigo-700 my-2">Symptoms: {''}
                <span className="normal-case font-normal text-black">{symptoms}</span>
            </p>
            <div className="flex justify-between my-10">
                <button
                    type="button"
                    className="py-2 px-10 bg-indigo-600 text-white hover:bg-indigo-700 font-bold rounded-lg uppercase"
                    onClick={() => setEdit(patient)}
                >
                    Edit
                </button>
                <button
                    type="button"
                    className="py-2 px-10 bg-red-600 text-white hover:bg-red-700 font-bold rounded-lg uppercase"
                    onClick={() => deletePatient(_id)}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}