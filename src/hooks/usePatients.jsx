import { useContext } from "react";
import PatientsContext from "../context/patientsProvider";

export default function usePatients() {
    return useContext(PatientsContext);
}