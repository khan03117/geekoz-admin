import React from 'react'
import { base_url, delete_data, formcontrol, formDataWithToken, getData } from '../../utils';
import { useNavigate } from 'react-router-dom';
import FormLabel from '../../layout/FormLabel';

const ViewHotZone: React.FC = () => {
    const navigate = useNavigate();
    const [file, setFile] = React.useState<File>();
    const [image, setImage] = React.useState<File>();
    const [url, setUrl] = React.useState('');

    const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files.length > 0) {
            setImage(files[0]);
        }
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files.length > 0) {
            setFile(files[0]);
        }
    };

    const submitform = async () => {
        const fdta = new FormData();
        fdta.append('url', url);
        fdta.append('section_type', 'hotzone');
        if (file) {
            fdta.append('file', file);
        }
        if (image) {
            fdta.append('cover', image);
        }
        await formDataWithToken('hot-zone', fdta, navigate);
        getitems();
    }
    interface HotZone { _id: string, url: string, file: string, file_type: string, cover_image: string }
    const [items, setItems] = React.useState<HotZone[]>([]);
    const getitems = async () => {
        const resp = await getData('hot-zone', navigate);
        setItems(resp.data);
    }
    const deleteHotZone = async (id: string) => {
        await delete_data('hot-zone/delete/' + id, navigate);
        getitems();
    }
    React.useEffect(() => {
        getitems();
    }, []);
    React.useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        script.src = "//www.instagram.com/embed.js";
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);


    return (
        <>
            <section>
                <div className="container">
                    <div className="grid  mb-5 grid-cols-5 gap-4">
                        {/* <div className="col-span-1">
                            <FormLabel label={'Select Section'} />
                            <select name="" id="" onChange={(e) => setSection(e.target.value)} className={formcontrol}>
                                <option value="">---Select---</option>
                                <option value="hotzone">HotZone</option>
                                <option value="testimonial">Testimonial</option>
                            </select>
                        </div> */}
                        <div className="col-span-1">
                            <FormLabel label={'Select Cover Image'} />
                            <input type="file" onChange={handleCoverChange} name="image" id="image" className={formcontrol} accept='.jpg, .png, .jpeg' />
                        </div>
                        <div className="col-span-1">
                            <FormLabel label={'Select Media File'} />
                            <input type="file" onChange={handleFileChange} name="" id="" className={formcontrol} />
                        </div>
                        <div className="col-span-1">
                            <FormLabel label={'Enter Url'} />
                            <input type="text" onChange={(e) => setUrl(e.target.value)} name="url" id="" className={formcontrol} />
                        </div>
                        <div className="col-span-1 text-end pt-7">
                            <button onClick={submitform} className="bg-primary text-white px-5 py-2 rounded">Submit</button>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">

                    <table className="w-full">
                        <thead>
                            <tr className='*:text-start  *:bg-primary *:text-white *:border *:border-blue-gray-300 *:p-2'>
                                <th>Sr No</th>
                                <th>Cover</th>
                                <th>File Type</th>
                                <th>Url</th>
                                <th>File</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items.map((itm, index) => (
                                    <>
                                        <tr className='*:text-sm *:border *:border-blue-gray-300 *:p-2'>
                                            <td>
                                                {index + 1}
                                            </td>
                                            <td>
                                                <img src={base_url + itm.cover_image} alt="" className='size-24' />
                                            </td>
                                            <td>
                                                {itm.file_type}
                                            </td>
                                            <td>
                                                {
                                                    itm?.url && (
                                                        <>
                                                            <a href={itm.url} className='bg-secondary text-white p-2 rounded text-sm'>View</a>

                                                        </>
                                                    )
                                                }
                                            </td>
                                            <td>
                                                {
                                                    itm?.file_type && itm?.file_type.split('/')[0] == "image" && (
                                                        <>
                                                            <img src={base_url + itm.file} alt="" className="max-w-full size-48 border border-blue-gray-300 rounded object-cover" />
                                                        </>
                                                    )
                                                }
                                                {
                                                    itm?.file_type && itm.file_type.split('/')[0] == "video" && (
                                                        <>
                                                            <video autoPlay className='size-48 object-cover rounded' src={base_url + itm.file}></video>

                                                        </>
                                                    )
                                                }
                                                {
                                                    itm?.file_type && itm.file_type.split('/')[1] == "pdf" && (
                                                        <>
                                                            <a href={base_url + itm.file} target='_blank' className="text-primary" >View</a>
                                                        </>
                                                    )
                                                }

                                            </td>
                                            <td>
                                                <button onClick={() => deleteHotZone(itm._id)} className='bg-primary text-white p-2 rounded text-xs'>Delete</button>
                                            </td>
                                        </tr>
                                    </>
                                ))
                            }
                        </tbody>
                    </table>

                </div>
            </section>
        </>
    )
}

export default ViewHotZone