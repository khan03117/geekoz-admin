// import { useLocation, Link } from 'react-router-dom';
import {
    BranchesOutlined,
    ContactsOutlined,
    EnvironmentOutlined,
    FileImageOutlined,
    FileOutlined,
    GiftOutlined,
    GroupOutlined,
    InfoCircleFilled,
    LogoutOutlined,
    MessageOutlined,
    OrderedListOutlined,
    ProductFilled,
    ProductOutlined,
    QuestionOutlined,
    TagsOutlined,
    WindowsOutlined
} from '@ant-design/icons';
import SideLink from './SideLink';

const Sidebar = () => {


    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }


    return (
        <div className="w-full rounded-e-3xl h-[100%] overflow-x-hidden overflow-y-auto relative bg-white border border-primary">
            <ul className='masterdata_ul mb-20 py-1 px-3 text-sm font-light text-primary tracking-wider'>
                <li>
                    <SideLink title={'Dashboard'} link={'dashboard'} icon={<WindowsOutlined />} />
                </li>
                <li className='my-4 py-4'>
                    <h4 className="text-deep-orange-900 ps-3 font-bold text-md">Master Data</h4>
                </li>
                <li>
                    <SideLink title={'Region'} link={'region'} icon={<EnvironmentOutlined />} />
                </li>
                <li>
                    <SideLink title={'Destinations'} link={'countries'} icon={<OrderedListOutlined />} />
                </li>
                <li>
                    <SideLink title={'Category'} link={'category'} icon={<GroupOutlined />} />
                </li>
                <li>
                    <SideLink title={'Activity'} link={'activity'} icon={<BranchesOutlined />} />
                </li>
                <li>
                    <SideLink title={'Promo Code'} link={'promo-code'} icon={<GiftOutlined />} />
                </li>
                <li className='my-4 py-4'>
                    <h4 className="text-deep-orange-900 ps-3 font-bold text-md">Web Management</h4>
                </li>
                <li>
                    <SideLink title={'Banner'} link={'banner'} icon={<FileImageOutlined />} />
                </li>
                <li>
                    <SideLink title={'Testimonial'} link={'testimonial'} icon={<MessageOutlined />} />
                </li>
                <li>
                    <SideLink title={'Social Contact'} link={'contact-details'} icon={<ContactsOutlined />} />
                </li>
                <li>
                    <SideLink title={'Policy'} link={'policy'} icon={<FileOutlined />} />
                </li>
                <li>
                    <SideLink title={'Faq'} link={'faq'} icon={<InfoCircleFilled />} />
                </li>
                <li className='my-4 py-4'>
                    <h4 className="text-deep-orange-900 ps-3 font-bold text-md">Package Management</h4>
                </li>
                <li>
                    <SideLink title={'Add Package'} link={'packages/create'} icon={<ProductOutlined />} />
                </li>
                <li>
                    <SideLink title={'View Package'} link={'packages'} icon={<ProductFilled />} />
                </li>
                <li className='hidden'>
                    <SideLink title={'Offer'} link={'offer'} icon={<TagsOutlined />} />
                </li>
                <li>
                    <SideLink title={'Enquires'} link={'enquire'} icon={<QuestionOutlined />} />
                </li>
            </ul>
            <div className="w-full bg-white h-auto inline-block pt-3 border-t border-blue-gray-500">
                <button onClick={logout} className='w-full py-2 text-start text-secondary px-4 block bg-opacity-30 rounded-lg'>
                    <LogoutOutlined /> <span className="ms-5">Logout</span>
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
