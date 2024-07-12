import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { formDataWithTokenUpdate, getData } from '../../utils';
import CkeditorCom from '../../layout/CkeditorCom';
import { Checkbox } from '@material-tailwind/react';
import { EyeOutlined, PlusCircleOutlined, SaveOutlined } from '@ant-design/icons';

const EditPackage = () => {
    interface Smodal { brand: string | undefined; modal: string; stock: number; moq: number; }
    interface SubCategory { _id: string, title: string, image: string, is_hidden: boolean }
    interface Category {
        _id: string,
        title: string,
        image: string,
        is_hidden: boolean
    }
    interface Brand {
        _id: string,
        title: string,
        image: string,
        is_hidden: boolean
    }

    interface Modal {
        title: string,
        url: string,
        image: string,
        _id: string,
        modals: Brand[]
    }
    interface Product {
        _id: string;
        url: string;
        seller: string;
        category: {
            _id: string;
            title: string;
        },
        subcategory: {
            _id: string;
            title: string;
        };
        product_type: string;
        title: string;
        price: string;
        mrp: string;
        images: [string];
        modals: [Smodal],
        description: string;
        is_hidden: boolean;
        deleted_at: Date;
    }
    interface Seller {
        _id: string;
        title: string;
    }
    const { id } = useParams();
    const scrollToRef = useRef<HTMLDivElement>(null);
    const [product, setProduct] = useState<Product>();
    const [title, setTitle] = React.useState<string>('');
    const [editorData, setEditorData] = React.useState<string>('');
    const [images, setImages] = useState<File[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [modals, setModals] = useState<Modal[]>([]);
    const [selectedmodal, setSelectedModal] = useState<Smodal[]>([]);
    const [amount, setAmount] = useState<string>('')
    const [category_id, setCategoryId] = useState<string>('');
    const [msg, setMsg] = useState<string>('')
    const [status, setStatus] = useState<string>('');
    const [subcategory, setsubcategory] = useState<SubCategory[]>([]);
    const [subcategory_id, setsubCategoryId] = useState<string>('');
    const [sellers, setSellers] = useState<Seller[]>([]);
    const [sellerid, setSellerId] = useState<string>('');
    const [mrp, setMrp] = useState<string>('');
    const getModals = async () => {
        await getData('modal').then(resp => {
            setModals(resp.data)
        });
    }
    const getsellers = async () => {
        await getData('seller').then((resp) => {
            setSellers(resp.data);
        })
    }
    const getsubscats = async () => {
        await getData(`subcategory/category/${category_id}`).then((res) => {
            console.log(res)
            setsubcategory(res.data)
            // setsubcategory
        })

    }
    useEffect(() => {
        if (category_id) {
            getsubscats()
        }
    }, [category_id])
    const handleEditorChange = (data: string) => {
        setEditorData(data);
    };

    const handletitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }
    const handlecategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategoryId(e.target.value);
    }
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImages(Array.from(event.target.files));
        }
    };
    const handlesubcategorymain = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setsubCategoryId(e.target.value);
    }
    const handleamount = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
    }
    const getcategories = async () => {
        await getData('category').then((resp) => {
            setCategories(resp.data);
        })
    }
    const getdata = async () => {
        const resp = await getData('product/single-product/' + id);
        setProduct(resp.data);
    }

    const handlemodalselect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        const brand = e.target.dataset.brand;
        const arr: Smodal[] = [...selectedmodal];
        if (e.target.checked) {
            const obj: Smodal = {
                brand: brand,
                modal: val,
                stock: 0,
                moq: 0
            }
            arr.push(obj);
            setSelectedModal(arr);
        } else {
            const narr = arr.filter(obj => obj.modal != val);
            setSelectedModal(narr);
        }
    }
    const moqhandle = (e: React.ChangeEvent<HTMLInputElement>, bid: string, mid: string) => {
        const newMoq = parseInt(e.target.value, 10);
        const updatedArray = selectedmodal.map((item) => {
            if (item.brand == bid && item.modal == mid) {
                return { ...item, moq: newMoq };
            }
            return item;
        });

        setSelectedModal(updatedArray);

    }
    const stockhandle = (e: React.ChangeEvent<HTMLInputElement>, bid: string, mid: string) => {
        const stock = parseInt(e.target.value, 10);
        const updatedArray = selectedmodal.map((item) => {
            if (item.brand == bid && item.modal == mid) {
                return { ...item, stock: stock };
            }
            return item;
        });
        setSelectedModal(updatedArray);
    }
    const postdata = async () => {
        const formData = new FormData();
        if (images.length > 0) {
            images.forEach((file) => {
                formData.append('images', file);
            });
        }
        formData.append('title', title);
        formData.append('modals', JSON.stringify(selectedmodal));
        formData.append('price', amount)
        formData.append('description', editorData)
        formData.append('seller', sellerid)
        formData.append('subcategory', subcategory_id)
        formData.append('mrp', mrp)
        // formData.append('product_type', 'wholesell');
        formData.append('category', category_id);
        await formDataWithTokenUpdate('product/' + product?._id, formData).then((resp) => {
            setTimeout(() => {
                if (scrollToRef.current) {
                    scrollToRef.current.scrollIntoView({ block: 'start' });
                }
            }, 0);
            getdata();
            setMsg(resp.message);
            setStatus(resp.success);
            setTimeout(() => {
                setMsg('');
                setStatus('');
            }, 1000)
        });
        setTimeout(() => {
            if (scrollToRef.current) {
                scrollToRef.current.scrollIntoView({ block: 'start' });
            }
        }, 0);

    }
    const setalldata = () => {
        if (product) {
            setTitle(product.title);
            setAmount(product.price);
            setCategoryId(product.category._id);
            setSelectedModal(product.modals);
            setEditorData(product.description);
            setSellerId(product.seller);
            setsubCategoryId(product?.subcategory?._id);
            setMrp(product?.mrp)
        }
    }
    useEffect(() => {
        setalldata();
    }, [product]);

    useEffect(() => {
        getsellers();
        getcategories();
        getdata();
        getModals();
    }, []);
    if (!product) {
        return <div className="container h-screen w-full flex items-center justify-normal">No Product found</div>
    }
    return (
        <>
            <section className="h-40" ref={scrollToRef} ></section>

            <section>
                <div className="container">
                    <div className="flex gap-3 justify-end mb-4">
                        <Link to={'/view-product'} className="text-sm bg-primary px-4 uppercase font-light tracking-widest py-2 rounded-lg shadow-lg  text-white"><EyeOutlined /> View Product</Link>
                    </div>
                    <div className="grid grid-cols-4 gap-5" >
                        {
                            msg && (
                                <>
                                    <div className={`col-span-4 rounded-md ${status == "1" ? 'bg-green-700' : 'bg-red-700'}`}>
                                        <div className="w-full rounded-md p-4 text-white">
                                            {msg}
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        <div className="col-span-1">
                            <label htmlFor="">Select Category</label>
                            <select onChange={handlecategory} className="form-select form-control">
                                <option value="">--Select---</option>
                                {
                                    categories.map((cat) => (
                                        <>
                                            <option value={cat._id} key={cat._id} selected={cat._id == category_id}>{cat.title}</option>
                                        </>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="">Select Sub Category</label>
                            <select onChange={handlesubcategorymain} className="form-select form-control">
                                <option value="">--Select---</option>
                                {
                                    subcategory.map((cat) => (
                                        <>
                                            <option value={cat._id} key={cat._id} selected={subcategory_id == cat._id}>{cat.title}</option>
                                        </>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="">Select Brand(seller)</label>
                            <select onChange={(e) => setSellerId(e.target.value)} className="form-select form-control">
                                <option value="">--Select---</option>
                                {
                                    sellers.map((cat) => (
                                        <>
                                            <option value={cat._id} key={cat._id} selected={sellerid == cat._id}>{cat.title}</option>
                                        </>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="">Enter Title</label>
                            <input title='Title' type="text" onChange={handletitle} value={title} className="form-control" />
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="">Enter Images</label>
                            <input title='files' type="file" onChange={handleFileChange} className="form-control" multiple />
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="">Enter Price <small className="text-deep-orange-800">per piece</small> </label>
                            <div className="flex border border-blue-gray-100 rounded-md">
                                <span className='p-2'>
                                    ₹
                                </span>
                                <input type="text" title='amount' value={amount} onChange={handleamount} className="w-full p-2 outline-none focus-within:outline-none" />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="">Enter MRP <small className="text-deep-orange-800">per piece</small> </label>
                            <div className="flex border border-blue-gray-100 rounded-md">
                                <span className='p-2'>
                                    ₹
                                </span>
                                <input type="text" title='amount' value={mrp} onChange={(e) => setMrp(e.target.value)} className="w-full p-2 outline-none focus-within:outline-none" />
                            </div>
                        </div>
                        <div className="col-span-4">

                            <div className="w-full">
                                {
                                    modals.map(modl => (
                                        <>
                                            <div className="w-full p-2 bg-white">
                                                <div className="w-full py-1 border-b border-blue-gray-300 bg-blue-gray-100 flex justify-between">
                                                    <h4 className="text-sm">
                                                        {modl.title}
                                                    </h4>
                                                    <button title='button' type="button">
                                                        <PlusCircleOutlined />
                                                    </button>
                                                </div>
                                                <div className="w-full p-2 bg-white">
                                                    <div className="grid grid-cols-6 gap-4">
                                                        {
                                                            modl.modals.map(modal => (
                                                                <>
                                                                    <div className="col-span-1 modalcheckbox">

                                                                        <Checkbox data-brand={modl._id} checked={selectedmodal.find(obj => obj.modal == modal._id) ? true : false} label={modal.title} onChange={handlemodalselect} className='text-xs' value={modal._id} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                                                                        {
                                                                            selectedmodal.find(obj => obj.modal == modal._id) ? (
                                                                                <>
                                                                                    <div className="w-full">
                                                                                        <div className="flex gap-2">
                                                                                            <div className="w-full">
                                                                                                <input type="number" value={selectedmodal.find(obj => obj.modal == modal._id)?.moq} onChange={(event) => moqhandle(event, modl._id, modal._id)} title='quantity' min={0} placeholder='MOQ' className="outline-none border w-full px-2 border-blue-gray-200 py-1 text-xs" />
                                                                                            </div>
                                                                                            <div className="w-full">
                                                                                                <input type="number" title='stock' value={selectedmodal.find(obj => obj.modal == modal._id)?.stock} onChange={(event) => stockhandle(event, modl._id, modal._id)} min={0} placeholder='Stock' className="outline-none border w-full px-2 border-blue-gray-200 py-1 text-xs" />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </>
                                                                            ) : (
                                                                                <></>
                                                                            )
                                                                        }

                                                                    </div>

                                                                </>
                                                            ))
                                                        }
                                                    </div>

                                                </div>
                                            </div>
                                        </>
                                    ))
                                }
                            </div>
                        </div>



                        <div className="col-span-4">
                            <label htmlFor="description">Description</label>
                            <CkeditorCom value={editorData} onChange={handleEditorChange} />
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="" className='block mb-2'>&nbsp;</label>
                            <button type='button' onClick={postdata} title='button' className="text-sm bg-primary px-4 uppercase font-light tracking-widest py-2 rounded-lg shadow-lg  text-white"><SaveOutlined /> Next</button>
                        </div>
                    </div>



                </div>
            </section>
        </>
    )
}

export default EditPackage