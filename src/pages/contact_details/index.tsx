import React, { useEffect, useState } from 'react'
import { getData, postDataWithToken } from '../../utils'
import { Dialog, DialogBody, DialogHeader, Input } from '@material-tailwind/react';
import { EditOutlined } from '@ant-design/icons';

const ContactDetails = () => {
    interface Media {
        _id: string;
        title: string;
        type: string;
        media_value: string;
    }
    const [data, setData] = useState<Media[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [ntitle, setNtitle] = useState<string>('')
    const [nval, setNval] = useState<string>('')
    const [type, setType] = useState<string>('');
    const [mid, setMid] = useState<string>('')
    const getdata = async () => {
        const resp = await getData('social/contact-media');
        setData(resp.data);
    }
    const handletitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNtitle(e.target.value);
    }
    const handlevalue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNval(e.target.value);
    }
    const handletype = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value);
    }
    const savedata = async () => {
        const adata = {
            title: ntitle,
            type: type,
            media_value: nval
        }
        await postDataWithToken('social/contact-media', { ...adata });
        setOpen(false);
        getdata();
        setNval('');
        setNtitle('')
    }

    const updatedata = async (id: string) => {
        const foundData = data.find(obj => obj._id === id);
        if (foundData) {
            setNtitle(foundData.title);
            setNval(foundData.media_value);
            setType(foundData.type)
            setMid(id);
            setOpen(true)
        } else {
            // Handle the case when the object is not found
            console.error(`No data found with id: ${id}`);
        }
    }
    const update_data = async () => {
        const udata = {
            media_id: mid,
            title: ntitle,
            type: type,
            media_value: nval,
        }
        await postDataWithToken('social/contact-media', { ...udata });
        setOpen(false);
        setMid('');
        setNtitle('');
        setNval('');
        getdata();
    }
    const addnewsocial = () => {
        setMid('');
        setNtitle('');
        setNval('');
        setOpen(!open);
    }
    useEffect(() => {
        getdata();
    }, [])


    return (
        <>
            {
                open && (
                    <>
                        <Dialog size='sm' open={open} handler={addnewsocial} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <DialogHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                Add New Social Media
                            </DialogHeader>
                            <DialogBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                <div className="w-full">

                                    <div className="form-group mb-3">
                                        <select onChange={handletype} className='w-full p-2 text-sm border border-blue-gray-200 outline-none rounded-sm' >
                                            <option value="">Select type</option>
                                            <option value="Social" selected={type == "Social"}>Social</option>
                                            <option value="Contact" selected={type == "Contact"}>Contact</option>
                                        </select>
                                    </div>
                                    <div className="form-group mb-3">
                                        <Input onChange={handletitle} value={ntitle} className='w-full' label='Enter Title Social' onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <Input onChange={handlevalue} value={nval} className='w-full' label='Enter Social URL' onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <button onClick={mid ? update_data : savedata} className="w-full bg-primary text-white rounded-md p-3">Submit</button>
                                    </div>
                                </div>
                            </DialogBody>
                        </Dialog>

                    </>
                )
            }
            <section className="py-5">
                <div className="container mx-auto">
                    <div className="grid grid-cols-3">

                        <div className="col-span-3">
                            <div className="w-full">
                                <table className="w-full">
                                    <thead>
                                        <tr className='*:border *:border-blue-gray-200 *:text-sm *:p-2 *:text-start'>
                                            <th>Sr No</th>
                                            <th>Type</th>
                                            <th>Title</th>
                                            <th>Url</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item, index) => (
                                            <tr key={index} className='*:border *:border-blue-gray-200 *:text-sm *:p-2 *:text-start'>
                                                <td>{index + 1}</td>
                                                <td>
                                                    {item.type}
                                                </td>
                                                <td>
                                                    {item.title}
                                                </td>
                                                <td>
                                                    {item.media_value}

                                                </td>
                                                <td>
                                                    <div className="inline-flex gap-2">
                                                        <button type='button' title='button' onClick={() => updatedata(item._id)} className="bg-primary px-2 py-2 rounded-sm text-white">
                                                            <EditOutlined />
                                                        </button>
                                                        {/* <button type='button' title='button' onClick={() => updatedata(item._id)} className="bg-orange-800 px-2 py-2 rounded-sm text-white">
                                                            <DeleteOutlined />
                                                        </button> */}
                                                    </div>

                                                </td>
                                            </tr>
                                        ))}
                                        <tr className='*:border *:border-blue-gray-200 *:text-sm *:p-2 *:text-start'>
                                            <td colSpan={4}>

                                            </td>
                                            <td>
                                                <button onClick={addnewsocial} className='bg-primary text-white rounded-sm p-1 text-xs '>Add New</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ContactDetails