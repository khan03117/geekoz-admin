/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PlusCircleOutlined, SaveOutlined } from '@ant-design/icons'
import React from 'react'
import { formDataWithToken } from '../../utils';
import {
    Accordion,
    AccordionHeader,
    AccordionBody
} from "@material-tailwind/react";
import {
    Dialog,
    DialogHeader,
    DialogBody
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';

const Country = () => {
    interface Itiny {
        title: string;
        description: string;
    }
    const [image, setImage] = React.useState<File | null>(null);
    const [title, setTitle] = React.useState<string>('');
    const [mesg, setMsg] = React.useState<string>();
    const [open, setOpen] = React.useState(1);
    const [mopen, setMOpen] = React.useState(false);
    const [itines, setItinies] = React.useState<Itiny[]>([]);
    const [inity, setInity] = React.useState<Itiny>();
    const [about, setAbout] = React.useState<string>('');

    const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
    const handleMOpen = () => setMOpen(!mopen);

    const handleimage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    }
    const handletitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }
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

    const postdata = async () => {
        const formData = new FormData();
        if (!image) {
            setMsg("image is required");
            return;
        }
        formData.append('image', image);
        formData.append('title', title);
        formData.append('about', about);
        formData.append('itinerary', JSON.stringify(itines));
        try {
            await formDataWithToken('country', formData).then(resp => {
                setMsg(resp.message);
                setTitle('');
                setImage(null);
                setItinies([]);
            })

        } catch (error) {
            console.log(mesg)
            console.error('Error:', error);
        }
    };

    return (
        <>

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

            <section>
                <div className="container">
                    <div className="w-full mb-5 text-end">
                        <Link to={'/destinations-view'} className='bg-primary px-4 py-2 text-xs text-white'>View All</Link>
                    </div>
                    <div className="grid grid-cols-6 gap-4 *:required:form-control">
                        {
                            mesg && (
                                <>
                                    <div className="col-span-6">
                                        <div className="w-full p-2 text-dark bg-indigo-200">
                                            {mesg}
                                        </div>
                                    </div>
                                </>
                            )
                        }

                        <div className="col-span-2">
                            <label htmlFor="" className='form-label'>Enter Destination</label>
                            <input title='country' type="text" onChange={handletitle} className="form-control" />
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="" className='form-label'> Upload Image</label>
                            <input title='image' type="file" onChange={handleimage} className="form-control" />
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="about" className='form-label'>About Destination</label>
                            <input title='about' id='about' type="text" onChange={(e) => setAbout(e.target.value)} className="form-control" />
                        </div>
                        <div className="col-span-6 ">
                            <button onClick={handleMOpen} className='text-sm bg-gray-300 hover:bg-gray-400 px-4 uppercase font-light tracking-widest py-2 rounded-lg shadow-lg  text-black'>
                                <PlusCircleOutlined className='me-2 text-gray-600' />
                                Add Itinerary</button>
                        </div>
                        <div className="col-span-6">
                            {
                                itines.map((itm, idx) => (
                                    <>
                                        <Accordion open={open === idx} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                            <AccordionHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onClick={() => handleOpen(idx)}>
                                                {itm.title} <span className="ms-auto">Day {idx + 1}</span>
                                            </AccordionHeader>
                                            <AccordionBody>
                                                {itm.description}
                                            </AccordionBody>
                                        </Accordion>
                                    </>
                                ))
                            }

                        </div>

                        <div className="col-span-2">
                            <label htmlFor="" className='block mb-2'>&nbsp;</label>
                            <button type='button' onClick={postdata} title='button' className="text-sm bg-primary px-4 uppercase font-light tracking-widest py-2 rounded-lg shadow-lg  text-white"><SaveOutlined /> Save Country</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}


export default Country
