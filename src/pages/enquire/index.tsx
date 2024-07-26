import React from 'react'
import { delete_data, getData } from '../../utils';
import ConfirmPopup from '../../layout/ConfirmPopup';

const Enquire = () => {
    interface Enquire {
        _id: string;
        name: string;
        email: string;
        mobile: string;
        destination: string;
    }
    const [enquires, setEnquired] = React.useState<Enquire[]>([]);
    const [deleteId, setDeleteId] = React.useState<string | null>(null);
    const [confirmDelete, setConfirmDelete] = React.useState<boolean>(false);
    const getdata = async () => {
        const items = await getData('enquire');
        setEnquired(items.data);
    }
    React.useEffect(() => {
        getdata();
    }, []);


    const showDeleteConfirmation = (id: string) => {
        setDeleteId(id);
        setConfirmDelete(true);
    }

    const handleDeleteConfirmed = async () => {
        await delete_data('enquire/' + deleteId);
        getdata();



        setConfirmDelete(false) // Hide confirmation modal after delete
    }
    return (
        <>
            {confirmDelete && (
                <ConfirmPopup

                    onConfirm={handleDeleteConfirmed}
                    onCancel={() => setConfirmDelete(false)}
                />
            )}
            <section className="py-5">
                <div className="container">
                    <div className="grid grid-cols-1">
                        <h4 className="text-2xl mb-4 font-semibold">List of enquires</h4>
                        <div className="col-span-1">
                            <div className="w-full">
                                <table className="w-full">
                                    <thead>
                                        <tr className='*:text-sm *:text-start *:p-2 *:border *:border-blue-gray-200'>
                                            <th>Sr No</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Mobile</th>
                                            <th>Destination</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            enquires.map((itm, index) => (
                                                <>
                                                    <tr className='*:text-sm *:p-2 *:border *:border-blue-gray-200'>
                                                        <td>
                                                            {index + 1}
                                                        </td>
                                                        <td>
                                                            {itm.name}
                                                        </td>
                                                        <td>
                                                            {itm.email}
                                                        </td>
                                                        <td>
                                                            {itm.mobile}
                                                        </td>
                                                        <td>
                                                            {itm.destination}
                                                        </td>
                                                        <td>
                                                            <button onClick={() => showDeleteConfirmation(itm._id)} className='px-2 py-1 rounded bg-primary text-white'>
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Enquire
