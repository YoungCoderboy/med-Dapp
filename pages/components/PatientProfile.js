import truncatStr from "../../utils/truncateString"

import { useState } from "react"
import ListMedicalFiles from "./ListMedicalFiles"
import { Modal, Input, useNotification } from "web3uikit"


const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function PatientProfile({
    name,
    patientAddress,
    diseaseHash,
}) {
    const dispatch = useNotification()
   
    const [btton,Handlebtton]=useState(true);
    



    const handlechick=()=>{
        Handlebtton(false)
    }
    

    const [decryptedVaccinationHash, setDecryptedVaccinationHash] = useState([])
    const [decryptedChronicHash, setDecryptedChronicHash] = useState([])
    const [decryptedAccidentHash, setDecryptedAccidentHash] = useState([])
    const [decryptedAcuteHash, setDecryptedAcuteHash] = useState([])
    // console.log("Decrypted Vaccination Hash: ", decryptedVaccinationHash)

    return (
        <div>
            <div>
                <div className="md:w-fit md:mx-auto w-full mx-auto bg-sky-200 bg-opacity-80 mt-10 p-5 rounded-lg hover:bg-opacity-100">
                    <div className="card p-4 hover">
                        <div className="mb-1">
                            <span>
                                <span className="font-sans md:text-xl font-medium hover:underline">
                                    Name
                                </span>
                                :{" "}
                                <span className="font-serif md:text-xl font-normal">
                                    {name}
                                </span>
                            </span>
                            
                        </div>
                        <div className="mb-1">
                            <span className="font-sans md:text-xl font-medium hover:underline">
                                Patient Account Address
                            </span>
                            :{" "}
                            <a
                                className="badge ml-3 md:p-2 px-4"
                                title="view on etherscan"
                                target="_blank"
                                href={
                                    "https://goerli.etherscan.io/address/" +
                                    patientAddress
                                }
                            >
                                {truncatStr(patientAddress, 20)}
                            </a>
                        </div>
                        
                        {/* <div>
                            <span className="font-sans md:text-xl font-medium hover:underline">
                                Phone Number
                            </span>
                            :{" "}
                            <span className="badge badge-warning badge-accent">
                                {phoneNumber}
                            </span>
                        </div> */}
                    </div>
                </div>
                <div>
                    {btton ? (
                        <div className="text-center">
                            <button
                                className="btn btn-primary btn-md mt-8"
                                onClick={handlechick}
                            >
                                View Medical Files
                            </button>
                        </div>
                    ) : (
                        <div>
                            <ListMedicalFiles
                                vaccinationHash={[...diseaseHash]}
                                acuteHash={[...decryptedAcuteHash]}
                                accidentHash={[...decryptedAccidentHash]}
                                chronicHash={[...decryptedChronicHash]}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
