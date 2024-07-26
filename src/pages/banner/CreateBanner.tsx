import React, { useEffect, useState } from 'react'
import { base_url, delete_data, formDataWithToken, getData } from '../../utils';
import { DeleteOutlined } from '@ant-design/icons';
import Label from '../Package/Label';
import ConfirmPopup from '../../layout/ConfirmPopup';
const CreateBanner = () => {
    interface Banner {
        _id: string;
        url: string;
        type: string;
        image: string;
        heading?: string;
        text?: string
    }
    const [image, setImage] = useState<File>();
    const [banners, setBanner] = useState<Banner[]>([]);
    const [heading, setHeading] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [type, setType] = useState('Banner');
    const [mesg, setMsg] = React.useState<string>();
    const [status, setStatus] = React.useState<string>();
    const [deleteId, setDeleteId] = React.useState<string | null>(null);
    const [confirmDelete, setConfirmDelete] = React.useState<boolean>(false);
    const [slug, setSlug] = React.useState<string>();
    const handlefile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    }
    const getbanners = async () => {
        await getData('banner').then(resp => {
            setBanner(resp.data)
        })
    }

    const save_banner = async () => {
        const Fdata = new FormData();
        if (image) {
            Fdata.append('image', image);
            Fdata.append('heading', heading);
            Fdata.append('text', text);
            if (slug) {
                Fdata.append('url', slug);
            }

        }
        Fdata.append('type', type);
        await formDataWithToken('banner', Fdata).then((resp) => {
            if (resp) {
                getbanners();
                setMsg(resp?.message);
                setStatus(resp?.success);
                setTimeout(() => {
                    setMsg('');
                    setStatus('0');
                }, 1000);
            }
        })

    }
    useEffect(() => {
        getbanners();
    }, [])
    const showDeleteConfirmation = (id: string) => {
        setDeleteId(id);
        setConfirmDelete(true);
    }

    const handleDeleteConfirmed = async () => {
        await delete_data('banner/' + deleteId).then(resp => {
            if (resp) {
                getbanners();
                setMsg(resp?.message);
                setStatus(resp?.success);
                setTimeout(() => {
                    setMsg('');
                    setStatus('0');
                }, 1000);
            }
        })
        getbanners();


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
            <section className="py-5">
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

                        <div className="col-span-1 hidden">
                            <Label title={'Select Type'} hfor={null} />
                            <select onChange={(e) => setType(e.target.value)} className="w-full p-1 border border-blue-gray-200">
                                <option value="Banner">Banner</option>
                            </select>
                        </div>
                        <div className="col-span-1">
                            <Label title={'Select Image'} hfor={null} />
                            <input title="image" onChange={handlefile} type="file" className="w-full p-1 border rounded text-sm border-blue-gray-200" />
                        </div>
                        <div className="col-span-1 ">
                            <Label title={'Enter Url'} hfor={null} />
                            <input title="text" onChange={(e) => setSlug(e.target.value)} type="text" value={slug} className="w-full p-2 border border-blue-gray-200  rounded text-sm" />
                        </div>
                        <div className="col-span-1">
                            <Label title={'Enter Heading'} hfor={null} />
                            <input title="text" onChange={(e) => setHeading(e.target.value)} type="text" value={heading} className="w-full p-2 border border-blue-gray-200  rounded text-sm" />
                        </div>
                        <div className="col-span-4 hidden">
                            <Label title={'Enter Text'} hfor={null} />
                            <input title="text" onChange={(e) => setText(e.target.value)} type="text" value={text} className="w-full p-2 border border-blue-gray-200  rounded text-sm" />
                        </div>
                        <div className="col-span-1">

                            <button onClick={save_banner} className="px-3 text-white rounded block mt-8 shadow-sm shadow-blue-gray-200 text-sm py-2 bg-blue-800">Save Banner</button>
                        </div>
                    </div >
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <div className="w-full">
                                <table className="w-full">
                                    <thead>
                                        <tr className='*:text-sm *:border *:border-blue-gray-200 *:p-2 *:text-start'>
                                            <th>Sr No</th>
                                            <th>Type</th>
                                            <th>Url</th>
                                            <th>Image</th>
                                            <th>Heading</th>
                                            <th>text</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            banners.map((bann, index) => (
                                                <>
                                                    <tr className='*:text-sm  *:border-blue-gray-200 *:border *:p-2'>
                                                        <td>
                                                            {index + 1}
                                                        </td>
                                                        <td>
                                                            {bann.type}
                                                        </td>
                                                        <td>
                                                            {bann.url}
                                                        </td>
                                                        <td>
                                                            <img src={base_url + bann.image} alt="" className="w-[200px] h-auto" />
                                                        </td>
                                                        <td>
                                                            {bann.heading}
                                                        </td>
                                                        <td>
                                                            {bann.text}
                                                        </td>
                                                        <td>
                                                            <div className="flex gap-2">
                                                                <button onClick={() => showDeleteConfirmation(bann._id)} title='delete button' className="bg-amber-900 text-white size-10 rounded-md">
                                                                    <DeleteOutlined />
                                                                </button>
                                                                {/* <button title='delete button' className="bg-blue-900 text-white size-10 rounded-md">
                                                                    <EditOutlined />
                                                                </button> */}
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


                    </div>
                </div >
            </section >
        </>
    )
}

export default CreateBanner
