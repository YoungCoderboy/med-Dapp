import { useState } from "react";
import Link from 'next/link';

const NewPage = () => {

    const [sh, setsh] = useState(true);
    const [special, setSpecial] = useState('')
    const [number, setNumber] = useState('')

    const [name, setName] = useState('')
    const [pname, setPName] = useState('')
    const [bldgrp, setBloodGrp] = useState('')
    const [dob, setDOB] = useState('')

    const handleSubmit = async () => {

        if (sh) {

            const requestOptions = {
                method: "post",
                value: { name: name, special: special, number: number }
            }
            console.log(requestOptions);
            // await fetch("https://localhost:5000", requestOptions);
            console.log("completed for Doctor");
        }
        else {
            const requestOptions = {
                method: "post",
                value: { dob: dob, pname: pname, bloodgrp: bldgrp }
            }
            console.log(requestOptions);
            // await fetch("https://localhost:5001", requestOptions);
            console.log("completed for Patient");
        }
    }

    return <>
        <button type="submit" id="doc" onClick={() => { setsh(true) }}>Doctor</button>
        <button type="submit" id="patient" onClick={() => { setsh(false) }}>Patient</button>
        {sh ? <div>
            <form action="post">
                <div className='flex flex-row'>
                    <h2 className='mt-2 mr-3 ml-6 text-2xl w-28'>  Doctor's Name  :   </h2>
                    <input
                        className='ml-1 mb-3 px-3 py-2 text-black w-72 h-10'
                        type='name'
                        placeholder='Enter Name'
                        onChange={(e) => { setName(e.target.value) }}
                    />
                </div>
                <div className='flex flex-row'>
                    <h2 className='mt-2 mr-3 ml-6 text-2xl w-28'>  Doctor's Specialization  :   </h2>
                    <input
                        className='ml-1 mb-3 px-3 py-2 text-black w-72 h-10'
                        type='text'
                        placeholder='Enter Specialization'
                        onChange={(e) => { setSpecial(e.target.value) }}
                    />
                </div>
                <div className='flex flex-row'>
                    <h2 className='mt-2 text-2xl w-32'>Regsitration Id : </h2>
                    <input
                        className='ml-4 px-3 text-black w-72 h-10'
                        type='text'
                        placeholder='Enter Registration Id'
                        onChange={(e) => { setNumber(e.target.value) }}
                    />
                </div>
                <Link legacyBehavior href='/docdash'>
        <button type="submit" id="entr-btn" onClick={handleSubmit}>Enter</button>
        </Link>
            </form>
        </div> : <form action="post">
            <div className='flex flex-row'>
                <h2 className='mt-2 mr-3 ml-6 text-2xl w-28'>  Patient Name :   </h2>
                <input
                    className='ml-1 mb-3 px-3 py-2 text-black w-72 h-10'
                    type='name'
                    placeholder='Enter Name'
                    onChange={(e) => { setPName(e.target.value) }}
                />
            </div>
            <div className='flex flex-row'>
                <h2 className='mt-2 text-2xl w-32'>Date of Birth: </h2>
                <input
                    className='ml-4 px-3 text-black w-72 h-10'
                    type="date"
                    placeholder='Enter Date of Birth'
                    onChange={(e) => { setDOB(e.target.value) }}
                />
            </div>
            <div className='flex flex-row'>
                <label htmlFor="bloodgrps">Choose Blood group:</label>

                <select name="bloodgrp" id="bloodgrps" onChange={(e) => { console.log(e.target.value) }}>
                    <option value="ap">A+</option>
                    <option value="bp">B+</option>
                    <option value="op">O+</option>
                    <option value="an">A-</option>
                    <option value="bn">B-</option>
                    <option value="on">O-</option>
                </select>
            </div>
            <Link legacyBehavior href='/patdash'>
        <button type="submit" id="entr-btn" onClick={handleSubmit}>Enter</button>
        </Link>
        </form>}
        
    </>

}
export default NewPage