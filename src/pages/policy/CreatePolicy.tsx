import React, { useEffect, useRef, useState } from 'react'
import CkeditorCom from '../../layout/CkeditorCom'
import { getData, postDataWithToken } from '../../utils';
import { useNavigate } from 'react-router-dom';

const CreatePolicy = () => {
    const navigate = useNavigate();
    const goref = useRef<HTMLDivElement>(null)
    interface ApiResponse {
        success: string;
        message: string;
    }
    interface Policy {
        title: string;
        _id: string;
        description: string;
        url: string;
    }
    const [editorData, setEditorData] = React.useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [pid, setPid] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [msg, setMsg] = useState<string>('');
    const [policies, setPolicies] = useState<Policy[]>([])
    const handleEditorChange = (data: string) => {
        setEditorData(data);
    };
    const handlepid = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        if (val != "new") {
            setPid(e.target.value)
            const finddata = policies.find(obj => obj._id == val);
            if (finddata) {
                setTitle(finddata.title || ""); // Ensure title is a string
                setEditorData(finddata.description || "");
            } else {
                // Handle case where finddata is not found
                setTitle("");
                setEditorData("");
            }
        }
        if (val == "new") {
            setTitle('');
            setPid('');
            setEditorData('')
        }
    }
    const handletitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }
    const save_data = async () => {
        const data = {
            policy_id: pid,
            title: title,
            description: editorData
        }
        const resp: ApiResponse = await postDataWithToken('policy', data, navigate);
        setTimeout(() => {
            if (goref.current) {
                goref.current.scrollIntoView({ block: 'start' });
            }
        }, 0);
        setMsg(resp.message);
        setStatus(resp.success);
        getdata()
    }
    const getdata = async () => {
        const resp = await getData('policy', navigate);
        setPolicies(resp.data);
    }
    useEffect(() => {
        getdata();
    }, [])
    return (
        <>
            <section className="py-10">
                <div className="container" ref={goref}>
                    <div className="grid grid-cols-3 py-10 gap-4">
                        {
                            msg && (
                                <>
                                    <div className={`col-span-3 mt-10 rounded-md ${status == "1" ? 'bg-green-700' : 'bg-red-700'}`}>
                                        <div className="w-full rounded-md p-4 text-white">
                                            {msg}
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        <div className="col-span-1">
                            <label htmlFor="">Select Policy</label>
                            <select onChange={handlepid} className="w-full p-2 text-sm rounded-md border border-blue-gray-200">
                                <option value="">---Select---</option>
                                {
                                    policies.map(pl => (
                                        <>
                                            <option value={pl._id}>{pl.title}</option>
                                        </>
                                    ))
                                }
                                <option value="new">Create New</option>
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="policy_title">Enter Policy Title</label>
                            <input placeholder='Enter policy tilte' value={title} onChange={handletitle} type="text" name="" id="policy_title" className="w-full border border-blue-gray-200 p-2 text-sm outline-none rounded-md" />
                        </div>
                        <div className="col-span-3">
                            <CkeditorCom value={editorData} onChange={handleEditorChange} />
                        </div>
                        <div className="col-span-3">
                            <button onClick={save_data} title='badfa' className="bg-primary text-white px-5 py-2 text-sm">Save Data</button>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default CreatePolicy
