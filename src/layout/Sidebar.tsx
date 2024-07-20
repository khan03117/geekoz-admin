import { BranchesOutlined, ContactsOutlined, EnvironmentOutlined, FileImageOutlined, FileOutlined, GiftOutlined, InfoCircleFilled, LogoutOutlined, MessageOutlined, OrderedListOutlined, ProductFilled, ProductOutlined, TagsOutlined, WindowsOutlined } from '@ant-design/icons'
// import { Collapse } from '@material-tailwind/react'
// import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {


    // const [open, setOpen] = React.useState('');
    // const handleopen = (str: string) => {
    //     if (open != str) {
    //         setOpen(str);
    //     } else {
    //         setOpen('')
    //     }
    // }

    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }
    return (
        <>
            <div className="w-full rounded-e-3xl h-[100%] overflow-x-hidden overflow-y-auto relative bg-white border border-primary ">


                <ul className='masterdata_ul mb-20  *:py-1 px-3 *:text-sm *:font-light *:text-primary  *:tracking-wider'>
                    <li>
                        <Link to={'/dashboard'} className='w-full  py-2 ps-3 text-start block rounded-lg bg-primary text-white'>
                            <WindowsOutlined /> <span className="ms-5 font-bold">
                                Dashboard
                            </span>
                        </Link>
                    </li>
                    <li className='my-4 py-4'>
                        <h4 className="text-deep-orange-900 ps-3 font-bold text-md">Master Data</h4>
                    </li>
                    <li>
                        <Link to={'/region'} className='w-full  py-2 px-4 block bg-opacity-30 rounded-lg'>
                            <EnvironmentOutlined />  <span className="ms-5">Region </span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/countries'} className='w-full  py-2 px-4 block bg-opacity-30 rounded-lg'>
                            <OrderedListOutlined />  <span className="ms-5">Destinations </span>
                        </Link>
                    </li>

                    <li>
                        <Link to={'/activity'} className='w-full  py-2 px-4 block bg-opacity-30 rounded-lg'>
                            <BranchesOutlined />  <span className="ms-5">Activity </span>
                        </Link>
                    </li>

                    <li>
                        <Link to={'/promo-code'} className='w-full  py-2 px-4 block bg-opacity-30 rounded-lg'>
                            <GiftOutlined /> <span className="ms-5">Promo Code </span>
                        </Link>
                    </li>


                    <li className='my-4 py-4'>
                        <h4 className="text-deep-orange-900 ps-3 font-bold text-md">Web Management</h4>
                    </li>
                    <li>
                        <Link to={'/banner'} className='w-full  py-2 px-4 block bg-opacity-30 rounded-lg'>
                            <FileImageOutlined /> <span className="ms-5">Banner </span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/testimonial'} className='w-full  py-2 px-4 block bg-opacity-30 rounded-lg'>
                            <MessageOutlined />   <span className="ms-5">Testimonial </span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/contact-details'} className='w-full  py-2 px-4 block bg-opacity-30 rounded-lg'>
                            <ContactsOutlined />   <span className="ms-5">Social Contact </span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/policy'} className='w-full  py-2 px-4 block bg-opacity-30 rounded-lg'>
                            <FileOutlined />   <span className="ms-5">Policy </span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/faq'} className='w-full  py-2 px-4 block bg-opacity-30 rounded-lg'>
                            <InfoCircleFilled />   <span className="ms-5">Faq </span>
                        </Link>
                    </li>
                    <li className='my-4 py-4'>
                        <h4 className="text-deep-orange-900 ps-3 font-bold text-md">Package Management</h4>
                    </li>
                    <li>
                        <Link to={'/packages/create'} className='w-full  py-2 px-4 block bg-opacity-30 rounded-lg'>
                            <ProductOutlined />   <span className="ms-5">Add Package </span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/packages'} className='w-full  py-2 px-4 block bg-opacity-30 rounded-lg'>
                            <ProductFilled />   <span className="ms-5">View Packages </span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/offer'} className='w-full  py-2 px-4 block bg-opacity-30 rounded-lg'>
                            <TagsOutlined />   <span className="ms-5">Offer </span>
                        </Link>
                    </li>

                </ul>
                <div className="w-full bg-white h-auto  inline-block pt-3 border-t border-blue-gray-500">
                    <button onClick={logout} className='w-full py-2 text-start text-secondary px-4 block bg-opacity-30 rounded-lg'>
                        <LogoutOutlined />  <span className="ms-5">Logout </span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Sidebar
