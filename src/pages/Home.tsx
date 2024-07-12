import React from 'react'

const Home: React.FC = () => {
    return (
        <>
            <section>
                <div className="container">
                    <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-1">
                            <div className="w-full  border rounded-lg shadow-sm shadow-blue-gray-100">
                                <div className="p-2 card-header border-b border-blue-gray-100">
                                    <h4 className="text-sm font-bold">Total Products</h4>
                                </div>
                                <div className="w-full flex p-2 justify-between">
                                    <span className="text-lg font-bold">180</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="w-full  border rounded-lg shadow-sm shadow-blue-gray-100">
                                <div className="p-2 card-header border-b border-blue-gray-100">
                                    <h4 className="text-sm font-bold">Today Orders</h4>
                                </div>
                                <div className="w-full flex p-2 justify-between">
                                    <span className="text-lg font-bold">180</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="w-full  border rounded-lg shadow-sm shadow-blue-gray-100">
                                <div className="p-2 card-header border-b border-blue-gray-100">
                                    <h4 className="text-sm font-bold">Empty Stock</h4>
                                </div>
                                <div className="w-full flex p-2 justify-between">
                                    <span className="text-lg font-bold">180</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="w-full  border rounded-lg shadow-sm shadow-blue-gray-100">
                                <div className="p-2 card-header border-b border-blue-gray-100">
                                    <h4 className="text-sm font-bold">All Orders</h4>
                                </div>
                                <div className="w-full flex p-2 justify-between">
                                    <span className="text-lg font-bold">180</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home
