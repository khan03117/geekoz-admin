import React, { useEffect, useState } from 'react'
import { base_url, delete_data, formDataWithToken, formDataWithTokenUpdate, getData } from '../../utils';
import { DeleteOutlined } from '@ant-design/icons';

import { Collapse, Input, Textarea } from '@material-tailwind/react';
import ConfirmPopup from '../../layout/ConfirmPopup';

const Activity: React.FC = () => {
    interface Seller {
        _id: string;
        title: string;
        image: string;
    }
    interface API {
        success: string;
        message: string;
    }
    const [title, setTitle] = useState<string>('');
    const [sellers, setSellers] = useState<Seller[]>([]);
    const [message, setMessage] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [editid, setEditid] = useState<string>('')
    const [image, setImage] = useState<File>();
    const [open, setOpen] = useState(false);
    const [description, setDescription] = useState('');
    const [deleteId, setDeleteId] = React.useState<string | null>(null);
    const [confirmDelete, setConfirmDelete] = React.useState<boolean>(false);

    const handlefile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    }
    const postdata = async () => {
        if (title && !editid) {
            const Fdat = new FormData();
            Fdat.append('title', title);
            Fdat.append('description', description);
            if (image) {
                Fdat.append('image', image);
            }
            const rsp: API = await formDataWithToken('activity', Fdat);
            getdata();
            setMessage(rsp.message)
            setStatus(rsp.success);
            setTimeout(() => {
                setMessage('');
                setStatus('');
                setOpen(false);
            }, 2000)
        }
        if (title && editid) {
            const Fdat = new FormData();
            Fdat.append('title', title);
            if (image) {
                Fdat.append('image', image);
            }
            const rsp: API = await formDataWithTokenUpdate('seller/' + editid, Fdat);
            getdata();
            setMessage(rsp.message)
            setStatus(rsp.success);
            setEditid('')
            setTimeout(() => {
                setMessage('');
                setStatus('');
            }, 2000)
        }

    }
    const getdata = async () => {
        await getData('activity').then((resp) => {
            setSellers(resp.data);
        })
    }


    useEffect(() => {
        const found = sellers.find(obj => obj._id == editid);
        if (found) {
            setTitle(found.title);
        }
    }, [editid])
    React.useEffect(() => {
        getdata();
    }, [])

    const showDeleteConfirmation = (id: string) => {
        setDeleteId(id);
        setConfirmDelete(true);
    }

    const handleDeleteConfirmed = async () => {
        await delete_data('activity/' + deleteId);
        getdata();


        setConfirmDelete(false) // Hide confirmation modal after delete
    }

    return (
        <>
            {confirmDelete && (
                <ConfirmPopup

                    onConfirm={handleDeleteConfirmed}
                    onCancel={() => setConfirmDelete(false)}
                />
            )}
            <section>
                <div className="container">
                    <div className="w-full mb-5 text-end">
                        <button onClick={() => setOpen(true)} className='bg-primary text-white rounded text-xs p-2'>Add New</button>
                    </div>
                    <Collapse open={open} >

                        <div className="w-full mb-5">

                            {
                                message && (
                                    <>
                                        <div className={`w-full rounded-md ${status == "1" ? 'bg-green-700' : 'bg-red-700'}`}>
                                            <div className="w-full rounded-md p-4 text-white">
                                                {message}
                                            </div>
                                        </div>
                                    </>
                                )
                            }

                            <div className="grid grid-cols-2 gap-5">
                                <div className="col-span-1">
                                    <div className="w-full">
                                        <Input onChange={handlefile} type="file" label='Activity Logo' onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                                    </div>
                                </div>
                                <div className="col-span-1">
                                    <div className="w-full">

                                        <Input value={title} onChange={(e) => setTitle(e.target.value)} type="text" label='Activity Title' onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />

                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <Textarea label='Description' onChange={(e) => setDescription(e.target.value)} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                                </div>
                                <div className="col-span-2">
                                    <button onClick={postdata} className="bg-primary py-2 rounded text-white px-4 ">
                                        {editid ? 'Update' : 'Save New'}
                                    </button>
                                </div>
                            </div>

                        </div>
                    </Collapse>
                    <div className="w-full">
                        <table className="w-full table-fixed">
                            <thead>
                                <tr className='*:text-start *:text-sm *:border *:border-blue-gray-200 *:p-2'>
                                    <th>Sr No</th>
                                    <th>Logo</th>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    sellers.map((sell, idx) => (
                                        <>
                                            <tr className='*:text-start *:text-sm *:border *:border-blue-gray-200 *:p-2'>
                                                <td>
                                                    {idx + 1}
                                                </td>
                                                <td>
                                                    <img src={base_url + sell.image} alt="" className="size-20 rounded-full" />
                                                </td>
                                                <td>
                                                    {sell.title}
                                                </td>
                                                <td>
                                                    <button onClick={() => showDeleteConfirmation(sell._id)} title='delete' className='bg-amber-900 text-white size-8'>
                                                        <DeleteOutlined />
                                                    </button>
                                                    <button onClick={() => setEditid(sell._id)}>
                                                        Edit
                                                    </button>
                                                </td>
                                            </tr>
                                        </>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Activity
