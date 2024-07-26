/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PlusCircleOutlined, SaveOutlined } from '@ant-design/icons'
import React, { useEffect } from 'react'
import { base_url, formDataWithToken, formDataWithTokenUpdate, getData } from '../../utils';
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
import { Link, useParams } from 'react-router-dom';
import Label from '../Package/Label';
import axios from 'axios';
import CkeditorCom from '../../layout/CkeditorCom';

const Country = () => {
    interface Itiny {
        _id?: string;
        title: string;
        description: string;
    }
    interface Region {
        _id: string;
        region: string;
        url: string;
    }
    interface Country {
        name: {
            common: string;
            official: string;
            nativeName: {
                [lang: string]: {
                    common: string;
                    official: string;
                };
            };
        };
    }

    interface Destination {
        _id: string;
        url: string;
        title: string;
        region: string;
        country: string;
        image: string;
        about: string;
        itinerary: Itiny[];
        packages: {
            url: string;
            title: string;
            package_type: string;
            price: string;
            banner: {
                path: string;
            }[];
            days: string;
            nights: string;
            pax: string;
        }[]

    }
    const [image, setImage] = React.useState<File | null>(null);
    const { url } = useParams()
    const [mdestination, setDestination] = React.useState<Destination>();

    const getdestinationdata = async () => {
        if (url) {
            const item = await getData('country/show/' + url);
            setDestination(item.data);
        }

    }

    React.useEffect(() => {
        if (url) {
            getdestinationdata();
        }
    }, []);
    const [title, setTitle] = React.useState<string>('');
    const [mesg, setMsg] = React.useState<string>();
    const [open, setOpen] = React.useState(1);
    const [mopen, setMOpen] = React.useState(false);
    const [itines, setItinies] = React.useState<Itiny[]>([]);
    const [inity, setInity] = React.useState<Itiny>();
    const [about, setAbout] = React.useState<string>('');
    const [regions, setRegions] = React.useState<Region[]>([]);
    const [countries, setCountries] = React.useState<Country[]>([]);
    const [country, setCountry] = React.useState<string>('')
    const [show, setShow] = React.useState(false);
    const [region, setRegion] = React.useState<string>('');
    const [ieid, setIeid] = React.useState<number>(-1);
    const scrollref = React.useRef<HTMLDivElement>(null);
    const deleteItinerary = (id: number) => {
        const arr = [...itines];
        arr.splice(id, 1);
        setItinies(arr);
    }
    const editItinerary = (id: number) => {
        const found = itines[id];
        if (found) {
            setIeid(id);
            setInity(found);
            setMOpen(true);
        }
    }
    const handlesarch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (val.length > 2) {
            const resp = await axios.get(`https://restcountries.com/v3.1/name/${val}?fields=name`);
            if (resp.data.status != 404) {
                setCountries(resp.data)
            }
        } else {
            setCountries([]);
        }
    }

    const getregions = async () => {
        const resp = await getData('country/region');
        setRegions(resp.data);
    }
    const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
    const handleMOpen = () => {
        setMOpen(!mopen);
        setInity({ title: "", description: "" });
    }

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
        if (ieid > -1) {
            const arr: Itiny[] = [...itines];
            if (arr[ieid] && inity?.title && inity.description) {
                arr[ieid] = inity;
                setItinies(arr);
                setInity({ title: '', description: '' });
                setIeid(-1);
            }
        } else {
            if (inity && inity.title && inity.description) {
                setItinies(prevItinies => [...prevItinies, inity]);
                setInity({ title: '', description: '' }); // Reset inity after submission if needed
            }
        }
        setMOpen(false)

    }
    const setAlldata = () => {
        if (url && mdestination) {
            setRegion(mdestination?.region);
            setAbout(mdestination.about);
            setTitle(mdestination.title);
            setItinies(mdestination.itinerary);
        }

    }
    useEffect(() => {
        setAlldata();
    }, [mdestination])
    const postdata = async () => {
        const formData = new FormData();
        if (!url) {
            if (!image) {
                setMsg("image is required");
                return;
            }
        }


        if (!region) {
            setMsg("Region is required");
            return;
        }
        if (!itines.length) {
            setMsg("itinerary is required");
            return;
        }
        if (!about) {
            setMsg("about is required");
            return;
        }
        if (!title) {
            setMsg("Title is required");
            return;
        }
        if (image) {
            formData.append('image', image);
        }

        formData.append('title', title);
        formData.append('about', about);
        formData.append('itinerary', JSON.stringify(itines));
        formData.append('country', country);
        formData.append('region', region);
        try {
            const apiurl = url ? 'country/' + mdestination?._id : 'country';
            if (url) {
                await formDataWithTokenUpdate(apiurl, formData).then((resp) => {
                    setMsg(resp.message);
                    getdestinationdata();
                    setImage(null);
                    setItinies([]);
                    if (scrollref.current) {
                        scrollref.current.scrollIntoView({ block: "start" })
                    }
                })
            } else {
                await formDataWithToken(apiurl, formData).then(resp => {
                    setMsg(resp.message);
                    setTitle('');
                    setImage(null);
                    setItinies([]);
                    if (scrollref.current) {
                        scrollref.current.scrollIntoView({ block: "start" })
                    }
                })
            }


        } catch (error) {
            console.log(mesg)
            console.error('Error:', error);
        }
    };
    const handlecountry = (cont: string) => {
        setCountry(cont);
        setShow(false);
    }
    const handleAbout = (data: string) => {
        setAbout(data);
    };
    useEffect(() => {
        getregions();
    }, []);



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
                                    <input type="hidden" name="" value={inity?._id} />
                                    <div className="w-full">
                                        <label htmlFor="title">Enter Title</label>
                                        <input type='text' value={inity?.title} name="title" id="title" onChange={handleitinerary} className="w-full rounded p-2 outline-none border rouned border-blue-gray-300" />
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="description">Enter Description</label>
                                        <textarea name="description" id="description" onChange={handleitinerary} rows={6} value={inity?.description} className="w-full  rounded outline-none border p-2 rouned border-blue-gray-300"></textarea>
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

            <section ref={scrollref}>
                <div className="container">
                    <div className="w-full mb-5 text-end">
                        <Link to={'/destinations-view'} className='bg-primary px-4 py-2 text-xs text-white'>View All</Link>
                    </div>
                    <div className="grid grid-cols-4 gap-4 *:required: w-full rounded">
                        {
                            mesg && (
                                <>
                                    <div className="col-span-4">
                                        <div className="w-full p-2 rounded shadow-sm shadow-blue-gray-200 text-dark bg-orange-100 text-primary">
                                            {mesg}
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        <div className="col-span-1">
                            <Label title='Select Region' hfor={null} />
                            <select onChange={(e) => setRegion(e.target.value)} className="w-full p-2 text-sm outline-none rounded border border-blue-gray-200">
                                <option value="">---Select---</option>
                                {
                                    regions.map((reg) => (
                                        <>
                                            <option value={reg._id} selected={region == reg._id}>{reg.region}</option>
                                        </>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="col-span-1 relative hidden">
                            <label htmlFor="" className='form-label'>Select Country</label>
                            <div className="w-full p-2 h-10 cursor-pointer rounded text-xs border border-blue-gray-200" onClick={() => setShow(!show)}>
                                {country}
                            </div>
                            {
                                show && (
                                    <>
                                        <div className="w-full absolute top-full start-0 bg-white shadow shadow-blue-gray-200 p-2">
                                            <input title='country' type="text" onChange={handlesarch} className="p-2 text-sm outline-none border border-blue-gray-200 w-full rounded" />
                                            <ul className='*py-1 list-none '>
                                                {
                                                    countries.map(count => (
                                                        <>
                                                            <li>
                                                                <button onClick={() => handlecountry(count.name.common)} className="w-full rounded text-sm bg-gray-100 hover:bg-gray-300 text-start p-2 outline-none">
                                                                    {count.name.common}
                                                                </button>
                                                            </li>
                                                        </>
                                                    ))
                                                }


                                            </ul>
                                        </div>
                                    </>
                                )
                            }
                        </div>

                        <div className="col-span-1 ">
                            <label htmlFor="" className='form-label'>Enter Destination</label>
                            <input title='country' type="text" value={title} onChange={handletitle} className="p-2 text-sm outline-none border border-blue-gray-200 w-full rounded" />

                        </div>
                        <div className="col-span-1">
                            <label htmlFor="" className='form-label'> Upload Image</label>
                            <input title='image' type="file" onChange={handleimage} className="p-2 text-sm outline-none border border-blue-gray-200 w-full rounded" />
                            {
                                (url && mdestination) && (
                                    <>
                                        <img src={base_url + mdestination.image} alt="" className="w-full" />
                                    </>
                                )
                            }
                        </div>
                        <div className="col-span-4">
                            <label htmlFor="about" className='form-label'>About Destination</label>
                            <CkeditorCom value={about} onChange={handleAbout} />
                        </div>
                        <div className="col-span-4 ">
                            <button onClick={handleMOpen} className='text-sm bg-gray-300 hover:bg-gray-400 px-4 uppercase font-light tracking-widest py-2 rounded-lg shadow-lg  text-black'>
                                <PlusCircleOutlined className='me-2 text-gray-600' />
                                Add Itinerary</button>
                        </div>
                        <div className="col-span-4">
                            {
                                itines.map((itm, idx) => (
                                    <>
                                        <Accordion className='mb-3 bg-gray-300 border  rounded overflow-hidden border-gray-400' open={open === idx} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                            <AccordionHeader className='px-4 text-sm' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onClick={() => handleOpen(idx)}>
                                                {itm.title} <span className="ms-auto">Day {idx + 1}</span>
                                            </AccordionHeader>
                                            <AccordionBody className="bg-white px-4 text-sm">
                                                {itm.description}
                                                <div className="w-full grid grid-cols-2 py-2">
                                                    <div className="col-span-1">
                                                        <button onClick={() => editItinerary(idx)} className="bg-secondary text-white px-4 py-2 rounded">Edit</button>

                                                    </div>
                                                    <div className="col-span-1">
                                                        <button onClick={() => deleteItinerary(idx)} className="bg-primary text-white px-4 py-2 rounded">Delete</button>

                                                    </div>
                                                </div>
                                            </AccordionBody>
                                        </Accordion>
                                    </>
                                ))
                            }

                        </div>

                        <div className="col-span-2">
                            <label htmlFor="" className='block mb-2'>&nbsp;</label>
                            <button type='button' onClick={postdata} title='button' className="text-sm bg-primary px-4 uppercase font-light tracking-widest py-2 rounded-lg shadow-lg  text-white"><SaveOutlined /> Save Destination</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}


export default Country
