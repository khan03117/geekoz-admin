import React from 'react'
import { getData, delete_data, base_url } from '../../utils';
import { DownloadOutlined } from '@ant-design/icons';

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
    const getpackages = async () => {
        const resp = await getData('package');
        setPackages(resp.data);
    }
    const deletepackage = async (id: string) => {
        await delete_data('package/' + id);
        getpackages();
    }
    React.useEffect(() => {
        getpackages();
    }, []);
    return (
        <>
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
                                                </td>
                                                <td>
                                                    <ul>
                                                        <li>
                                                            Destinaton :   {pack?.destination?.title}
                                                        </li>
                                                        <li>
                                                            Country : {pack?.destination?.country}
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
                                                    <button className='bg-secondary p-2 text-white rounded text-xs'>Edit</button>
                                                    <button onClick={() => deletepackage(pack._id)} className='bg-primary p-2 text-white rounded text-xs ms-2'>Delete</button>
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
