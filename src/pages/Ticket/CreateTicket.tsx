import React from 'react'
import FormLabel from '../../layout/FormLabel'
import { formcontrol, formDataWithToken, getData } from '../../utils'
import { useNavigate } from 'react-router-dom'
import CkeditorCom from '../../layout/CkeditorCom'
import { toast } from 'react-toastify'

const CreateTicket: React.FC = () => {
    const scrollToRef = React.useRef<HTMLDivElement>(null);
    interface Destination {
        _id: string;
        title: string;
    }
    const navigate = useNavigate();
    const [message, setMessage] = React.useState<string>('');
    const [status, setStatus] = React.useState<string>('');
    interface Category { _id: string, title: string }
    const [cats, setCats] = React.useState<Category[]>([]);
    const [destinations, setDestinations] = React.useState<Destination[]>([]);
    const [editorData, setEditorData] = React.useState<string>('');
    const [images, setImages] = React.useState<File[]>([]);
    const [destination, setDestination] = React.useState('');
    const [title, setTitle] = React.useState<string>('');
    const [category, setCategory] = React.useState('');
    const [google_map, setGoogleMap] = React.useState('');
    const [location, setLocation] = React.useState('');
    interface Plist { entery_type: string, overall_price: string, adult_price: string, child_price: string }
    const [formData, setFormData] = React.useState<Plist[]>([
        { entery_type: '', overall_price: '', adult_price: '', child_price: '' }
    ]);
    const [count, setCount] = React.useState(1);
    const handleInputChange = (index: number, field: keyof Plist, value: string) => {
        const newFormData = [...formData];
        if (newFormData[index]) {
            newFormData[index][field] = value;
            setFormData(newFormData);
        }
    };
    const handleIncreseCount = () => {
        setFormData([...formData, { entery_type: '', overall_price: '', adult_price: '', child_price: '' }]);
        setCount(count + 1);
    };
    const getcats = async () => {
        const items = await getData('ticket-category', navigate);
        setCats(items.data);
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files.length > 0) {
            setImages(Array.from(files));
        }
    };
    const getdestinations = async () => {
        const resp = await getData(`country/?show_only=${encodeURIComponent(JSON.stringify(['title']))}`, navigate)
        setDestinations(resp.data);
    }
    const handleEditorChange = (data: string) => {
        setEditorData(data);
    };
    React.useEffect(() => {
        getdestinations()
        getcats();
    }, []);
    interface ApiResp { success: string, message: string }
    const submitForm = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fdata = new FormData();
        fdata.append('title', title);
        fdata.append('destination', destination);
        fdata.append('category', category);
        fdata.append('location', location);
        fdata.append('description', editorData);
        fdata.append('google_map', google_map);
        if (images && images.length > 0) {
            images.forEach(fil => {
                fdata.append('images', fil);
            });
        }
        fdata.append('pricing', JSON.stringify(formData));
        const resp: ApiResp = await formDataWithToken('ticket', fdata, navigate);
        console.log(resp)
        toast.success(resp.message ?? 'Ticket create successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        if (resp.success == "1") {
            setStatus(resp.success);
            setMessage(resp.message);
        }
    }
    return (
        <>
            <section className="h-5" ref={scrollToRef} ></section>
            <section className="">
                <div className="container">
                    <form onSubmit={submitForm} method="post">
                        {
                            message && (
                                <>
                                    <div className={`w-full rounded ${status == "1" ? 'bg-green-700' : 'bg-red-700'}`}>
                                        <div className="w-full rounded-md p-4 text-white">
                                            {message}
                                        </div>
                                    </div>
                                </>
                            )
                        }

                        <div className="grid grid-cols-4 gap-4">
                            <div className="col-span-4">
                                <FormLabel label={'Enter Title'} />
                                <input type="text" required onChange={(e) => setTitle(e.target.value)} value={title} name="title" id="title" className={formcontrol} />
                            </div>
                            <div className="col-span-1">
                                <FormLabel label={'Select destination'} />
                                <select name="destination" required onChange={(e) => setDestination(e.target.value)} id="destination" className="w-full border text-xs rounded border-blue-gray-200 p-2 outline-none">
                                    <option value="">--Select--- </option>
                                    {
                                        destinations.length > 0 && destinations.map((des) => (
                                            <>
                                                <option value={des._id}>{des.title}</option>
                                            </>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="col-span-1">
                                <FormLabel label={'Select ticket category'} />
                                <select onChange={(e) => setCategory(e.target.value)} className={formcontrol} >
                                    <option value="">--Select---</option>
                                    {
                                        cats.map((itm) => (
                                            <>
                                                <option value={itm._id}>{itm.title}</option>
                                            </>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="col-span-2">
                                <FormLabel label={'Select images'} />
                                <input type="file" name="images" onChange={handleFileChange} id="" className={formcontrol} multiple />
                            </div>

                            <div className="col-span-4">
                                <FormLabel label={'Enter Description'} />
                                <CkeditorCom value={editorData} onChange={handleEditorChange} />
                            </div>
                            <div className="col-span-2">
                                <FormLabel label={'Enter Location'} />
                                <textarea name="location" value={location} onChange={(e) => setLocation(e.target.value)} id="location" className={formcontrol}></textarea>
                            </div>
                            <div className="col-span-2">
                                <FormLabel label={'Enter Google Map'} />
                                <textarea name="google_map" value={google_map} onChange={(e) => setGoogleMap(e.target.value)} id="google_map" className={formcontrol}></textarea>
                            </div>


                        </div>
                        <div className="grid mb-5 grid-cols-5 gap-4">
                            {
                                formData.map((itm, index) => (
                                    <React.Fragment key={index}>
                                        <div className="col-span-2">
                                            <FormLabel label={'Entry Type'} />
                                            <input
                                                type="text"
                                                value={itm.entery_type}
                                                onChange={(e) => handleInputChange(index, 'entery_type', e.target.value)}
                                                className={formcontrol}
                                            />
                                        </div>

                                        <div className="col-span-1">
                                            <FormLabel label={'Price for Adults'} />
                                            <input
                                                type="number"
                                                value={itm.adult_price}
                                                onChange={(e) => handleInputChange(index, 'adult_price', e.target.value)}
                                                className={formcontrol}
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <FormLabel label={'Price for Children'} />
                                            <input
                                                type="number"
                                                value={itm.child_price}
                                                onChange={(e) => handleInputChange(index, 'child_price', e.target.value)}
                                                className={formcontrol}
                                            />
                                        </div>
                                        <div className="col-span-1 pt-7 text-end">
                                            {index === count - 1 && (
                                                <button
                                                    type='button'
                                                    onClick={handleIncreseCount}
                                                    className='bg-secondary text-white rounded px-3 py-1'>
                                                    Add More
                                                </button>
                                            )}
                                        </div>
                                    </React.Fragment>
                                ))
                            }

                        </div>

                        <div className="w-full">
                            <button className="bg-primary rounded px-10 py-2 text-white">Submit</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default CreateTicket