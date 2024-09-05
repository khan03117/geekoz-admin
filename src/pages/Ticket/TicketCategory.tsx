import React from 'react'
import FormLabel from '../../layout/FormLabel'
import { delete_data, formcontrol, getData, postDataWithToken, updateDataWithToken } from '../../utils'
import { useNavigate } from 'react-router-dom'
import AlertBox from '../../layout/AlertBox'

const TicketCategory: React.FC = () => {
    interface Category { _id: string, title: string, url: string }
    const navigate = useNavigate();
    interface ApiResp { success: string, message: string }
    const [title, setTitle] = React.useState('');
    const [msg, setMsg] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [cats, setCats] = React.useState<Category[]>([]);
    const [edit_id, setEditId] = React.useState('');
    const saveCategory = async () => {
        if (edit_id) {
            const resp: ApiResp = await updateDataWithToken('ticket-category/update/' + edit_id, { title: title }, navigate);
            setMsg(resp.message);
            setStatus(resp.success);
            setEditId('')
            setTimeout(() => {
                setMsg('');
                setStatus('');
            }, 2000);
        } else {
            const resp: ApiResp = await postDataWithToken('ticket-category', { title: title }, navigate);
            setMsg(resp.message);
            setStatus(resp.success);
            setTimeout(() => {
                setMsg('');
                setStatus('');
            }, 2000);
        }
        getCats();

    }
    const getCats = async () => {
        const items = await getData('ticket-category', navigate);
        setCats(items.data)
    }
    const handleEdit = (id: string) => {
        setEditId(id);
        const found = cats.find(itm => itm._id === id);
        if (found) {
            setTitle(found.title)
        }
    }
    const handleDelete = async (id: string) => {
        const resp: ApiResp = await delete_data('ticket-category/delete/' + id, navigate);
        setMsg(resp.message);
        setStatus(resp.success);
        setTimeout(() => {
            setMsg('');
            setStatus('');
        }, 2000);
        getCats();

    }
    React.useEffect(() => {
        getCats();
    }, [])


    return (
        <>
            <section>
                <div className="container">
                    <div className="grid grid-cols-12 mb-5">
                        <div className="col-span-12">
                            {
                                msg && (
                                    <>
                                        <AlertBox message={msg} status={status} />
                                    </>
                                )
                            }
                        </div>
                        <div className="col-span-4">
                            <FormLabel label={'Enter Category'} />
                            <div className="flex items-center">
                                <input type="text" value={title} name="title" onChange={(e) => setTitle(e.target.value)} id="title" className={formcontrol} />
                                <button onClick={saveCategory} className="px-5 py-2 bg-primary text-white rounded-e">Submit</button>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-12">
                        <div className="col-span-12">
                            <table className="w-full">
                                <thead>
                                    <tr className='*:text-start  *:bg-primary *:text-white *:border *:border-blue-gray-300 *:p-2'>
                                        <th>Sr No</th>
                                        <th>Title</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cats.map((itm, idx) => (
                                            <>
                                                <tr className='*:text-sm *:border *:border-blue-gray-300 *:p-2'>
                                                    <td>
                                                        {idx + 1}
                                                    </td>
                                                    <td>
                                                        {itm.title}
                                                    </td>
                                                    <td>
                                                        <button onClick={() => handleEdit(itm._id)} className='bg-secondary text-white text-xs px-3 py-2 rounded me-3'>Edit</button>
                                                        <button onClick={() => handleDelete(itm._id)} className='bg-primary text-white text-xs px-3 py-2 rounded'>Delete</button>
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
            </section>
        </>
    )
}

export default TicketCategory