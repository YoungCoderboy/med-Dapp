import { useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import Files from "@/components/Files";
import { useMoralis } from "react-moralis";
import { ConnectButton, Loading } from "web3uikit";


export default function Home() {

  const { isWeb3Enabled, chainId: chainHexId, account } = useMoralis()

  const chainId = chainHexId ? parseInt(chainHexId).toString() : "31337"

  const [file, setFile] = useState("");
  const [cid, setCid] = useState("");
  const [uploading, setUploading] = useState(false);

  const inputFile = useRef(null);

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
    <>
      <Head>
        <title>Pinata Next.js App</title>
        <meta name="description" content="Generated with create-pinata-app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/pinnie.png" />
      </Head>
      <main className="w-full min-h-screen m-auto flex flex-col justify-center items-center">
      
        <div className="w-full h-full m-auto  bg-cover bg-center flex flex-col ">
          <div className="h-full max-w-screen-xl">
            
            <div className="h-full w-full m-auto flex justify-center items-center gap-8">
              <div className="w-1/2 flex flex-col gap-6">
                <h1>File Uploader</h1>
                <h2>name :</h2>
                <input type="text"/>
                <h2>other details :</h2>
                <input type="text"/>
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
          
          
        </div>

      </main>
    </>
  );
}
