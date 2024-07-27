import React, { useEffect, useState } from 'react'
import Label from './Label'
import CkeditorCom from '../../layout/CkeditorCom';
import {
    Dialog,
    DialogHeader,
    DialogBody
} from "@material-tailwind/react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody
} from "@material-tailwind/react";
import { PlusCircleOutlined } from '@ant-design/icons';
import { formDataWithToken, getData } from '../../utils';

const PackageCreate: React.FC = () => {
    const scrollToRef = React.useRef<HTMLDivElement>(null);
    interface Itiny {
        title: string;
        description: string;
    }
    interface Destination {
        _id: string;
        title: string;
    }
    const [editorData, setEditorData] = React.useState<string>('');
    const [title, setTitle] = React.useState<string>('');
    const [inclusion, setInclusion] = React.useState<string>('');
    const [exclusion, setExclusion] = React.useState<string>('')
    const [itines, setItinies] = React.useState<Itiny[]>([]);
    const [inity, setInity] = React.useState<Itiny>();
    const [mopen, setMOpen] = React.useState(false);
    const [open, setOpen] = React.useState(0);
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [destination, setDestination] = useState<string>('')
    const [days, setDays] = useState<number>(0)
    const [nights, setNights] = useState<number>(0)
    const [pax, setPax] = useState<number>(0);
    const [packageType, setPackageType] = useState<string>('')
    const [message, setMessage] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [images, setImages] = React.useState<File[]>([]);
    const [pdf, setPDF] = React.useState<File>();
    const [banner, setBanner] = React.useState<File>();
    const [price, setPrice] = React.useState<number>(0)
    const handledata = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name == "days") {
            setDays(parseInt(value));
        }
        if (name == "nights") {
            setNights(parseInt(value));
        }
        if (name == "pax") {
            setPax(parseInt(value));
        }
    }
    const handlebannerchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files) {
            setBanner(files[0]);
        }
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files.length > 0) {
            setImages(Array.from(files));
        }
    };
    const handlepdfchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files) {
            setPDF(files[0]);
        }
    };
    const getdestinations = async () => {
        const resp = await getData(`country/?show_only=${encodeURIComponent(JSON.stringify(['title']))}`)
        setDestinations(resp.data);
    }
    const handleEditorChange = (data: string) => {
        setEditorData(data);
    };
    const handleinclulsion = (data: string) => {
        setInclusion(data);
    };
    const handleexclusion = (data: string) => {
        setExclusion(data);
    };
    const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
    const handleMOpen = () => setMOpen(!mopen);
    const handleitinerary = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setInity((prev) => {
            const newState = prev ? { ...prev, [name]: value } : { title: '', description: '' };
            newState[name as keyof Itiny] = value;
            return newState;
        });
    }
    const submititinerary = () => {
        if (inity && inity.title && inity.description) {
            setItinies(prevItinies => [...prevItinies, inity]);
            setInity({ title: '', description: '' }); // Reset inity after submission if needed
        }
        setMOpen(false)
    }
    interface ApiResponse {
        message: string;
        success: string;
    }

    const handleSubmit = async () => {
        try {
            const newFormData = new FormData();

            if (images && images.length > 0) {
                images.forEach(fil => {
                    newFormData.append('images', fil);
                });
            } else {
                newFormData.append('images', '');
            }

            if (banner) {
                newFormData.append('banner', banner);
            } else {
                newFormData.append('banner', '');
            }

            if (pdf) {
                newFormData.append('pdfs', pdf);
            } else {
                newFormData.append('pdfs', '');
            }

            newFormData.append('about', editorData || '');
            newFormData.append('title', title || '');
            newFormData.append('days', days.toString());
            newFormData.append('nights', nights.toString());
            newFormData.append('price', price.toString());
            newFormData.append('destination', destination);
            newFormData.append('pax', '1000');
            newFormData.append('package_type', packageType);
            newFormData.append('inclusion', inclusion || '');
            newFormData.append('exclusion', exclusion || '');
            newFormData.append('itinerary', JSON.stringify(itines) || '[]');

            const resp: ApiResponse = await formDataWithToken('package', newFormData);
            setStatus(resp.success);
            setMessage(resp.message);
            setTimeout(() => {
                if (scrollToRef.current) {
                    scrollToRef.current.scrollIntoView({ block: 'start' });
                }
            }, 0);

        } catch (error) {
            console.error('Error uploading data:', error); // Handle error
        }
    };

    useEffect(() => {
        getdestinations();
    }, []);
    return (
        <>
            <section className="h-5" ref={scrollToRef} ></section>
            {
                mopen && (
                    <>
                        <Dialog open={mopen} handler={handleMOpen} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <DialogHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                Enter Itinerary for day {itines.length + 1}
                            </DialogHeader>
                            <DialogBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                <div className="w-full space-y-3">
                                    <div className="w-full">
                                        <label htmlFor="title">Enter Title</label>
                                        <input type='text' name="title" id="title" onChange={handleitinerary} className="w-full rounded p-2 outline-none border rouned border-blue-gray-300" />
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="description">Enter Description</label>
                                        <textarea name="description" id="description" onChange={handleitinerary} rows={6} className="w-full  rounded outline-none border p-2 rouned border-blue-gray-300"></textarea>
                                    </div>
                                    <div className="w-full">
                                        <button onClick={submititinerary} className="w-full bg-primary text-white py-2 outline-none rounded">Submit</button>
                                    </div>
                                </div>
                            </DialogBody>
                        </Dialog>
                    </>
                )
            }
            <section className="py-10">
                <div className="container">
                    <div className="grid grid-cols-4 gap-3">

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
                            <div className="w-full">
                                <Label title={'Enter Package Title'} hfor={null} />
                                <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} className='w-full p-2 border border-blue-gray-200' placeholder='Enter Package title' />
                            </div>
                        </div>

                        <div className="col-span-1">
                            <div className="w-full">
                                <label className='form-label text-secondary' htmlFor="destination">Select Destination</label>
                                <select onChange={(e) => setDestination(e.target.value)} name="destination" id="destination" className="w-full border text-xs rounded border-blue-gray-200 p-2 outline-none">
                                    <option value="">--Select--- </option>
                                    {
                                        destinations.length > 0 && destinations.map((des) => (
                                            <>
                                                <option value={des._id} selected={destination == des._id}>{des.title}</option>
                                            </>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="col-span-1">
                            <label className='form-label text-secondary' htmlFor="duration">Duration</label>
                            <div className="flex w-full gap-2">
                                <div className='flex w-1/3 rounded overflow-hidden  border border-blue-gray-200 text-xs'>
                                    <input type="number" placeholder='Days' value={days} name="days" onChange={handledata} id="" className="h-8 w-full px-1  text-center text-sm border-e border-blue-gray-200 outline-none" />
                                    <span className='block h-8 w-10 text-center leading-8 bg-yellow-200 text-black'>D</span>
                                </div>
                                <div className='flex w-1/3  rounded overflow-hidden  border border-blue-gray-200 text-xs'>
                                    <input type="number" placeholder='Nights' value={nights} name="nights" onChange={handledata} id="" className="h-8  w-full px-1 text-center text-sm border-e border-blue-gray-200 outline-none" />
                                    <span className='block h-8 w-10 text-center leading-8  bg-gray-500 text-white'>N</span>
                                </div>
                                <div className=' w-0 hidden  rounded overflow-hidden  border border-blue-gray-200 text-xs'>
                                    <input type="number" placeholder='Pax' name="pax" value={pax} onChange={handledata} id="" className="h-8  w-full px-1 text-center text-sm border-e border-blue-gray-200 outline-none" />
                                    <span className='block h-8 w-10 text-center leading-8  bg-primary text-white'>PAX</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <Label title='Upload Banner Image' hfor={'file'} />
                            <input placeholder='Enter image' type="file" accept='.jpg, .png, .jpeg' onChange={handlebannerchange} className=" w-full px-2 py-1 text-center text-sm border rounded border-blue-gray-200 outline-none" />
                        </div>
                        <div className="col-span-1">
                            <Label title='Upload PDF Itinerary' hfor={'file'} />
                            <input placeholder='Enter image' type="file" accept='.pdf, .PDF' onChange={handlepdfchange} className=" w-full px-2 py-1 text-center text-sm border rounded border-blue-gray-200 outline-none" />
                        </div>
                        <div className="col-span-1">
                            <Label title='Upload Gallery Images' hfor={'file'} />
                            <input type="file" id="file" multiple onChange={handleFileChange} placeholder='Upload Images' className=" w-full px-2 py-1 text-center text-sm border rounded border-blue-gray-200 outline-none" />
                        </div>
                        <div className="col-span-1">
                            <div className="w-full">
                                <Label title={'Package Type'} hfor={null} />
                                <select name="package_type" onChange={(e) => setPackageType(e.target.value)} className="w-full border text-xs rounded border-blue-gray-200 p-2 outline-none">
                                    <option value="">--Select--- </option>
                                    <option value="Group">Group</option>
                                    <option value="Custom">Custom</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="w-full">
                                <Label title={'Price'} hfor={'price'} />
                                <div className="block ">
                                    <input type="number" id="price" name="price" value={price} onChange={(e) => setPrice(parseInt(e.target.value))} placeholder='Enter price' className=" w-full  px-2 py-1 text-start text-sm border rounded border-blue-gray-200 outline-none" />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-4 ">
                            <button onClick={handleMOpen} className='text-sm bg-gray-300 hover:bg-gray-400 px-4 uppercase font-light tracking-widest py-2 rounded-lg shadow-lg  text-black'>
                                <PlusCircleOutlined className='me-2 text-gray-600' />
                                Add Itinerary
                            </button>
                        </div>
                        <div className="col-span-4">
                            <Label title={'All Itinerary'} hfor={null} />
                            <div className="w-full p-2 bg-gray-300 rounded">
                                {
                                    itines.map((itm, idx) => (
                                        <>
                                            <Accordion open={open === idx} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                <AccordionHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onClick={() => handleOpen(idx)}>
                                                    {itm.title} <span className="ms-auto">Day {idx + 1}</span>
                                                </AccordionHeader>
                                                <AccordionBody className="bg-white p-2">
                                                    {itm.description}
                                                </AccordionBody>
                                            </Accordion>
                                        </>
                                    ))
                                }
                            </div>

                        </div>
                        <div className="col-span-4">
                            <Label title='Enter Description' hfor={'Description'} />
                            <CkeditorCom value={editorData} onChange={handleEditorChange} />
                        </div>
                        <div className="col-span-2">
                            <Label title='Enter Inclusion' hfor={'Inclusion'} />
                            <CkeditorCom value={inclusion} onChange={handleinclulsion} />
                        </div>
                        <div className="col-span-2">
                            <Label title='Enter Exclusion' hfor={'Exclusion'} />
                            <CkeditorCom value={exclusion} onChange={handleexclusion} />
                        </div>

                        <div className="col-span-2">
                            <button onClick={handleSubmit} className="px-10 py-2 rounded bg-primary text-white">Save Package</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default PackageCreate
