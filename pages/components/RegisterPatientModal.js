import { useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { Modal, Input, Select, useNotification } from "web3uikit";
import networkMapping from "../constants/networkMapping";
import PatientMedicalRecordSystemAbi from "../constants/PatientMedicalRecordSystem.json";
import dateInUnix from "../../utils/dateInUnix";

export default function RegisterPatientModal({ isVisible, onClose, account }) {
  const dispatch = useNotification();
  const { runContractFunction } = useWeb3Contract();

  const [name, setName] = useState("");
  const [patientAddress, setPatientAddress] = useState(account);
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bloodGroup, setBloodGroup] = useState(0);
  const [cancelDisabled, setCancelDisabled] = useState(false);
  const [okDisabled, setOkDisabled] = useState(false);
  const [showKeys, setShowKeys] = useState(false);
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const { chainId: chainHexId } = useMoralis();
  const chainId = chainHexId ? parseInt(chainHexId).toString() : "31337";
  const medicalRecordSystemAddress =
    networkMapping[chainId].PatientMedicalRecordSystem[0];

  // console.log("I am contract address", medicalRecordSystemAddress)
  // console.log("I am chain Id: ", chainId)
  const handleRegisterPatientSuccess = async (tx) => {
    await tx.wait(1);
    dispatch({
      type: "success",
      title: "Transaction Successful",
      message:
        "You are now successfully registered to this decentralized medical record database system.",
      position: "bottomL",
    });
    onClose && onClose(); //closing the modal on success
    setCancelDisabled(false);
    setOkDisabled(false);
    setShowKeys(false);
  };

  const initiateRegisterPatientTransaction = async () => {
    setCancelDisabled(true);
    setOkDisabled(true);
    setShowKeys(true);
    // const keys = await generateKeys()
    // setPublicKey(keys.publicKey)
    // setPrivateKey(keys.privateKey)

    // console.log(`publicKey: ${keys.publicKey}`)
    // console.log(`privateKey: ${privateKey}`)
    dispatch({
      type: "success",
      title: "Public and Private Keys Generated",
      message:
        "Public and Private Key for encrypting your medical files generated successfully",
      position: "bottomL",
      isClosing: !okDisabled && !cancelDisabled,
    });

    //NOTIFICATION FOR GEENRATING PUBLIC AND PRIVATE KEYS

    // ---------Here I am getting the contract function which has to be run for registerPatient -----------------------
    const registerPatientOptions = {
      abi: PatientMedicalRecordSystemAbi,
      contractAddress: "0x16DFF15497Aca9e8D59A507edFD2a2Ba987F1d73",
      functionName: "registerPatient",
      params: {
        _patientAddress: patientAddress,
        _name: name,
      },
    };

    //Acutaly calling the function. [This is where the transaction initiation actually begins].
    await runContractFunction({
      params: registerPatientOptions,
      onError: (error) => {
        console.log("Error while calling registerPatient function", error);
      },
      onSuccess: handleRegisterPatientSuccess,
    });
  };

  return (
    <div>
      <Modal
        isVisible={isVisible}
        onCancel={onClose}
        onCloseButtonPressed={onClose}
        onOk={initiateRegisterPatientTransaction}
        okButtonColor="blue"
        isCancelDisabled={cancelDisabled}
        isOkDisabled={okDisabled}
      >
        <div className="mb-5">
          <Input
            label="Enter Name of Patient"
            name="Name of Patient"
            type="text"
            onChange={(event) => {
              setName(event.target.value);
            }}
            validation={{
              required: true,
              minLength: 3,
              maxLength: 20,
            }}
          />
        </div>
        <div className="mb-5">
          <Input
            label="Enter Patient's account"
            name="Patient Account Address"
            type="text"
            onChange={(event) => {
              setPatientAddress(event.target.value);
            }}
            value={account}
            validation={{
              required: true,
              minLength: 42,
              maxLength: 42,
            }}
          />
        </div>
        {/* Date Picker Starts Here */}
        <div className="mb-5">
          <Input
            label="Enter Date of Birth"
            name="Date of Birth"
            type="date"
            onChange={(event) => {
              setDob(dateInUnix(event.target.value));
            }}
            validation={{ required: true }}
          />
        </div>

        <div className="mb-5">
          <Select
            label="Choose Blood Group"
            onChangeTraditional={(event) => {
              setBloodGroup(event.target.value);
            }}
            options={[
              {
                id: "o-negative",
                label: "O negative",
              },
              {
                id: "o-positive",
                label: "O positive",
              },
              {
                id: "a-negative",
                label: "A negative",
              },
              {
                id: "a-positive",
                label: "A positive",
              },
              {
                id: "b-negative",
                label: "B negative",
              },
              {
                id: "b-positive",
                label: "B positive",
              },
              {
                id: "ab-negative",
                label: "AB negative",
              },
              {
                id: "ab-positive",
                label: "AB positive",
              },
            ]}
            traditionalHTML5
            validation={{
              required: true,
            }}
          />
        </div>
        {/* <div className="mb-5">
                    <Input
                        label="Enter Phone Number"
                        name="Phone Number"
                        type="text"
                        onChange={(event) => {
                            setPhoneNumber(event.target.value)
                        }}
                        validation={{ required: true }}
                    />
                </div> */}
        {showKeys ? (
          <div>
            <h1>Registered : Please Refresh</h1>
          </div>
        ) : (
          <div></div>
        )}
      </Modal>
    </div>
  );
}
