import React, { useEffect, useState } from 'react'

import '@smastrom/react-rating/style.css'
import { delete_data, getData, postDataWithToken } from '../../utils';
import { DeleteOutlined } from '@ant-design/icons';
import ConfirmPopup from '../../layout/ConfirmPopup';
const PromoCodes = () => {
    interface ASK {
        _id: string;
        code_for: string;
        promocode: string;
        start_at: string;
        end_at: string;
        promo_code: string;
        discount: string;
        discount_type: string

    }
    const [data, setData] = useState<ASK[]>([]);


    // const [mesg, setMsg] = React.useState<string>('');
    // const [code_for, setcode_for] = React.useState<string>('');
    const [promocode, setpromocode] = React.useState<string>('');
    const [startat, setstartat] = React.useState<string>('');
    const [endat, setendat] = React.useState<string>('');
    const [discount, setdiscount] = React.useState<string>('');

    const [discount_type, setDiscountType] = useState<string>('Percent');
    const [deleteId, setDeleteId] = React.useState<string | null>(null);
    const [confirmDelete, setConfirmDelete] = React.useState<boolean>(false);

    const save_data = async () => {
        const Fdata = {
            code_for: 'All',
            promo_code: promocode,
            start_at: startat,
            end_at: endat,
            discount: discount,
            discount_type: discount_type

        }
        await postDataWithToken('promocode', Fdata).then((resp) => {
            if (resp) {
                getdata();

                // setTimeout(() => {
                //     setMsg('');
                //     setStatus('0');
                // }, 1000);
            }
        })
    };
    // const deletepromocode = async (id: string) => {
    //     await delete_data('promocode/' + id).then(resp => {
    //         if (resp) {
    //             getdata();
    //             setMsg(resp?.message);

    //             setTimeout(() => {
    //                 setMsg('');

    //             }, 1000);
    //         }
    //     })
    // }




    const getdata = async () => {
        await getData('promocode').then((resp) => {
            setData(resp.data);
        })
    }
    useEffect(() => {
        getdata();
    }, [])

    const showDeleteConfirmation = (id: string) => {
        setDeleteId(id);
        setConfirmDelete(true);
    }

    const handleDeleteConfirmed = async () => {
        await delete_data('promocode/' + deleteId);
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
            <section className="py-10">
                <div className="container mx-auto">
                    <div className="grid grid-cols-6 gap-3 mb-10">
                        {/* {
                            mesg && (
                                <>
                                    <div className={`col-span-5 rounded-md ${status == "1" ? 'bg-green-700' : 'bg-red-700'}`}>
                                        <div className="w-full rounded-md p-4 text-white">
                                            {mesg}
                                        </div>
                                    </div>
                                </>
                            )
                        } */}

                        {/* <div className="col-span-1">
                            <label htmlFor="">Code For</label>
                            <input type="text" onChange={(e) => setcode_for(e.target.value)} value={code_for} className="form-control" />
                        </div> */}
                        <div className="col-span-1">
                            <label htmlFor="">Enter Promo Code</label>
                            <input type="text" placeholder='Enter Unique Code' onChange={(e) => setpromocode(e.target.value)} value={promocode} className="form-control" />
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="">Discount Amount</label>
                            <input type="number" placeholder='Enter Discount amount' onChange={(e) => setdiscount(e.target.value)} value={discount} className="form-control" />
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="">Discount Type</label>
                            <select className="form-control" onChange={(e) => setDiscountType(e.target.value)} value={discount_type} >
                                <option value="Percent">Percent</option>
                                <option value="Fixed">Fixed</option>
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="">Enter Start Date</label>
                            <input placeholder='Enter start date' type="date" onChange={(e) => setstartat(e.target.value)} value={startat} className="form-control" />
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="">Enter End Date</label>
                            <input type="date" placeholder='Enter End date' onChange={(e) => setendat(e.target.value)} value={endat} className="form-control" />
                        </div>




                        <div className="col-span-1">
                            <label htmlFor="" className='block'>&nbsp;</label>
                            <button onClick={save_data} className="px-3 text-white text-sm py-2 bg-blue-800 rounded-md">Save Promo Code</button>
                        </div>
                    </div>
                    <div className="w-full mt-6">
                        <table className="w-full">
                            <thead>
                                <tr className='*:text-sm *:border *:border-blue-gray-200 *:p-2 *:text-start'>
                                    <th>Sr</th>
                                    <th>Promo Code For</th>
                                    <th>Promo Code</th>
                                    <th>Discount</th>
                                    <th>Discount Type</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
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

                                                    {test.code_for}
                                                </td>
                                                <td>
                                                    {test.promo_code}
                                                </td>
                                                <td>
                                                    {test.discount}
                                                </td>

                                                <td>
                                                    {test.discount_type}
                                                </td>
                                                <td>
                                                    {test.start_at}
                                                </td>

                                                <td>
                                                    {test.end_at}
                                                </td>
                                                <td>
                                                    <div className="flex gap-2">
                                                        <button onClick={() => showDeleteConfirmation(test._id)} title='delete button' className="bg-amber-900 text-white size-10 rounded-md">
                                                            <DeleteOutlined />
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

export default PromoCodes
