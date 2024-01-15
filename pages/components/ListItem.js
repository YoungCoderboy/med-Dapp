//Here we make a call to the URI and fetch data and display each data as a card.

import useSWR from "swr"
import truncatStr from "../../utils/truncateString"
import { Loading, Modal } from "web3uikit"
import QRCODE from "qrcode"
import { useState } from "react"

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function ListItem({ metadataURI }) {
    const [visible, setVisible] = useState(false)
    const [source, setSource] = useState("")

    //Here fetching the metadata
    // console.log("Metadata URI from the ListItem component", metadataURI)
    // const { data, error } = useSWR(
    //     `https://gateway.pinata.cloud/ipfs/${metadataURI}`,
    //     fetcher
    // )

    // if (error) {
    //     console.log("Error while fetching file metadata: ", error)
    //     return <div>Failed to Load...Reloading the page might help.</div>
    // }

    

    // if (!data) {
    //     return (
    //         <div>
    //             <div
    //                 style={{
    //                     backgroundColor: "#ECECFC",
    //                     borderRadius: "8px",
    //                     padding: "20px",
    //                 }}
    //             >
    //                 <Loading size={40} spinnerColor="#2E7DAF" />
    //             </div>
    //         </div>
    //     )
    // }

    
        const onClose = () => {
            setVisible(false)
        }

    //     const handleQRCode = () => {
    //         QRCODE.toDataURL(`https://gateway.pinata.cloud/ipfs/${data.fileIpfsHash}`).then(
    //             (response) => {
    //                 setSource(response)
    //             }
    //         )
    //         setVisible(true)
    //     }
        // console.log(data)

        const handleQRCode = () => {
            QRCODE.toDataURL(`https://gateway.pinata.cloud/ipfs/${metadataURI}`).then(
                (response) => {
                    setSource(response)
                }
            )
            setVisible(true)
        }

        return (
            <div>
                <div className="mt-2 mb-3">
                    <a href={`https://gateway.pinata.cloud/ipfs/${metadataURI}`}>
                    <h2>Clickthis</h2>
                    </a>
                    <button
                                    className="btn btn-secondary btn-sm"
                                    onClick={handleQRCode}
                                >
                                    Show QR Code
                                </button>
                </div>
                <div>
                    <Modal
                        okText="Done"
                        onCancel={onClose}
                        onCloseButtonPressed={onClose}
                        onOk={onClose}
                        title="Scan QR Code to View File"
                        isVisible={visible}
                        width="50vw"
                    >
                        <p
                            style={{
                                fontWeight: 600,
                                marginRight: "1em",
                                textAlign: "center",
                            }}
                        >
                            <div className="md:ml-48">
                                <img src={source} alt="QR Code" />
                            </div>
                        </p>
                    </Modal>
                </div>
            </div>
        )
    
}
