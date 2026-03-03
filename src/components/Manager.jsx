import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    const ref = useRef()
    const passwordRef = useRef()
    const copyText = (text) => {
        toast('Copied to clipboard!')
        navigator.clipboard.writeText(text)
    }


    const showPassword = (params) => {
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.svg"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "icons/eyecross.png"
            passwordRef.current.type = "text"
        }
    }

    const getPasswords = async (params) => {
        let req = await fetch("http://localhost:3000/", {method:"GET", headers:{"Content-Type":"application/json"}})
        let passwords = await req.json()
        setpasswordArray(passwords)
    }
    

    useEffect(() => {
    toast('Welcome to your own PassOP')
    getPasswords()
    }, [])

    const savePassword = async (params) => {
        if(form.site.length>3 && form.username.length>3 && form.password.length>3){
        
        const newPassword = {...form, id:uuidv4()};
        await fetch("http://localhost:3000/", {method:"POST", headers:{"Content-Type":"application/json"},
            body: JSON.stringify(newPassword) })
        setpasswordArray([...passwordArray, newPassword])
        toast("Password saved successfully")  
        setform({site: "", username: "", password:""})
        }
            else{
                toast('Error: Invalid data!')
            }
    }
    const deletePassword = async (id) => {
        if(confirm("Are you sure want to delete this password!")){
            setpasswordArray(passwordArray.filter(item=>item.id!==id))
            let res = await fetch("http://localhost:3000/", {method:"DELETE", headers:{"Content-Type":"application/json"},
            body: JSON.stringify({id}) })
            toast('Password deleted!');
    }
    }
    const editPassword =async (id) => {
        setform({...passwordArray.filter(i=>i.id===id)[0], id:id})

         // first delete password with that id
        await fetch("http://localhost:3000/", {method:"DELETE" , headers:{"Content-Type":"application/json"}, body:JSON.stringify({id: form.id})})
        setpasswordArray(passwordArray.filter(item=>item.id!==id))
    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick = {true}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            

            <div className="fixed inset-0 -z-10 min-h-screen w-full bg-green-100 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)]">
                <div className="absolute inset-0 bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
            </div>
            <div className="max-w-6xl py-16 mx-auto text-black md:mycontainer">
                <h1 className="text-4xl font-bold text-center "> <span className='text-green-500'>&lt;</span>
                    Pass
                    <span className='text-green-500'>OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center '>Your own Password manager</p>
                <div className="text-black flex flex-col p-4 gap-5 items-center">
                    <input placeholder='Enter the website URL' value={form.site} onChange={handleChange} className='rounded-full border border-green-700 min-w-[300px] md:w-full p-4 py-1' type="text" name="site" />
                    <div className="flex flex-col min-w-[300px] md:flex-row md:w-full justify-between gap-8">
                        <input placeholder='Enter Username' value={form.username} onChange={handleChange} className='rounded-full border border-green-700 w-full p-4 py-1' type="text" name="username" />
                        <div className="relative">
                            <input ref={passwordRef} placeholder='Enter Password' value={form.password} onChange={handleChange} className='rounded-full border border-green-700 w-full p-4 py-1 decoration-none' type="password" name="password" />
                            <span className='absolute right-[3px] top-[2px] p-1 cursor-pointer' onClick={showPassword}><img ref={ref} src="/icons/eye.svg" alt="" width={23} /></span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border-2 border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/efxgwrkc.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        Add Password</button>
                </div>
                <div className="passwords mb-5">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show </div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full overflow-hidden rounded-md">
                        <thead className='bg-green-700 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='text-center w-32 bg-green-200'>
                            {passwordArray.map((item) => {
                                return <tr key={item.id}>
                                    <td className='py-2 border border-white'>
                                       <div className='flex items-center justify-center'>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='lordiconcpy cursor-pointer size-6' onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>
                                        
                                    </td>
                                    <td className='py-2 border border-white'>
                                         <div className='flex items-center justify-center '>
                                            <span>{item.username}</span>
                                            <div className='lordiconcpy cursor-pointer size-6' onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white'>
                                        <div className='flex items-center justify-center'>
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <div className='lordiconcpy cursor-pointer size-6' onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white'>
                                        <div className='flex items-center justify-center'>
                                            <span className='editIcon cursor-pointer' onClick={()=>{editPassword(item.id)}}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px", "paddingLeft": "3px" }}>
                                                </lord-icon>
                                            </span>
                                            <span className='deleteIcon cursor-pointer' onClick={()=>{deletePassword(item.id)}}><lord-icon
                                                src="https://cdn.lordicon.com/xyfswyxf.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px", "paddingLeft": "3px" }}>
                                            </lord-icon></span>
                                        </div>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
