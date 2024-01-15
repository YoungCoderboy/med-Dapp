import { gql } from "@apollo/client"

const GET_ADDED_PATIENTS = gql`
    {
        addedPatients(first: 10) {
            id
            name
            patientAddress
            diseaseHash
        }
    }
`


export {
    GET_ADDED_PATIENTS, 
}
