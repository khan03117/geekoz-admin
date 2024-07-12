import React, { useEffect, useState } from 'react'
import { DeleteOutlined, EditOutlined, SaveOutlined, SearchOutlined } from '@ant-design/icons'
import { base_url, getData, postDataWithToken, updateDataWithToken } from '../../utils';
import Swal from 'sweetalert2';

const ModalCreate: React.FC = () => {
    interface ApiResponse {
        success: string,
        message: string
    }

    interface Brand {
        title: string,
        url: string,
        image: string,
        _id: string
    }

    interface Modal {
        title: string,
        url: string,
        image: string,
        _id: string,
        modals: Brand[]
    }

    // const [image, setImage] = React.useState<File | null>(null);
    const [title, setTitle] = React.useState<string>('');
    const [brands, setBrand] = React.useState<Brand[]>([]);
    const [brand_id, setBrandId] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [modals, setModels] = useState<Modal[]>([]);
    const [keyword, setKeyword] = useState<string>('');
    const [edit, setEdit] = useState<boolean>(false);
    const [editid, setEditid] = useState<string>('');

    const getbrands = async () => {
        await getData('brand').then(resp => {
            setBrand(resp.data)
        })
    }
    const getModals = async () => {
        await getData('modal?title=' + (keyword.length > 2 ? keyword : '')).then(resp => {
            setModels(resp.data)
        })
    }
    const handlebrandid = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setBrandId(e.target.value);
    }
    const handlekeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    }
    useEffect(() => {
        getModals()
        getbrands();
    }, [keyword]);
    const handleedit = (id: string) => {
        if (editid == id) {
            setEditid('');
            setEdit(false);

        } else {
            const found = modals.find(obj => obj.modals.find(ob => ob._id == id));
            if (found) {
                const modl = found.modals.find(obj => obj._id == id)
                if (modl) {
                    setTitle(modl.title)
                }
                setEditid(id);
                setEdit(true);
            }

        }

    }


    // const handleimage = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files && e.target.files.length > 0) {
    //         setImage(e.target.files[0]);
    //     }
    // }

    const handletitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }
    const handledeletemodal = (id: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'User will have Admin Privileges',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await fetch(base_url + 'api/v1/modal/delete/' + id, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                getModals();
            }
        })
    }
    const updatemodal = async () => {
        const data = {
            title: title
        }
        const resp: ApiResponse = await updateDataWithToken('modal/' + editid, data);
        setMessage(resp.message);
        setStatus(resp.success);
        setEdit(false);
        setEditid('')
        getModals();
        setTimeout(() => {
            setMessage('');
            setStatus('');
        }, 1000);
    }

    const postdata = async () => {
        const data = {
            title: title,
            brand: brand_id
        }
        const resp: ApiResponse = await postDataWithToken('modal', data);
        setMessage(resp.message);
        setStatus(resp.success);
        getModals();
        setTimeout(() => {
            setMessage('');
            setStatus('');
        }, 1000);
    }
    return (
        <section>
            <div className="container">

                <div className="grid grid-cols-4 gap-5">
                    {
                        message && (
                            <>
                                <div className={`col-span-4 rounded-md ${status == "1" ? 'bg-green-700' : 'bg-red-700'}`}>
                                    <div className="w-full rounded-md p-4 text-white">
                                        {message}
                                    </div>
                                </div>
                            </>
                        )
                    }
                    <div className="col-span-1">
                        <label htmlFor="">Select Brand</label>
                        <select onChange={handlebrandid} className="form-select form-control">
                            <option value="">--Select---</option>
                            {
                                brands.map(brnd => (
                                    <>
                                        <option value={brnd._id}>{brnd.title}</option>
                                    </>
                                ))
                            }


                        </select>
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="">Enter New Modal</label>
                        <input title='Brand' type="text" onChange={handletitle} name="" id="" className="form-control" />
                    </div>

                    <div className="col-span-1">
                        <label htmlFor="" className='block mb-1'>&nbsp;</label>
                        <button type='button' onClick={postdata} title='button' className="text-sm bg-primary px-4 uppercase font-light tracking-widest py-2 rounded-lg shadow-lg  text-white"><SaveOutlined /> Save Modal</button>
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="" className='block mb-0'>&nbsp;</label>
                        <div className="flex border rounded-lg border-blue-gray-200 overflow-hidden w-full">
                            <span className="block p-2">
                                <SearchOutlined />
                            </span>
                            <input title='search' onChange={handlekeyword} value={keyword} placeholder='Search brand' type="text" className="w-full text-sm p-2 border-none outline-none focus:outline-none" />
                        </div>
                    </div>
                </div>
                <div className="w-full mt-5">
                    <div className="grid grid-cols-6 gap-4">
                        {
                            modals.length && modals.map((modal) => (
                                <>
                                    <div className="col-span-6">
                                        <div className="flex items-center bg-blue-gray-100 px-2">
                                            <img src={base_url + modal.image} className='size-10 block   object-contain me-3' alt="" />
                                            <h4 className="text-sm font-bold ">{modal.title}</h4>
                                        </div>

                                    </div>
                                    {
                                        modal.modals.map((modl) => (
                                            <>
                                                <div className="col-span-1 border-b border-blue-gray-300 last:border-none">
                                                    <div className="w-full group relative pt-5">
                                                        <span className="text-sm">   {modl.title}</span>
                                                        {
                                                            (edit && editid == modl._id) && (
                                                                <>
                                                                    <div className="flex border w-full border-blue-gray-200">
                                                                        <input placeholder="Enter title" type="text" onChange={handletitle} value={title} className="w-full focus-within:outline-none py-2 px-1 text-xs" />
                                                                        <button type='button' onClick={updatemodal} className="bg-primary text-white text-xs px-2 uppercase font-light tracking">Update</button>
                                                                    </div>
                                                                </>
                                                            )
                                                        }

                                                        <div className="absolute opacity-0 group-hover:opacity-100 top-0 end-0 inline-flex gap-1">
                                                            <button onClick={() => handleedit(modl._id)} title='edit button' className='text-indigo-900'>
                                                                <EditOutlined />
                                                            </button>
                                                            <button title='delete button' onClick={() => handledeletemodal(modl._id)} className='text-amber-800'>
                                                                <DeleteOutlined />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ))
                                    }

                                </>
                            ))
                        }

                    </div>

                </div>
            </div>
        </section>
    )
}

export default ModalCreate
