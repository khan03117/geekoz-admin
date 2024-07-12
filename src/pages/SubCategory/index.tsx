import React, { useEffect, useState } from 'react'

import '@smastrom/react-rating/style.css'
import { base_url, delete_data, formDataWithToken, formDataWithTokenUpdate, getData } from '../../utils';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
const SubCategory = () => {
    interface ASK {
        _id: string;
        image: string;
        category: {
            _id: string;
            title: string;
            image: string;
        };
        description: string;
        is_hidden: string;
        url: string;

        title: string;
    }
    // interface CAT {
    //     _id: string;

    // }
    const [data, setData] = useState<ASK[]>([]);
    const [categorydata, setcategorydata] = useState<ASK[]>([]);

    const [image, setImage] = useState<File>();

    const [mesg, setMsg] = React.useState<string>('');



    const [title, settitle] = React.useState<string>('');
    const [editid, seteditid] = React.useState<string>('');

    const [category, setcategory] = React.useState<string>('');
    const [editimg, seteditimg] = React.useState<string>('');

    const [desc, setdesc] = React.useState<string>('');

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
        Fdata.append('title', title);
        Fdata.append('category', category)
        Fdata.append('description', desc);

        if (editid) {
            await formDataWithTokenUpdate(`subcategory/${editid}`, Fdata).then((resp) => {
                if (resp) {
                    getdata();
                    setMsg(resp?.message);

                    setTimeout(() => {
                        setMsg('');
                        seteditid("")

                    }, 1000);
                }
            })
        } else {
            await formDataWithToken('subcategory', Fdata).then((resp) => {
                if (resp) {
                    getdata();
                    setMsg(resp?.message);

                    setTimeout(() => {
                        setMsg('');

                    }, 1000);
                }
            })
        }
    };
    const deletesubcategory = async (id: string) => {
        await delete_data('subcategory/' + id).then(resp => {
            if (resp) {
                getdata();
                setMsg(resp?.message);

                setTimeout(() => {
                    setMsg('');

                }, 1000);
            }
        })
    }

    const editsubcategory = async (obj: ASK) => {
        settitle(obj.title);
        setdesc(obj.description)
        setcategory(obj.category._id)
        seteditimg(obj.image)
        seteditid(obj._id)
    }


    const getdata = async () => {
        await getData('subcategory').then((resp) => {
            setData(resp.data);
        })
    }
    const getcategory = async () => {
        await getData('category').then((resp) => {
            setcategorydata(resp.data);

        })
    }

    const resetform = () => {

        settitle("")
        setdesc("")
        seteditid("")
        seteditimg("")
        setcategory("")

    }

    useEffect(() => {
        getdata();
        getcategory()
    }, [])
    return (
        <>
            <section className="py-10">
                <div className="container mx-auto">
                    <div className="grid grid-cols-5 gap-4 mb-10">
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
                        {editimg && <div className="col-span-1">
                            <img src={base_url + editimg} alt="" className="rouneded" />
                        </div>}

                        <div className="col-span-1">
                            <label htmlFor="">Select Category</label>
                            <select className="form-control" onChange={(e) => setcategory(e.target.value)} value={category} >
                                <option value="" className='d-none'>--Select Category --</option>
                                {categorydata.map((item) => {
                                    return (
                                        <>
                                            <option value={item._id}>{item.title}</option>
                                        </>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="">Image</label>
                            <input title="image" onChange={handlefile} type="file" className="w-full p-2 border border-blue-gray-200" />
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="">Title</label>
                            <input title='title' type="text" onChange={(e) => settitle(e.target.value)} value={title} className="form-control" />
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="">Description</label>
                            <input title='title' type="text" className='form-control' value={desc} onChange={(e) => setdesc(e.target.value)} />
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="" className='block'>&nbsp;</label>
                            <button onClick={save_data} className="px-3 text-white text-sm py-2 bg-blue-800 rounded-md">{editid ? "Update" : "Save"} Sub Category </button>
                        </div>
                        {editid && <div className="col-span-1">
                            <label htmlFor="" className='block'>&nbsp;</label>
                            <button onClick={resetform} className="px-3 text-white text-sm py-2 bg-amber-800 rounded-md"> Reset Form </button>
                        </div>}
                    </div>
                    <div className="w-full mt-6">
                        <table className="w-full">
                            <thead>
                                <tr className='*:text-sm *:border *:border-blue-gray-200 *:p-2 *:text-start'>
                                    <th>Sr</th>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Description</th>
                                    <th>Url</th>

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

                                                </td>
                                                <td>
                                                    {test.title}
                                                </td>
                                                <td>
                                                    {test.category.title}
                                                </td>
                                                <td>
                                                    {test.description}
                                                </td>
                                                <td>
                                                    {test.url}
                                                </td>


                                                <td>
                                                    <div className="flex gap-2">

                                                        <button onClick={() => editsubcategory(test)} title='delete button' className="bg-blue-900 text-white size-10 rounded-md">
                                                            <EditOutlined />
                                                        </button>
                                                        <button onClick={() => deletesubcategory(test._id)} title='delete button' className="bg-amber-900 text-white size-10 rounded-md">
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

export default SubCategory
