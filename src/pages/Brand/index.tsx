import { CloseOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { base_url, formDataWithToken, formDataWithTokenUpdate, getData } from '../../utils';
import { Dialog, DialogBody, DialogHeader } from '@material-tailwind/react';


const Brand: React.FC = () => {
    interface ApiResponse {
        message: string,
        success: string
    }
    interface Category {
        _id: string,
        title: string,
        image: string,
        is_hidden: boolean
    }
    interface Brand {
        title: string,
        url: string,
        image: string,
        _id: string
    }
    const [image, setImage] = React.useState<File | null>(null);
    const [title, setTitle] = React.useState<string>('');

    const [mesg, setMsg] = React.useState<string>();
    const [status, setStatus] = React.useState<string>();
    const [categories, setCategories] = React.useState<Category[]>([]);
    const [brands, setBrand] = useState<Brand[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false);
    const [editId, setEditId] = useState<string>('');
    const [brand_id, setBrandId] = useState<string>('');
    const deleteBrand = async (id: string) => {
        setBrandId(id);
        setOpen(true);

    }
    const handledelete = async () => {
        const response = await fetch(base_url + 'api/v1/brand/delete/' + brand_id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const responseData = await response.json();
        if (responseData) {
            getbrands();

        }
        setOpen(false)
        return responseData;

    }
    const getbrands = async () => {
        await getData('brand').then(resp => {
            setBrand(resp.data)
        })
    }
    const handleimage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    }
    const handletitle = (e: React.ChangeEvent<HTMLInputElement>) => {

        setTitle(e.target.value);

    }
    const postdata = async () => {
        try {
            const formData = new FormData();
            if (!image) {

                return;
            }
            formData.append('image', image);
            formData.append('title', title);
            const resp: ApiResponse = await formDataWithToken('brand', formData);
            if (!resp) {
                console.log('error');
            }
            if (resp) {
                getbrands();
                setTitle('')
                setMsg(resp?.message);
                setStatus(resp?.success);
                setTimeout(() => {
                    setMsg('');
                    setStatus('0');
                }, 1000);
            }


        } catch (error) {
            console.log(error)
        }

    }
    const getdata = async () => {
        await getData('category').then((resp) => {
            setCategories(resp.data);
        })
    }
    React.useEffect(() => {
        getdata();
        getbrands();
        console.log(categories)
    }, []);
    const handleOpen = () => {
        setOpen(!open)
    }
    const edithandle = () => {
        setEdit(!edit)
    }
    const editbrand = (id: string) => {
        setEditId(id);
        setEdit(true);
        const finddata = brands.find(obj => obj._id == id);
        if (finddata) {
            setTitle(finddata?.title)
        }
    }
    const editdata = async () => {
        try {
            const formData = new FormData();
            formData.append('title', title);
            await formDataWithTokenUpdate('brand/' + editId, formData).then((resp) => {
                if (resp) {
                    setEdit(!edit)
                    setTitle('')
                    setMsg(resp?.message);
                    getbrands();
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    return (

        <>
            {
                edit && (
                    <>
                        <Dialog open={edit} handler={edithandle} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} >
                            <DialogHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                <h4>Edit Brand</h4>
                            </DialogHeader>
                            <DialogBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                <div className="w-full">
                                    <div className="form-group mb-4">
                                        <label htmlFor="">Enter Brand</label>
                                        <input title='Brand' type="text" onChange={handletitle} value={title} className="form-control" />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label htmlFor="">Upload Image</label>
                                        <input title='Brand' type="file" onChange={handleimage} className="form-control" />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label htmlFor="" className='block mb-2'>&nbsp;</label>
                                        <button type='button' onClick={editdata} title='button' className="text-sm bg-primary px-4 uppercase font-light tracking-widest py-2 rounded-lg shadow-lg  text-white"><SaveOutlined /> Save Brand</button>
                                    </div>
                                </div>
                            </DialogBody>
                        </Dialog>
                    </>
                )
            }
            {
                open && (
                    <>
                        <Dialog open={open} size='xs' handler={handleOpen} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <DialogBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                <h4 className="text-amber-900">
                                    Are you sure to delete this ?
                                </h4>
                                <div className="flex gap-3 mt-3 justify-between">
                                    <button type='button' onClick={handledelete} className='px-3 py-2 text-sm text-white bg-amber-800 rounded-md' title='delete button'>
                                        Yes, Delete
                                    </button>
                                    <button type='button' onClick={() => setOpen(false)} className='px-3 py-2 text-sm text-white bg-primary rounded-md' title='delete button'>
                                        No, Keep
                                    </button>
                                </div>
                            </DialogBody>
                        </Dialog>
                    </>
                )
            }
            <section>
                <div className="container">
                    <div className="grid grid-cols-4 gap-5 mb-5">
                        {
                            mesg && (
                                <>
                                    <div className={`col-span-4 rounded-md ${status == "1" ? 'bg-green-700' : 'bg-red-700'}`}>
                                        <div className="w-full rounded-md p-4 text-white">
                                            {mesg}
                                        </div>
                                    </div>
                                </>
                            )
                        }


                        <div className="col-span-1">
                            <label htmlFor="">Enter Brand</label>
                            <input title='Brand' type="text" onChange={handletitle} value={title} className="form-control" />
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="">Upload Image</label>
                            <input title='Brand' type="file" onChange={handleimage} className="form-control" />
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="" className='block mb-2'>&nbsp;</label>
                            <button type='button' onClick={postdata} title='button' className="text-sm bg-primary px-4 uppercase font-light tracking-widest py-2 rounded-lg shadow-lg  text-white"><SaveOutlined /> Save Brand</button>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {
                            brands.map(brand => (
                                <>
                                    <div className="col-span-1">
                                        <div className="w-full border border-blue-gray-200 rounded-md relative">
                                            <button onClick={() => deleteBrand(brand._id)} className='text-amber-700 absolute -top-3 size-6 border border-amber-600 rounded-full    bg-white -end-2' title='delete button'>
                                                <CloseOutlined />
                                            </button>
                                            <button onClick={() => editbrand(brand._id)} className='text-indigo-700 absolute -top-3 end-5 size-6 border border-indigo-600 rounded-full    bg-white ' title='delete button'>
                                                <EditOutlined />
                                            </button>

                                            <figure className="w-full h-20">
                                                <img src={base_url + brand.image} alt="" className="max-w-full h-full object-contain mx-auto" />
                                            </figure>
                                            <div className="w-full text-center">
                                                {brand.title}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Brand
