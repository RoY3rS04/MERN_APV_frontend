import { createContext, useState, useEffect } from "react";
import axiosClient from "../config/axios";
import useAuth from "../hooks/useAuth";

const PatientsContext = createContext();

export function PatientsProvider({children}) {

    const [patients, setPatients] = useState([]);
    const [patient, setPatient] = useState({});
    const { auth } = useAuth();

    useEffect(() => {
        const getClients = async () => {
            try {
                const token = localStorage.getItem('token');

                if(!token) return

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                };

                const { data } = await axiosClient('/patients', config);

                setPatients(data);

            } catch (error) {
                console.log(error)
            }
        }

        getClients();
    }, [auth])

    async function addPatient(patient) {

        const token = localStorage.getItem('token');

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        if (patient.id) {
            try {
                const { data } = await axiosClient.put(`/patients/${patient.id}`, patient, config);

                const updatedPatients = patients.map(patientState => patientState._id === data._id ? data : patientState);

                setPatients(updatedPatients);
            } catch (error) {
                console.log(error)
            }
        } else {
            try {

                const { data } = await axiosClient.post('/patients', patient, config);

                const { createdAt, updatedAt, __v, ...savedPatient } = data;
                
                setPatients([
                    savedPatient,
                    ...patients
                ]);
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
        
    }

    function setEdit(patient) {
        setPatient(patient);
    }

    async function deletePatient(id) {
        const confirmed = confirm('Are you sure you want to delete this patient');

        if (confirmed) {
            try {
                
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await axiosClient.delete(`patients/${id}`, config);

                const updatedPatients = patients.filter((patientState) => {
                    if (patientState._id === id) {
                        return false;
                    }

                    return true;
                })

                setPatients(updatedPatients);
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <PatientsContext.Provider
            value={{
                patients,
                addPatient,
                setEdit,
                patient,
                deletePatient
            }}
        >
            {children}
        </PatientsContext.Provider>
    )
}


export default PatientsContext;