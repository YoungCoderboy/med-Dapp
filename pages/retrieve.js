import Head from "next/head";
import { useMoralis } from "react-moralis";
import { ConnectButton, Loading } from "web3uikit";
import PatientWorkflow from "./components/PatientWorkflow";
import networkMapping from "./constants/networkMapping.json";
import { GET_ADDED_PATIENTS } from "../constant/subgraphQueries";
import { useQuery } from "@apollo/client";
import PatientProfile from "./components/PatientProfile";
import NotRegisteredPatient from "./components/NotRegisteredPatient";
import { useState } from "react";
import Navbar2 from "./components/Navbar-patient";

export default function Np() {
  let nme = "";
  let add = "";
  let hash = "";
  const { isWeb3Enabled, chainId: chainHexId, account } = useMoralis();

  const chainId = chainHexId ? parseInt(chainHexId).toString() : "31337";
  console.log(chainId);
  // const patientMedicalRecordSystemAddress =
  //     networkMapping[chainId].PatientMedicalRecordSystem[0]
  const {
    loading: fetchingAddedPatients,
    error,
    data: addedPatients,
  } = useQuery(GET_ADDED_PATIENTS);

  let isRegistered = false;
  let patientAddresses;
  if (!fetchingAddedPatients && addedPatients) {
    patientAddresses = addedPatients.addedPatients.map(
      (patient) => patient.patientAddress
    );
    if (patientAddresses.includes(account)) {
      isRegistered = true;
    }
  }
  // console.log(addedPatients[addedPatients.length-1])
  let cnt = 0;
  if (isRegistered) {
    addedPatients.addedPatients.map((patient) => {
      patientAddresses.push(patient.patientAddress);
      if (patient.patientAddress === account && cnt === 0) {
        const { name, patientAddress, diseaseHash } = patient;
        nme = name;
        add = patientAddress;
        hash = diseaseHash;
        cnt++;
      }
    });
  }
  return (
    <>
      <Navbar2 />
      <div>
        <Head>
          <title>MediChain - Patient Dashboard</title>
          <meta name="description" content="MediChain - Patient Dashboard" />
          <link rel="icon" href="/logo.svg" />
        </Head>
        <div>
          <div className="py-4 px-3 font-bold text-4xl ml-12 text-purple-600">
            Patient Dashboard
            {isWeb3Enabled ? (
              <div className="badge badge-primary ml-4">Web3 is Enabled</div>
            ) : (
              <div className="badge badge-warning ml-4">Web3 Not Enabled</div>
            )}
          </div>
          <div className="mx-auto ml-12 color-black">
            <ConnectButton moralisAuth={false} />
          </div>
          <div className="ml-10 w-4/6">
            {isWeb3Enabled ? (
              fetchingAddedPatients || !addedPatients ? (
                <div
                  style={{
                    backgroundColor: "#ECECFE",
                    borderRadius: "6px",
                    padding: "15px",
                  }}
                  className="ml-10 mt-5"
                >
                  <Loading
                    direction="right"
                    fontSize={14}
                    size={16}
                    spinnerColor="rgba(91, 96, 222, 0.8)"
                    spinnerType="wave"
                    text="Loading Profile..."
                  />
                </div>
              ) : isRegistered ? (
                <div key={add}>
                  <PatientProfile
                    key={add}
                    name={nme}
                    patientAddress={add}
                    diseaseHash={hash}
                  />
                </div>
              ) : (
                <NotRegisteredPatient account={account} />
              )
            ) : (
              <div>
                <PatientWorkflow />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
