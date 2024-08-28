/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons'
import React, { useEffect } from 'react'
import { base_url, getData, postDataWithToken, updateDataWithToken } from '../../utils';
import { Dialog, DialogBody, DialogHeader } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

const CreateCategory = () => {
    interface Category {
        _id: string,
        title: string,
        image: string,
        is_hidden: boolean,
        idx: number
    }
    const navigate = useNavigate();
    const [title, setTitle] = React.useState<string>('');
    const [mesg, setMsg] = React.useState<string>();
    const [data, setData] = React.useState<Category[]>([]);
    const [open, setOpen] = React.useState<boolean>(false);
    const [cid, setCid] = React.useState<string>('');
    const [idx, setIDX] = React.useState<number | null>(null);
    const handletitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }
    const updatedata = async () => {

        try {
            interface ApiResp { message: string, success: string }
            const resp: ApiResp = await updateDataWithToken('category/' + cid, { title: title, idx: idx ?? false }, navigate);
            setMsg(resp.message);
            getdata();
            setTitle('');
            setCid('');
            setOpen(false);
        } catch (error) {
            console.log(mesg)
            console.error('Error:', error);
        }
    }
    const postdata = async () => {
        const data = { title: title }
        try {
            interface ApiResp { message: string; success: string; }
            const resp: ApiResp = await postDataWithToken('category', data, navigate);
            setMsg(resp.message);
            getdata();
            setTitle('');
        } catch (error) {
            console.log(mesg)
            console.error('Error:', error);
        }
    };
    const getdata = async () => {
        await getData('category', navigate).then((resp) => {
            setData(resp.data);
        })
    }
    const deletecategory = async (id: string) => {
        await fetch(base_url + 'api/v1/category/delete/' + id, {
            method: "DELETE"
        }).then((resp) => {
            console.log(resp);
            getdata();
        })
    }
    useEffect(() => {
        getdata();
    }, []);
    const handleopen = () => {
        setOpen(!open);
    }
    const set_title = () => {
        const foundata = data.find(obj => obj._id == cid);
        if (foundata) {
            setTitle(foundata.title);
        } else {
            setTitle('')
        }
    }
    const handleEdit = (id: string) => {
        setCid(id);
        setOpen(!open);
    }
    useEffect(() => {
        set_title();
    }, [cid])

    return (
        <>
            {
                open && (
                    <>
                        <Dialog open={open} handler={handleopen} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <DialogHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                <h4>Edit Country</h4>
                            </DialogHeader>
                            <DialogBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                <div className="form-group mb-4">
                                    <label htmlFor="" className='form-label'>Sort Index</label>
                                    <input type="number" placeholder='Enter idx' value={idx ? idx : ''} onChange={(e) => setIDX(parseInt(e.target.value))} className="w-full outline-none p-2 border border-blue-gray-300 rounded-sm" />
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="" className='form-label'>Enter Country</label>
                                    <input title='country' type="text" value={title} onChange={handletitle} className="form-control" />
                                </div>

                                <div className="form-group">
                                    <button onClick={updatedata} className="w-full bg-primary text-white py-2 shadow-md shadow-blue-gray-200">Update Category</button>
                                </div>
                            </DialogBody>
                        </Dialog>
                    </>
                )
            }
            <section>
                <div className="container">
                    <div className="grid grid-cols-3 gap-4 *:required:form-control">
                        {
                            mesg && (
                                <>
                                    <div className="col-span-3">
                                        <div className="w-full p-2 text-dark bg-indigo-200">
                                            {mesg}
                                        </div>
                                    </div>
                                </>
                            )
                        }

                        <div className="col-span-1">
                            <label htmlFor="" className='form-label'>Enter Category</label>
                            <input title='category' type="text" value={title} onChange={handletitle} className="form-control" />
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="" className='block mb-2'>&nbsp;</label>
                            <button type='button' onClick={postdata} title='button' className="text-sm bg-primary px-4 uppercase font-light tracking-widest py-2 rounded-lg shadow-lg  text-white"><SaveOutlined /> Save Category</button>
                        </div>
                    </div>
                    <div className="w-full mt-10">
                        <table className="w-full *:text-start table-fixed">
                            <thead>
                                <tr className='*:text-start  *:bg-primary *:text-white *:border *:border-blue-gray-300 *:p-2'>
                                    <th>Sr No</th>
                                    <th>Country</th>
                                    <th>Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.length > 0 && data.map((itm) => (
                                        <>
                                            <tr className='*:text-sm *:border *:border-blue-gray-300 *:p-2'>
                                                <td>
                                                    {itm.idx}
                                                </td>
                                                <td>
                                                    {itm.title}
                                                </td>


                                                <td>
                                                    <div className="inline-flex gap-2">
                                                        <button type='button' onClick={() => deletecategory(itm._id)} title='delet button' className="bg-red-500 text-xs uppercase tracking-widest text-white px-4 py-2 rounded-md">
                                                            <DeleteOutlined />
                                                        </button>
                                                        <button type='button' onClick={() => handleEdit(itm._id)} title='Edit button' className="bg-indigo-500 text-xs uppercase tracking-widest text-white px-4 py-2 rounded-md">
                                                            <EditOutlined />
                                                        </button>
                                                    </div>
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


export default CreateCategory
