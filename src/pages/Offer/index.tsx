import React, { useEffect } from 'react'

import '@smastrom/react-rating/style.css'
import { getData, postDataWithToken, updateDataWithToken } from '../../utils';
import { Switch } from '@material-tailwind/react';
import { useLocation } from 'react-router-dom';
const Offer = () => {
    interface ApiResponse {
        success: string;
        message: string;
    }
    interface ASK {
        _id: string;

        discount_percent: string;
        is_Active: boolean;

        title: string;
        start_at: string;
        product: {
            title: string;
        }
        end_at: string;



    }

    const { state } = useLocation()

    useEffect(() => {
        if (state) {
            setproduct(state)
        }
    }, [])
    const [mesg, setMsg] = React.useState<string>('');
    // const [code_for, setcode_for] = React.useState<string>('');

    const [startat, setstartat] = React.useState<string>('');
    const [product, setproduct] = React.useState<string>('');
    const [endat, setendat] = React.useState<string>('');
    // const [active, setactive] = React.useState<string>('');


    const [discount, setdiscount] = React.useState<string>('');
    const [data, setData] = React.useState<ASK[]>([]);
    const [productdata, setproductdata] = React.useState<ASK[]>([]);





    const save_data = async () => {


        const Fdata = {

            start_at: startat,
            end_at: endat,
            product: product,
            discount_percent: discount,


        }
        const resp: ApiResponse = await postDataWithToken('offer', Fdata);
        if (resp) {
            getdata();
            setMsg(resp?.message);
            setTimeout(() => {
                setMsg('');

            }, 1000);
        }
    };
    // const deletepromocode = async (id: string) => {
    //     await delete_data('offer/' + id).then(resp => {
    //         if (resp) {
    //             getdata();
    //             setMsg(resp?.message);

    //             setTimeout(() => {
    //                 setMsg('');

    //             }, 1000);
    //         }
    //     })
    // }


    const handleactive = async (id: string, active: boolean) => {
        const data = {
            is_Active: !active
        }
        await updateDataWithToken('offer/' + id, data).then(resp => {
            if (resp) {
                getdata();
                // setMsg(resp?.message);

                // setTimeout(() => {
                //     setMsg('');

                // }, 1000);
            }
        })
    }


    const getdata = async () => {
        await getData('offer').then((resp) => {
            setData(resp.data);
        })
    }


    const getproduct = async () => {
        await getData('product').then((resp) => {
            setproductdata(resp.data);
        })
    }
    useEffect(() => {
        getdata();
        getproduct()
    }, [])
    return (
        <>
            <section className="py-10">
                <div className="container mx-auto">
                    <div className="grid grid-cols-6 gap-3 mb-10">
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

                        {/* <div className="col-span-1">
                            <label htmlFor="">Code For</label>
                            <input type="text" onChange={(e) => setcode_for(e.target.value)} value={code_for} className="form-control" />
                        </div> */}



                        <div className="col-span-1">
                            <label htmlFor="">Select Product</label>
                            <select className="form-control" onChange={(e) => setproduct(e.target.value)} value={product} >
                                <option value="">--Select--</option>
                                {productdata.map((item) => {
                                    return (
                                        <>
                                            <option value={item._id}>{item.title}</option>
                                        </>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="">Discount %</label>
                            <input title="discount" type="text" onChange={(e) => setdiscount(e.target.value)} value={discount} className="form-control" />
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="">Enter Start Date</label>
                            <input title="date" type="date" onChange={(e) => setstartat(e.target.value)} value={startat} className="form-control" />
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="">Enter End Date</label>
                            <input title="discount" type="date" onChange={(e) => setendat(e.target.value)} value={endat} className="form-control" />
                        </div>




                        <div className="col-span-1">
                            <label htmlFor="" className='block'>&nbsp;</label>
                            <button onClick={save_data} className="px-3 text-white text-sm py-2 bg-blue-800 rounded-md">Save Offer</button>
                        </div>
                    </div>
                    <div className="w-full mt-6">
                        <table className="w-full">
                            <thead>
                                <tr className='*:text-sm *:border *:border-blue-gray-200 *:p-2 *:text-start'>
                                    <th>Sr</th>
                                    <th>Product</th>
                                    <th>Discount Percent</th>

                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>is Active</th>
                                    {/* <th>Action</th> */}
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

                                                    {test.product.title}
                                                </td>
                                                <td>
                                                    {test.discount_percent}
                                                </td>
                                                <td>
                                                    {test.start_at}
                                                </td>

                                                <td>
                                                    {test.end_at}
                                                </td>
                                                <td>
                                                    <Switch onClick={() => handleactive(test._id, test.is_Active)} checked={test.is_Active} color='indigo' onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                                                </td>
                                                {/* <td>
                                                    <div className=" gap-2 hidden">
                                                        <button onClick={() => deletepromocode(test._id)} title='delete button' className="bg-amber-900  text-white size-10 rounded-md">
                                                            <DeleteOutlined />
                                                        </button>


                                                    </div>
                                                </td> */}
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

export default Offer
