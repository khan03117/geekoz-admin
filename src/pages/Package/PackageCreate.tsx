import React from 'react'
import Label from './Label'
import CkeditorCom from '../../layout/CkeditorCom'

const PackageCreate: React.FC = () => {
    const [editorData, setEditorData] = React.useState<string>('');
    const handleEditorChange = (data: string) => {
        setEditorData(data);
    };
    return (
        <>
            <section className="py-10">
                <div className="container">
                    <div className="grid grid-cols-4 gap-3">
                        <div className="col-span-1">
                            <div className="w-full">
                                <Label title={'Travel  Country'} hfor={'country'} />
                                <input type="text" id="country" placeholder='Country Name' className=" w-full px-2 py-1 text-start text-sm border rounded border-blue-gray-200 outline-none" />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="w-full">
                                <label className='form-label text-secondary' htmlFor="destination">Select Destination</label>
                                <select name="" id="destination" className="w-full border text-xs rounded border-blue-gray-200 p-2 outline-none">
                                    <option value="">--Select--- </option>
                                </select>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <label className='form-label text-secondary' htmlFor="duration">Duration</label>
                            <div className="flex w-full gap-2">
                                <div className='flex w-1/3 rounded overflow-hidden  border border-blue-gray-200 text-xs'>
                                    <input type="number" placeholder='Days' name="" id="" className="h-8 w-full px-1  text-center text-sm border-e border-blue-gray-200 outline-none" />
                                    <span className='block h-8 w-10 text-center leading-8 bg-yellow-200 text-black'>D</span>
                                </div>
                                <div className='flex w-1/3  rounded overflow-hidden  border border-blue-gray-200 text-xs'>
                                    <input type="number" placeholder='Nights' name="" id="" className="h-8  w-full px-1 text-center text-sm border-e border-blue-gray-200 outline-none" />
                                    <span className='block h-8 w-10 text-center leading-8  bg-gray-500 text-white'>N</span>
                                </div>
                                <div className='flex w-1/3  rounded overflow-hidden  border border-blue-gray-200 text-xs'>
                                    <input type="number" placeholder='Pax' name="" id="" className="h-8  w-full px-1 text-center text-sm border-e border-blue-gray-200 outline-none" />
                                    <span className='block h-8 w-10 text-center leading-8  bg-primary text-white'>PAX</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <Label title='Upload Images' hfor={'file'} />
                            <input type="file" id="file" placeholder='Upload Images' className=" w-full px-2 py-1 text-center text-sm border rounded border-blue-gray-200 outline-none" />
                        </div>
                        <div className="col-span-1">
                            <div className="w-full">
                                <Label title={'Package Type'} hfor={null} />
                                <select name="" id="destination" className="w-full border text-xs rounded border-blue-gray-200 p-2 outline-none">
                                    <option value="">--Select--- </option>
                                    <option value="">Group</option>
                                    <option value="">Individual</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="w-full">
                                <Label title={'Price'} hfor={'price'} />
                                <div className="flex border border-blue-gray-200">
                                    <select name="" id="destination" className="w-20  text-xs rounded  p-2 outline-none">
                                        <option value="">--Select--- </option>
                                        <option value="">Per Head</option>
                                        <option value="">Overall</option>
                                    </select>
                                    <input type="text" id="price" placeholder='Enter price' className=" w-full px-2 py-1 text-start text-sm border-e rounded border-blue-gray-200 outline-none" />

                                </div>
                            </div>
                        </div>
                        <div className="col-span-4">
                            <Label title='Enter Description' hfor={'Description'} />
                            <CkeditorCom value={editorData} onChange={handleEditorChange} />
                        </div>
                        <div className="col-span-2">
                            <Label title='Enter Inclusion' hfor={'Inclusion'} />
                            <CkeditorCom value={editorData} onChange={handleEditorChange} />
                        </div>
                        <div className="col-span-2">
                            <Label title='Enter Exclusion' hfor={'Exclusion'} />
                            <CkeditorCom value={editorData} onChange={handleEditorChange} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default PackageCreate
