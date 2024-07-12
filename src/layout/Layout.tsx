import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'

const Layout: React.FC = () => {

    const token: string | null = localStorage.getItem('atoken');
    const navigate = useNavigate();

    React.useEffect(() => {
        // Redirect to login if token is not present
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    // Render nothing if not authenticated
    if (!token) {
        return null;
    }

    return (
        <>

            <div className={`w-full h-lvh overflow-hidden`}>
                <Header />
                <div className="flex">
                    <PerfectScrollbar className='w-[15rem] fixed start-0 top-18  max-h-[calc(100vh-5rem)] z-50 overflow-y-auto'>

                        <div className={` py-3 overflow-x-hidden bg-transparent transition-all duration-300 w-full`}>
                            <Sidebar />
                        </div>

                    </PerfectScrollbar>
                    <div className="w-[calc(100%-15rem)] ms-[15rem]">
                        <PerfectScrollbar className='w-full h-lvh   overflow-x-hidden overflow-y-auto'>
                            <main className='p-5 pb-28'>
                                <Outlet />
                            </main>
                        </PerfectScrollbar>
                    </div>
                </div>

                <Footer />
            </div>



        </>
    )
}

export default Layout
