import React, { useEffect, useState } from 'react'
import Label from '../Package/Label'
import { getData, postDataWithToken, updateDataWithToken } from '../../utils';
import { useNavigate } from 'react-router-dom';

const Region: React.FC = () => {
    const navigate = useNavigate();
    interface Region {
        _id: string;
        region: string;
    }
    const [region, setRegion] = useState('');
    const [editid, setEditId] = useState<string>('');
    const [regions, setRegions] = useState<Region[]>([]);
    const [message, setMessage] = useState<string>('')
    const getdata = async () => {
        const items = await getData('region', navigate);
        setRegions(items.data);
    }
    const handleedit = (id: string) => {
        const found = regions.find(obj => obj._id == id);
        if (found) {
            setRegion(found.region)
            setEditId(id);
        }
    }
    const handledata = async () => {
        const url = editid ? 'region/' + editid : 'region';
        if (editid) {
            await updateDataWithToken(url, { region: region }, navigate)
        } else {
            await postDataWithToken(url, { region: region }, navigate);
        }
        getdata();
        setEditId('');
        setMessage('Data updated successfully');
        setTimeout(() => {
            setMessage('')
        }, 1000);
    }
    useEffect(() => {
        getdata();
    }, []);

    return (
        <>
            <section className="py-5">
                <div className="container">
                    <div className="grid grid-cols-4">
                        <div className="col-span-4 mb-5">
                            {
                                message && (
                                    <>
                                        <div className="w-full  p-5 bg-secondary/10 shadow-md shadow-secondary text-secondary rounded ">
                                            {message}
                                        </div>
                                    </>
                                )
                            }
                        </div>
                        <div className="col-span-2">
                            <Label title={'Create New Region'} hfor={null} />
                            <div className="w-full flex">
                                <input type="text" value={region} onChange={(e) => setRegion(e.target.value)} placeholder='Enter Unique Region' className="w-full p-2 text-sm outline-none border border-blue-gray-200" />
                                <button onClick={handledata} className="px-5 text-xs bg-primary text-nowrap text-white rounded-e">Save Region</button>
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div className="w-full mt-4">
                                <table className="w-full">
                                    <thead>
                                        <tr className='*:text-start *:text-sm *:p-1 *:border *:border-blue-gray-200'>
                                            <th>Sr No</th>
                                            <th>Region</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            regions.map((itm, index) => (
                                                <>
                                                    <tr className='*:text-start *:text-sm *:p-1 *:border *:border-blue-gray-200'>
                                                        <td>
                                                            {index + 1}
                                                        </td>
                                                        <td>
                                                            {itm.region}
                                                        </td>
                                                        <td>
                                                            <button onClick={() => handleedit(itm._id)} className="bg-primary px-4 text-white rounded text-sm">Edit</button>
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
                </div>
            </section>
        </>
    )
}

export default Region
