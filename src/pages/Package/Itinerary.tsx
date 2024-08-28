import React from 'react'
import { base_url, getData, postDataWithToken, updateDataWithToken } from '../../utils';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';

const Itinerary: React.FC = () => {
    const { url } = useParams();
    const navigate = useNavigate();
    interface Itinerary {
        _id: string;
        day: number;
        title: string;
        description: string;
    }

    interface Package {
        _id: string;
        url: string;
        title: string;

        package_type: string;
        price: number;

        about: string;
        days: number;
        nights: number;
        pax: number;
        inclusion: string;
        exclusion: string;
        itinerary: Itinerary[];
    }
    const [mpackage, setPackage] = React.useState<Package>();
    const getpackage = async () => {
        const item = await getData('package/show/' + url, navigate);
        setPackage(item.data);
    }
    const [title, setTitle] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [message, setMessage] = React.useState<string>('');
    const [status, setStatus] = React.useState<string>('');
    const [edit_id, setEditId] = React.useState<string>('')
    React.useEffect(() => {
        getpackage();
    }, []);
    if (!mpackage) {
        return "No product found";
    }
    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`${base_url}api/v1/package/itinerary/${mpackage._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itinerary_id: id }),
            });

            const result = await response.json();
            if (result.success) {
                getpackage();
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error('Error deleting itinerary:', error);
        }
    }
    const handleEdit = (id: string) => {
        setEditId(id);
        const found = mpackage.itinerary.find(obj => obj._id == id);
        console.log(found)
        if (found) {
            setTitle(found.title);
            setDescription(found.description);
        }
    }
    const addnewitinerary = async () => {
        const data = {
            title: title,
            description: description
        }
        interface ApiResponse { message: string; success: string }
        const resp: ApiResponse = await postDataWithToken('package/itinerary/' + mpackage._id, data, navigate);
        setMessage(resp.message);
        setStatus(resp.success);
        setInterval(() => {
            setMessage('');
            setStatus('');
        }, 1000);
        getpackage();
    }
    const update_itinerary = async () => {
        const data = {
            itinerary_id: edit_id,
            title: title,
            description: description
        }
        await updateDataWithToken('package/itinerary/' + mpackage._id, data, navigate);
        setEditId('');
        setTitle('');
        setDescription('');
        getpackage();

    }
    return (
        <>
            <section>
                <div className="container">
                    <div className="w-full mb-5 text-end">
                        <Link to={'/packages'} className="bg-primary px-2 text-white text-sm py-1">
                            <LeftOutlined />
                            Back</Link>
                    </div>
                    <div className="w-full mb-5 ">

                        <div className="grid grid-cols-4 shadow-md shadow-blue-gray-300 space-y-4 gap-4 p-3 bg-gray-300 rounded ">

                            {
                                message && (
                                    <>
                                        <div className={`col-span-4  rounded ${status == "1" ? 'bg-green-700' : 'bg-red-700'}`}>
                                            <div className="w-full rounded-md p-4 text-white">
                                                {message}
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                            <div className="col-span-4">

                                <label htmlFor="">Enter Title for Next Day</label>
                                <input placeholder='Enter Itinerary title' type="text" name="" id="" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded p-2 border border-blue-gray-200 outline-none " />

                            </div>
                            <div className="col-span-4">
                                <label htmlFor="">Enter Description for Itinerary</label>
                                <textarea value={description} placeholder='Enter descripton' rows={5} onChange={(e) => setDescription(e.target.value)} className="w-full border p-3 rounded border-blue-gray-200">{description}</textarea>
                            </div>
                            <div className="col-span-4">
                                <label htmlFor=""></label>
                                <button onClick={edit_id ? update_itinerary : addnewitinerary} className="px-4 bg-primary rounded py-2 text-white">
                                    {edit_id ? 'Update Itinerary' : "Add New Itinerary"}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="grid grid-cols-1">
                            {
                                mpackage?.itinerary && mpackage?.itinerary.map((itm) => (
                                    <>
                                        <div className="w-full p-2 bg-gray-300 shadow-md shadow-blue-gray-500 rounded mb-5">
                                            <div className="w-full flex justify-end gap-4 mb-4">
                                                <button onClick={() => handleEdit(itm._id)} className='px-2 py-1 text-sm bg-secondary text-white rounded ' >Edit</button>
                                                <button onClick={() => handleDelete(itm._id)} className='px-2 py-1 text-sm bg-primary text-white rounded'>Delete</button>
                                            </div>
                                            <div className="w-full">
                                                <p className='font-bold mb-2 text-sm'>{itm.title}</p>
                                            </div>
                                            <div className="w-full">
                                                {itm.description}
                                            </div>
                                        </div>
                                    </>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Itinerary
