import React, { useEffect } from 'react'
import { getData, delete_data, base_url, formDataWithTokenUpdate, postDataWithToken, updateDataWithToken } from '../../utils';
import { CloseOutlined, DownloadOutlined, FileImageFilled, PaperClipOutlined } from '@ant-design/icons';
import { json, Link, useNavigate } from 'react-router-dom';
import ConfirmPopup from '../../layout/ConfirmPopup';
import { Dialog, DialogBody, DialogHeader } from '@material-tailwind/react';
import moment from 'moment';

const ViewPackages: React.FC = () => {
    interface Image {
        _id: string;
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
    const [editimgdata, seteditimgdata] = React.useState<Image[]>([]);

    const [deleteId, setDeleteId] = React.useState<string | null>(null);
    const [confirmDelete, setConfirmDelete] = React.useState<boolean>(false);
    const [dopen, setDopen] = React.useState(false);
    const [imgeditopen, setimgeditopen] = React.useState(false);
    const [pid, setPid] = React.useState<string>('');
    const [imgid, setimgid] = React.useState<string>('');

    const [editImg, setEditImg] = React.useState<File[]>([]);
    const [editState, setEditState] = React.useState({ rowIndex: null, dateIndex: null, value: '' });

    // Handle the start of editing
    const handleEditStart = (rowIndex: any, dateIndex: any, currentDate: string) => {
        setEditState({
            rowIndex,
            dateIndex,
            value: currentDate
        });
    };

    const handleInputChange = async (date_id: string, dateIndex: string, date: string) => {
        const data = {
            id: date_id,
            date: date
        }
        const item = await updateDataWithToken('package/update-date/group-datessss', data, navigate);
        console.log(item);
        console.log(dateIndex);
        setEditState({ rowIndex: null, dateIndex: null, value: '' });
        get_dates();
    }

    const [ndate, setNdate] = React.useState<string>('');
    interface Gdate { _id: string; dates: { dt: string, id: string }[]; month: string; year: string, }
    const [dates, setDates] = React.useState<Gdate[]>([]);
    const navigate = useNavigate();
    const getpackages = async () => {
        const resp = await getData('package', navigate);
        setPackages(resp.data);
    }
    const handleDopen = (id: string) => {
        setPid(id);
        setDopen(!dopen);

    }

    const handleimgopen = (id: string) => {

        setimgeditopen(!imgeditopen);

    }
    useEffect(() => {
        if (pid) {
            get_dates();
        }

    }, [pid])
    const save_date = async () => {
        await postDataWithToken('package/group-dates', { package: pid, date: ndate }, navigate);
        get_dates();
    }
    const get_dates = async () => {
        const items = await getData('package/group-dates/' + pid, navigate);
        setDates(items.data);
    }
    const [banner, setBanner] = React.useState<File>();
    const handleBanner = async (id: string) => {
        if (banner) {
            const fdata = new FormData();
            fdata.append('banner', banner);
            await formDataWithTokenUpdate(`package/change-banner/${id}`, fdata, navigate);
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
        await delete_data('package/' + deleteId, navigate);
        getpackages();
        setConfirmDelete(false) // Hide confirmation modal after delete
    }


    // const save_image = async () => {

    //     const rsp = await formDataWithTokenUpdate('galleryimage/' + imgid, editImg, navigate);
    //     console.log(rsp);
    // };

    const save_image = async () => {
        try {
            if (!editImg) {
                throw new Error("No image selected");
            }

            const formData = new FormData();
            editImg.forEach((file) => {
                formData.append(`images`, file);
            });

            const resp = await formDataWithTokenUpdate('package/galleryimage/' + imgid, formData, navigate);

            setimgeditopen(false)
            getpackages()
        } catch (error) {
            console.error(error);
        }
    };






    // Define your state and functions properly
    const handleEdit = (images: Image[], id: string): void => {
        seteditimgdata(images);
        setimgid(id);
        setimgeditopen(true);
    };

    // const handleRemoveImage = async (path: string) => {
    //     // Handle image removal
    //     seteditimgdata(prevImages => prevImages.filter(img => img.path !== path));
    //     let res = await 
    // };
    const handleRemoveImage = async (path: string, delid: string) => {
        seteditimgdata(prevImages => prevImages.filter(img => img.path !== path));
        await delete_data(`package/deletegalleryimage/${imgid}/` + delid, navigate);
        getpackages()
    }

    // const handleimageedit = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files && e.target.files.length > 0) {
    //         setEditImg(e.target.files[0])
    //     }
    // };
    const handleimageedit = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files); // Convert FileList to array
            setEditImg(filesArray); // Update state with the array of files
        }

    };


    const handleSave = async () => {
        return false;
        // Create a deep copy of the dates to compare with
        const originalDates = [...dates];

        // Map through the dates to apply the updates
        const updatedDates = dates.map((item, rowIdx) => {
            if (rowIdx === editState.rowIndex) {
                const updatedDatesArray = item.dates.map((date, dateIdx) => {
                    if (dateIdx === editState.dateIndex) {
                        return editState.value; // Update with the new value
                    }
                    return date;
                });
                return { ...item, dates: updatedDatesArray, _id: item._id }; // Ensure to include the _id for each item
            }
            return item;
        });

        // Identify changed dates by comparing with the original
        const changedDates = updatedDates.filter((item, rowIdx) => {
            return originalDates[rowIdx] &&
                originalDates[rowIdx].dates.some((date, dateIdx) => {
                    return date !== updatedDates[rowIdx].dates[dateIdx];
                });
        });

        // Extract IDs of the changed dates
        console.log(changedDates)
        const updateRequests = {
            _id: changedDates[0]._id,
            dates: changedDates[0].dates
        }

        console.log(updateRequests);

        // Send only changed dates to the server
        try {
            // Assuming updateDataWithToken can handle array of updates
            let res = await updateDataWithToken('package/update-date/group-datessss', updateRequests, navigate);
            console.log(res);
        } catch (error) {
            console.error('Update failed:', error);
        }

        // Reset the edit state
        setEditState({ rowIndex: null, dateIndex: null, value: '' });
    };





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
                                    <input placeholder='Enter new date' type="date" onChange={(e) => setNdate(e.target.value)} value={ndate} className="w-full outline-none p-3" />
                                    <button onClick={save_date} className='text-xs text-nowrap px-5 bg-primary text-white rounded-e'>Add Date</button>
                                </div>
                                <div className="w-full mt-3">
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
                                                                {idx + 1}
                                                            </td>
                                                            <td>
                                                                {itm.month} {itm.year}
                                                            </td>

                                                            <td>
                                                                {itm.dates.map((dt, dateIdx) => (
                                                                    editState.rowIndex === idx && editState.dateIndex === dateIdx ? (
                                                                        <>

                                                                            <input
                                                                                key={dateIdx}
                                                                                type="date"
                                                                                value={editState.value}
                                                                                onChange={(e) => handleInputChange(dt?.id, dateIdx, e.target.value)}

                                                                                className="border rounded px-2 py-1"
                                                                            />
                                                                        </>
                                                                    ) : (
                                                                        <span
                                                                            key={dateIdx}
                                                                            className="me-2 cursor-pointer"
                                                                            onClick={() => handleEditStart(idx, dateIdx, dt.dt)}
                                                                        >
                                                                            {moment(dt.dt).format('DD-MMM-YYYY')}
                                                                        </span>
                                                                    )
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
            {
                imgeditopen && (
                    <>
                        <Dialog open={imgeditopen} handler={() => handleimgopen('')} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <DialogHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                Package Gallery Image
                            </DialogHeader>
                            <DialogBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                <div className="w-full flex flex-wrap gap-2 ">
                                    {editimgdata.map((img) => (
                                        <div key={img.path} className="relative">
                                            <img src={base_url + img.path} alt="" className="size-28 " />
                                            <button
                                                onClick={() => handleRemoveImage(img.path, img._id)}
                                                className="absolute top-2 right-2 text-black hover:text-white bg-gray-100 rounded-full size-8 leading-8 hover:bg-gray-600"
                                            >
                                                <CloseOutlined />
                                            </button>
                                        </div>
                                    ))}

                                </div>
                                <div className="w-full flex border border-blue-gray-200 rounded overflow-hidden mt-2">
                                    <input
                                        placeholder="Select new image"
                                        type="file"
                                        multiple
                                        onChange={(e) => handleimageedit(e)}
                                        className="w-full outline-none p-3"
                                    />
                                    <button
                                        onClick={save_image}
                                        className="text-xs text-nowrap px-5 bg-primary text-white rounded-e"
                                    >
                                        Upload Image
                                    </button>
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
                                                    {/* <div className="w-full flex flex-wrap gap-1">
                                                        {
                                                            pack.gallery.map((img) => (
                                                                <img src={base_url + img.path} alt="" className="size-14" />
                                                            ))
                                                        }
                                                    </div> */}
                                                    <div className="w-full flex flex-wrap gap-1">
                                                        {pack.gallery.map((img) => (
                                                            <div key={img.path} className="relative">
                                                                <img src={base_url + img.path} alt="" className="size-14" />


                                                            </div>
                                                        ))}


                                                    </div>
                                                    <button onClick={() => handleEdit(pack.gallery, pack._id)} className='px-2 rounded bg-secondary/50 text-white py-1 mt-2' ><FileImageFilled /></button>


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
