import React from 'react'
import { base_url, delete_data, getData } from '../../utils';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const ViewCountry = () => {
    interface Country {
        _id: string,
        region: {
            _id: string;
            region: string;
        },
        title: string;
        country: string;
        image: string;
        idx: number;
        customFields?: {
            [key: string]: string | number | boolean | object | null;
        };
    }
    const [data, setData] = React.useState<Country[]>([]);
    const getdata = async () => {
        await getData('country').then((resp) => {
            setData(resp.data);
        })
    }
    const deletecategory = async (id: string) => {
        await delete_data('country/delete/' + id);
        getdata()
    }
    React.useEffect(() => {
        getdata();
    }, []);
    return (
        <>
            <div className="w-full mt-10">
                <div className="w-full mb-5 text-end">
                    <Link to={'/countries'} className='bg-primary px-4 py-2 text-xs text-white'>Add New Destination</Link>
                </div>
                <table className="w-full *:text-start table-fixed">
                    <thead>
                        <tr className='*:text-start  *:bg-primary *:text-white *:border *:border-blue-gray-300 *:p-2'>
                            <th>Sr No</th>
                            <th>Region</th>
                            <th>Country</th>
                            <th>Destination</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.length > 0 && data.map((itm, index) => (
                                <>
                                    <tr className='*:text-sm *:border *:border-blue-gray-300 *:p-2'>
                                        <td>
                                            {index + 1}
                                        </td>
                                        <td>{itm?.region?.region}</td>
                                        <td>
                                            {itm.country}
                                        </td>
                                        <td>
                                            {itm.title}
                                        </td>
                                        <td>
                                            <img src={base_url + itm.image} alt="" className="w-full h-20 object-contain rounded-none" />
                                        </td>

                                        <td>
                                            <div className="inline-flex gap-2">
                                                <button type='button' onClick={() => deletecategory(itm._id)} title='delet button' className="bg-red-500 text-xs uppercase tracking-widest text-white px-4 py-2 rounded-md">
                                                    <DeleteOutlined />
                                                </button>
                                                <button type='button' title='Edit button' className="bg-indigo-500 text-xs uppercase tracking-widest text-white px-4 py-2 rounded-md">
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
        </>
    )
}

export default ViewCountry
