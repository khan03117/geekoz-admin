import React, { useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import { base_url, delete_data, formDataWithToken, getData, updateDataWithToken } from '../../utils';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Switch } from '@material-tailwind/react';
const CreateTestimonial = () => {
    interface ASK {
        _id: string;
        name: string;
        subject: string;
        description: string;
        rating: string;
        image: string;
        product: string;
        is_hidden: boolean;
    }
    const [data, setData] = useState<ASK[]>([]);
    const [rating, setRating] = React.useState<string | number>('0');
    const [image, setImage] = useState<File>();
    const [mesg, setMsg] = React.useState<string>('');
    const [subject, setSubject] = React.useState<string>('');
    const [name, setName] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [status, setStatus] = React.useState<string>('');

    const handlefile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    }
    const save_data = async () => {
        const Fdata = new FormData();
        if (image) {
            Fdata.append('image', image);
        }
        Fdata.append('name', name);
        Fdata.append('description', description);
        Fdata.append('subject', subject);
        Fdata.append('rating', rating.toString());
        await formDataWithToken('testimonial', Fdata).then((resp) => {
            if (resp) {
                getdata();
                setMsg(resp?.message);
                setStatus(resp?.success);
                setTimeout(() => {
                    setMsg('');
                    setStatus('0');
                }, 1000);
            }
        })
    };
    const deletebanner = async (id: string) => {
        await delete_data('testimonial/' + id).then(resp => {
            if (resp) {
                getdata();
                setMsg(resp?.message);
                setStatus(resp?.success);
                setTimeout(() => {
                    setMsg('');
                    setStatus('0');
                }, 1000);
            }
        })
    }
    const getdata = async () => {
        await getData('testimonial/admin').then((resp) => {
            setData(resp.data);
        })
    }
    const handleshow = async (id: string) => {
        await updateDataWithToken('testimonial/show-control/' + id, {});
        getdata();
    }
    useEffect(() => {
        getdata();
    }, [])
    return (
        <>
            <section className="py-10">
                <div className="container mx-auto">
                    <div className="grid grid-cols-4 gap-4 mb-10">
                        {
                            mesg && (
                                <>
                                    <div className={`col-span-5 rounded-md ${status == "1" ? 'bg-green-700' : 'bg-red-700'}`}>
                                        <div className="w-full rounded-md p-4 text-white">
                                            {mesg}
                                        </div>
                                    </div>
                                </>
                            )
                        }

                        <div className="col-span-1">
                            <label htmlFor="">Enter Client Name</label>
                            <input title='name' type="text" onChange={(e) => setName(e.target.value)} value={name} className="form-control" />
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="">Enter Subject</label>
                            <input title='name' type="text" onChange={(e) => setSubject(e.target.value)} value={subject} className="form-control" />
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="">Select Image</label>
                            <input title="image" onChange={handlefile} type="file" className="w-full p-2 border border-blue-gray-200" />
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="">Enter Rating</label>
                            <Rating style={{ maxWidth: 200 }} value={typeof rating === 'number' ? rating : parseInt(rating)} onChange={setRating} />
                        </div>
                        <div className="col-span-4">
                            <label htmlFor="">Enter Description</label>
                            <textarea maxLength={100} title='description' onChange={(e) => setDescription(e.target.value)} name="" id="" className="w-full p-2 border border-blue-gray-200" ></textarea>
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="" className='block'>&nbsp;</label>
                            <button onClick={save_data} className="px-3 text-white text-sm py-2 bg-blue-800 rounded-md">Save Testimonial</button>
                        </div>
                    </div>
                    <div className="w-full mt-6">
                        <table className="w-full">
                            <thead>
                                <tr className='*:text-sm *:border *:border-blue-gray-200 *:p-2 *:text-start'>
                                    <th>Sr</th>
                                    <th>User</th>
                                    <th>Rating</th>
                                    <th>Subject</th>
                                    <th>Description</th>
                                    <th>Show</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((test, idx) => (
                                        <>
                                            <tr className='*:text-sm *:border *:border-blue-gray-200 *:p-2 *:text-start'>
                                                <td>
                                                    {idx + 1}
                                                </td>
                                                <td>
                                                    <img src={base_url + test.image} alt="" className=" rounded-full size-10" />
                                                    {test.name}
                                                </td>
                                                <td>
                                                    {test.rating}
                                                </td>
                                                <td>
                                                    {test.subject}
                                                </td>

                                                <td>
                                                    {test.description}
                                                </td>
                                                <td>
                                                    <Switch color='blue' onClick={() => handleshow(test._id)} checked={!test.is_hidden} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                                                </td>
                                                <td>
                                                    <div className="flex gap-2">
                                                        <button onClick={() => deletebanner(test._id)} title='delete button' className="bg-amber-900 text-white size-10 rounded-md">
                                                            <DeleteOutlined />
                                                        </button>
                                                        <button title='delete button' className="bg-blue-900 hidden text-white size-10 rounded-md">
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

export default CreateTestimonial
