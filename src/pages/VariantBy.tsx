import { LeftOutlined, SaveOutlined } from '@ant-design/icons';
import React from 'react'


const VariantBy: React.FC = () => {


    const [title, setTitle] = React.useState<string>('');
    const postdata = async () => {
        const formData = new FormData();


        formData.append('title', title);
        //logic for post
    }
    const handletitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    return (
        <>
            <section>
                <div className="container">
                    <div className="flex gap-3 justify-end mb-10">

                        <button className="text-sm bg-black px-4 py-2 text-white uppercase font-light tracking-widest rounded-lg shadow-lg"><LeftOutlined /> Back</button>
                    </div>
                    <div className="grid grid-cols-4 gap-5">



                        <div className="col-span-2">

                            <label htmlFor="">Enter Title</label>
                            <div className="flex">
                                <input title='Title' type="text" onChange={handletitle} name="" id="" className="form-control rounded-none" />
                                <button type='button' onClick={postdata} title='button' className="text-sm bg-primary px-4 uppercase font-light tracking-widest text-nowrap py-2 rounded-none shadow-lg  text-white inline-block"><SaveOutlined /> Save Variant</button>
                            </div>

                        </div>

                        <div className="col-span-4">
                            <div className="w-full mt-10">
                                <table className="w-full *:text-start table-fixed">
                                    <thead>
                                        <tr className='*:text-start  *:border *:border-blue-gray-300 *:p-2'>
                                            <th>Sr No</th>
                                            <th>Title</th>

                                            <th>Edit</th>
                                        </tr>
                                    </thead>

                                </table>
                            </div>
                        </div>



                    </div>



                </div>
            </section>
        </>
    )
}

export default VariantBy;
