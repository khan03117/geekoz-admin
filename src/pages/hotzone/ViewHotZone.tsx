import React from 'react'
import { base_url, getData } from '../../utils';
import { useNavigate } from 'react-router-dom';

const ViewHotZone: React.FC = () => {
    const navigate = useNavigate();
    interface HotZone { _id: string, url: string, file: string, file_type: string }
    const [items, setItems] = React.useState<HotZone[]>([]);
    const getitems = async () => {
        const resp = await getData('hot-zone', navigate);
        setItems(resp.data);
    }
    React.useEffect(() => {
        getitems();
    }, []);
    return (
        <>
            <section>
                <div className="container">
                    <table className="w-full">
                        <thead>
                            <tr className='*:text-start  *:bg-primary *:text-white *:border *:border-blue-gray-300 *:p-2'>
                                <th>Sr No</th>
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
                                        {itm.file_type}
                                    </td>
                                    <td>
                                      <a href={itm.url} className='bg-secondary text-white p-2 rounded text-sm'>View</a>
                                    </td>
                                    <td>
                                        {
                                            itm.file_type.split('/')[0] == "image" && (
                                                <>
                                                <img src={base_url + itm.file} alt="" className="max-w-full size-24 border border-blue-gray-300 rounded object-cover" />
                                                </>
                                            )
                                        }
                                        {
                                            itm.file_type.split('/')[0] == "video" && (
                                                <>
                                                <video controls src={base_url + itm.file}></video>
                                               
                                                </>
                                            )
                                        }
                                        {
                                            itm.file_type.split('/')[1] == "pdf" && (
                                                <>
                                                <a href={base_url + itm.file} target='_blank' className="text-primary" >View</a>
                                                </>
                                            )
                                        }
                                      
                                    </td>
                                    <td>
                                        <button className='bg-primary text-white p-2 rounded text-xs'>Delete</button>
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