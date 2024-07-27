import React, { useEffect } from 'react'
import { getData, delete_data, base_url, formDataWithTokenUpdate, postDataWithToken } from '../../utils';
import { DownloadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ConfirmPopup from '../../layout/ConfirmPopup';
import { Dialog, DialogBody, DialogHeader } from '@material-tailwind/react';
import moment from 'moment';

const ViewPackages: React.FC = () => {
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
    interface Destination {
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
        destination: Destination;
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
    const [packages, setPackages] = React.useState<Package[]>([]);
    const [deleteId, setDeleteId] = React.useState<string | null>(null);
    const [confirmDelete, setConfirmDelete] = React.useState<boolean>(false);
    const [dopen, setDopen] = React.useState(false);
    const [pid, setPid] = React.useState<string>('');
    const [ndate, setNdate] = React.useState<string>('');
    interface Gdate { _id: string; dates: string[]; month: string;year:string }
    const [dates, setDates] = React.useState<Gdate[]>([]);
    const getpackages = async () => {
        const resp = await getData('package');
        setPackages(resp.data);
    }
    const handleDopen = (id: string) => {
        setPid(id);
        setDopen(!dopen);
      
    }
    useEffect(() => {
        if(pid){
            get_dates();
        }
      
    }, [pid])
    const save_date = async () => {
        await postDataWithToken('package/group-dates', { package: pid, date: ndate });
        get_dates();
    }
    const get_dates = async () => {
        const items = await getData('package/group-dates/'+pid);
        setDates(items.data);
    }
    const [banner, setBanner] = React.useState<File>();
    const handleBanner = async (id: string) => {
        if (banner) {
            const fdata = new FormData();
            fdata.append('banner', banner);
            await formDataWithTokenUpdate(`package/change-banner/${id}`, fdata);
            getpackages();
        } else {
            alert('Banner not found')
        }

    }
    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setBanner(e.target.files[0])
        }
    }



    React.useEffect(() => {
        getpackages();
    }, []);

    const showDeleteConfirmation = (id: string) => {
        setDeleteId(id);
        setConfirmDelete(true);
    }

    const handleDeleteConfirmed = async () => {
        await delete_data('package/' + deleteId);
        getpackages();
        setConfirmDelete(false) // Hide confirmation modal after delete
    }
    return (
        <>

            {
                dopen && (
                    <>
                        <Dialog open={dopen} handler={() => handleDopen('')} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <DialogHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                Package Group Dates
                            </DialogHeader>
                            <DialogBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                <div className="w-full flex border border-blue-gray-200 rounded overflow-hidden">
                                    <input type="date" onChange={(e) => setNdate(e.target.value)} value={ndate} className="w-full outline-none p-3" />
                                    <button onClick={save_date} className='text-xs text-nowrap px-5 bg-primary text-white rounded-e'>Add Date</button>
                                </div>
                                <div className="w-full">
                                   <table className="w-full">
                                    <thead>
                                        <tr className='*:text-sm *:border *:border-blue-gray-200 *:p-2 *:text'>
                                            <th>Sr No</th>
                                            <th>Month</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            dates.map((itm, idx) => (
                                                <>
                                              <tr className='*:text-sm *:border *:border-blue-gray-200 *:p-2'>
                                                    <td>
                                                        {idx  +1}
                                                    </td>
                                                    <td>
                                                        {itm.month} {itm.year}
                                                    </td>
                                                    <td>
                                                        {itm.dates.map(dt => (
                                                            <>
                                                                <span className="me-2">
                                                                    {moment(dt).format('DD-MMM-YYYY')}
                                                                </span>
                                                            </>
                                                        ))}
                                                    </td>
                                                </tr>
                                                </>
                                            ))
                                        }
                                    </tbody>
                                   </table>
                                </div>
                            </DialogBody>
                        </Dialog>
                    </>
                )
            }
            {confirmDelete && (
                <ConfirmPopup

                    onConfirm={handleDeleteConfirmed}
                    onCancel={() => setConfirmDelete(false)}
                />
            )}
            <section>
                <div className="container mx-auto">
                    <div className="w-full">
                        <table className="w-full">
                            <thead>
                                <tr className='*:text-start *:text-sm *:p-1 *:border *:border-blue-gray-200 '>
                                    <th>Sr No</th>
                                    <th>Package</th>
                                    <th>Banner</th>
                                    <th>Destination</th>
                                    <th>Duration</th>
                                    <th>Price</th>
                                    <th>PDF</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    packages.map((pack, index) => (
                                        <>
                                            <tr className='*:text-start *:text-sm *:p-1 *:border *:border-blue-gray-200 '>
                                                <td>
                                                    {index + 1}
                                                </td>
                                                <td>
                                                    {pack.title}
                                                    <div className="w-full mb-3">
                                                        Package Type  : {
                                                            pack.package_type == "Group" && (
                                                                <>
                                                                    <span className="text-xs bg-primary text-white rounded px-1">Group</span>
                                                                </>
                                                            )
                                                        }
                                                        {
                                                            pack.package_type == "Custom" && (
                                                                <>
                                                                    <span className="text-xs border border-primary text-primary rounded px-1">Custom</span>
                                                                </>
                                                            )
                                                        }
                                                    </div>
                                                    <div className="w-full flex flex-wrap gap-1">
                                                        {
                                                            pack.gallery.map((img) => (
                                                                <img src={base_url + img.path} alt="" className="size-8" />
                                                            ))
                                                        }
                                                    </div>
                                                </td>
                                                <td>
                                                    <img src={base_url + pack.banner[0].path} alt="" className="w-full max-w-[100px]" />
                                                    <div className="flex pt-1">
                                                        <input title='change banner' type="file" onChange={handleFile} className="w-full rounded-s border border-blue-gray-200 outline-none" />
                                                        <button onClick={() => handleBanner(pack._id)} className='p-2 bg-primary text-white rounded-e text-sm '>Change</button>
                                                    </div>
                                                </td>
                                                <td>
                                                    <ul>
                                                        <li>
                                                            Destinaton :   {pack?.destination?.title}
                                                        </li>

                                                        <li>
                                                            Region : {pack?.destination?.region?.region}
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td>
                                                    <ul>
                                                        <li>
                                                            Days : {pack?.days}
                                                        </li>
                                                        <li>
                                                            Nights : {pack?.nights}
                                                        </li>
                                                        <li>
                                                            Pax : {pack?.pax}
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td>
                                                    {pack?.price}
                                                </td>
                                                <td>
                                                    <a title="Download pdf" download={true} target='_blank' href={base_url + pack.document[0].path}>
                                                        <DownloadOutlined />
                                                    </a>
                                                </td>
                                                <td>
                                                    <div className="flex items-center flex-wrap gap-2">


                                                        <Link to={'/packages/edit/' + pack.url} className='bg-secondary p-2 text-white rounded text-xs'>Edit</Link>
                                                        <Link to={'/packages/itinerary/' + pack.url} className='px-2 rounded bg-secondary/50 text-white py-1' >Itinerary</Link>
                                                        <button onClick={() => showDeleteConfirmation(pack._id)} className='bg-primary p-2 text-white rounded text-xs'>Delete</button>
                                                        {
                                                            pack.package_type == "Group" && (
                                                                <>
                                                                    <button onClick={() => handleDopen(pack._id)} className='bg-blue-700 rounded  p-2 text-xs text-white'>Group Dates</button>
                                                                </>
                                                            )
                                                        }
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

export default ViewPackages
