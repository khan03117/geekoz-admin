import React, { useEffect, useState } from 'react'
import Label from './Label'
import CkeditorCom from '../../layout/CkeditorCom';
import { getData, updateDataWithToken } from '../../utils';
import { useNavigate, useParams } from 'react-router-dom';

const EditPackage: React.FC = () => {
    const { url } = useParams();
    const scrollToRef = React.useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    interface Destination {
        _id: string;
        title: string;
    }


    interface Image {
        mimetype: string;
        path: string;
        size: number
    }
    interface Region {
        _id: string;
        region: string;
    }
    interface Itinerary {
        _id: string;
        day: number;
        title: string;
        description: string;
    }
    interface MDestination {
        _id: string;
        url: string;
        region: Region;
        country: string;
        title: string;
    }
    interface Package {
        _id: string;
        url: string;
        title: string;
        destination: MDestination;
        package_type: string;
        price: number;
        banner: Image[];
        document: Image[];
        gallery: Image[];
        about: string;
        days: number;
        nights: number;
        pax: number;
        inclusion: string;
        exclusion: string;
        itinerary: Itinerary[];
    }
    const [mpackage, setPackage] = React.useState<Package>();
    const getpackage = async () => {
        const item = await getData('package/show/' + url, navigate);
        setPackage(item.data);
    }
    useEffect(() => {
        getpackage();
    }, []);

    const [editorData, setEditorData] = React.useState<string>('');
    const [title, setTitle] = React.useState<string>(mpackage?.title ?? "");
    const [inclusion, setInclusion] = React.useState<string>(mpackage?.inclusion ?? "");
    const [exclusion, setExclusion] = React.useState<string>(mpackage?.exclusion ?? "")

    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [destination, setDestination] = useState<string>('')
    const [days, setDays] = useState<number>(mpackage?.days ?? 1)
    const [nights, setNights] = useState<number>(mpackage?.nights ?? 1)
    const [pax, setPax] = useState<number>(mpackage?.pax ?? 1);
    const [packageType, setPackageType] = useState<string>(mpackage?.package_type ?? "custom")
    const [message, setMessage] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [price, setPrice] = React.useState<number>(mpackage?.price ?? 0);
    const [fdata, setFdata] = React.useState({});
    const handleFdata = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFdata((prev) => ({ ...prev, [name]: value }));
        if (name == "title") {
            setTitle(value);
        }
        if (name == "price") {
            setPrice(parseInt(value));
        }
        if (name == "pax") {
            setPax(parseInt(value));
        }
        if (name == "nights") {
            setNights(parseInt(value));
        }
        if (name == "days") {
            setDays(parseInt(value));
        }
        if (name == "package_type") {
            setPackageType(mpackage?.package_type ?? "");
        }

        if (name == "destination") {
            setDestination(mpackage?.destination._id ?? "");
        }
    }

    const getdestinations = async () => {
        const resp = await getData(`country/?show_only=${encodeURIComponent(JSON.stringify(['title']))}`, navigate)
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



    interface ApiResponse {
        message: string;
        success: string;
    }

    const handleSubmit = async () => {

        try {
            const newFormData = { ...fdata, about: editorData, inclusion: inclusion, exclusion: exclusion }


            const resp: ApiResponse = await updateDataWithToken('package/' + mpackage?._id, newFormData, navigate);
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
    useEffect(() => {
        setEditorData(mpackage?.about ?? "");
        setDays(mpackage?.days ?? 1);
        setNights(mpackage?.nights ?? 1);
        setPax(mpackage?.pax ?? 1);
        setExclusion(mpackage?.exclusion ?? "");
        setInclusion(mpackage?.inclusion ?? "");
        setPrice(mpackage?.price ?? 0);
        setTitle(mpackage?.title ?? "");
        setPackageType(mpackage?.package_type ?? "");
        setDestination(mpackage?.destination._id ?? "");
        setFdata({
            about: mpackage?.about,
            days: mpackage?.days,
            nights: mpackage?.nights,
            pax: mpackage?.pax,
            title: mpackage?.title,
            price: mpackage?.price,
            package_type: mpackage?.package_type,
            destination: mpackage?.destination._id
        });
    }, [mpackage])
    if (!mpackage) {
        return "No Product found";
    }
    return (
        <>
            <section className="h-5" ref={scrollToRef} ></section>
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
                                <input type='text' name="title" value={title} onChange={handleFdata} className='w-full p-2 border border-blue-gray-200' placeholder='Enter Package title' />
                            </div>
                        </div>

                        <div className="col-span-1">
                            <div className="w-full">
                                <label className='form-label text-secondary' htmlFor="destination">Select Destination</label>
                                <select onChange={handleFdata} name="destination" id="destination" className="w-full border text-xs rounded border-blue-gray-200 p-2 outline-none">
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
                                    <input type="number" placeholder='Days' value={days} name="days" onChange={handleFdata} id="" className="h-8 w-full px-1  text-center text-sm border-e border-blue-gray-200 outline-none" />
                                    <span className='block h-8 w-10 text-center leading-8 bg-yellow-200 text-black'>D</span>
                                </div>
                                <div className='flex w-1/3  rounded overflow-hidden  border border-blue-gray-200 text-xs'>
                                    <input type="number" placeholder='Nights' value={nights} name="nights" onChange={handleFdata} id="" className="h-8  w-full px-1 text-center text-sm border-e border-blue-gray-200 outline-none" />
                                    <span className='block h-8 w-10 text-center leading-8  bg-gray-500 text-white'>N</span>
                                </div>
                                <div className='flex w-1/3  rounded overflow-hidden  border border-blue-gray-200 text-xs'>
                                    <input type="number" placeholder='Pax' name="pax" value={pax} onChange={handleFdata} id="" className="h-8  w-full px-1 text-center text-sm border-e border-blue-gray-200 outline-none" />
                                    <span className='block h-8 w-10 text-center leading-8  bg-primary text-white'>PAX</span>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-1">
                            <div className="w-full">
                                <Label title={'Package Type'} hfor={null} />
                                <select name="package_type" onChange={handleFdata} className="w-full border text-xs rounded border-blue-gray-200 p-2 outline-none">
                                    <option value="">--Select--- </option>
                                    <option value="Group" selected={packageType == "Group"}>Group</option>
                                    <option value="Custom" selected={packageType == "Custom"}>Custom</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="w-full">
                                <Label title={'Price'} hfor={'price'} />
                                <div className="block ">
                                    <input type="number" id="price" name="price" value={price} onChange={handleFdata} placeholder='Enter price' className=" w-full  px-2 py-1 text-start text-sm border rounded border-blue-gray-200 outline-none" />
                                </div>
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

export default EditPackage
