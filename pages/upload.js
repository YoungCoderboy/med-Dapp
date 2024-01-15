import { useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import Files from "@/components/Files";
import { useMoralis, useWeb3Contract } from "react-moralis"
import { Modal, Input, Select, useNotification,ConnectButton, Loading } from "web3uikit"
import PatientMedicalRecordSystemAbi from "./constants/PatientMedicalRecordSystem.json"


export default function Home() {

  const dispatch = useNotification()
    const { runContractFunction } = useWeb3Contract()


    

  const [cancelDisabled, setCancelDisabled] = useState(false)
    const [okDisabled, setOkDisabled] = useState(false)
    const [showKeys, setShowKeys] = useState(false)
    const [publicKey, setPublicKey] = useState("")
    const [privateKey, setPrivateKey] = useState("")

  // const dispatch = useNotification()
  // const { runContractFunction } = useWeb3Contract()

  const { isWeb3Enabled, chainId: chainHexId, account } = useMoralis()

  const chainId = chainHexId ? parseInt(chainHexId).toString() : "31337"

  const [file, setFile] = useState("");
  const [cid, setCid] = useState("");
  const [uploading, setUploading] = useState(false);

  const [name, setName] = useState("")
    const [patientAddress, setPatientAddress] = useState("")

  const inputFile = useRef(null);




const handleRegisterPatientSuccess = async (tx) => {
  await tx.wait(1)
  dispatch({
      type: "success",
      title: "Transaction Successful",
      message:
          "You are now successfully registered to this decentralized medical record database system.",
      position: "bottomL",
  })
  onClose && onClose() //closing the modal on success
  setCancelDisabled(false)
  setOkDisabled(false)
  setShowKeys(false)
}

const initiateRegisterPatientTransaction = async (ipfsHash) =>{
  setCancelDisabled(true)
        setOkDisabled(true)
        setShowKeys(true)
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
        })

        //NOTIFICATION FOR GEENRATING PUBLIC AND PRIVATE KEYS

        // ---------Here I am getting the contract function which has to be run for registerPatient -----------------------
        const registerPatientOptions = {
            abi: PatientMedicalRecordSystemAbi,
            contractAddress: '0x16DFF15497Aca9e8D59A507edFD2a2Ba987F1d73',
            functionName: "AddPatientData",
            params: {
                _patientAddress: patientAddress,
                _name: name,
                _diseaseHash:ipfsHash,
            },
        }

        //Acutaly calling the function. [This is where the transaction initiation actually begins].
        await runContractFunction({
            params: registerPatientOptions,
            onError: (error) => {
                console.log(
                    "Error while calling registerPatient function",
                    error
                )
            },
            onSuccess: handleRegisterPatientSuccess,
        })
}

  const uploadFile = async (fileToUpload) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", fileToUpload, { filename: fileToUpload.name });
      const res = await fetch("/api/files", {
        method: "POST",
        body: formData,
      });
      const ipfsHash = await res.text();
      setCid(ipfsHash);
      setUploading(false);
      await initiateRegisterPatientTransaction(ipfsHash);

      


    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    uploadFile(e.target.files[0]);
  };

  const loadRecent = async () => {
    try {
      const res = await fetch("/api/files");
      const json = await res.json();
      setCid(json.ipfs_pin_hash);
    } catch (e) {
      console.log(e);
      alert("trouble loading files");
    }
  };

  return (
    <div>
      <Head>
        <title>Pinata Next.js App</title>
        <meta name="description" content="Generated with create-pinata-app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/pinnie.png" />
      </Head>
      <main className="w-full min-h-screen m-auto flex flex-col justify-center items-center">
      
      <div className="py-4 px-3 font-bold text-4xl ml-12">
                    Doctor's Uploader
                    {isWeb3Enabled ? (
                        <div className="badge badge-primary ml-4">
                            Web3 is Enabled
                        </div>
                    ) : (
                        <div className="badge badge-warning ml-4">
                            Web3 Not Enabled
                        </div>
                    )}
                </div>
                <div className="mx-auto ml-12">
                    <ConnectButton moralisAuth={false} />
                </div> 
        <div>{isWeb3Enabled?(<div className="w-full h-full m-auto  bg-cover bg-center flex flex-col ">
        <div className="h-full max-w-screen-xl">
          
          <div className="h-full w-full m-auto flex justify-center items-center gap-8">
            <div className="w-1/2 flex flex-col gap-6">
              <h1>File Uploader</h1>
              <h2>name :</h2>
              <div className="mb-5">
                    <Input
                        label="Enter Name of Patient"
                        name="Name of Patient"
                        type="text"
                        onChange={(event) => {
                            setName(event.target.value)
                        }}
                        validation={{
                            required: true,
                            minLength: 3,
                            maxLength: 20,
                        }}
                    />
                </div>
              <h2>enter Patient address :</h2>
              <div className="mb-5">
                    <Input
                        label="Enter Name of Patient"
                        name="Name of Patient"
                        type="text"
                        onChange={(event) => {
                          setPatientAddress(event.target.value)
                        }}
                        validation={{
                            required: true,
                            minLength: 3,
                            maxLength: 100,
                        }}
                    />
                </div>
              <p>
                Connect and upload your files here
              </p>
              <input
                type="file"
                id="file"
                ref={inputFile}
                onChange={handleChange}
                style={{ display: "none" }}
              />
              <div>
                <button onClick={loadRecent} className="mr-10 w-[150px] bg-light text-secondary border-2 border-secondary rounded-3xl py-2 px-4 hover:bg-secondary hover:text-light transition-all duration-300 ease-in-out">
                  Load recent
                </button>
                <button
                  disabled={uploading}
                  onClick={() => inputFile.current.click()}
                  className="w-[150px] bg-secondary text-light rounded-3xl py-2 px-4 hover:bg-accent hover:text-light transition-all duration-300 ease-in-out"
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>
              {cid && (
                <div>{cid}</div>
              )}
            </div>
            
          </div>
        </div>
        
        
      </div>):(<div><h1>PleaseConnect your Wallet</h1></div>)}</div>

      </main>
    </div>
  );
}
