import { Input, Textarea } from '@material-tailwind/react'
import React, { useState } from 'react'
import { postDataWithToken } from '../../utils';
import { Link } from 'react-router-dom';

const CreateFaq: React.FC = () => {
    const [faq, setFaq] = useState<string>('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState<string>('');
    interface ApiResponse {
        success: string;
        message: string;
    }
    const submitdata = async () => {
        if (faq && description) {
            const data = {
                question: faq,
                answer: description
            }
            const resp: ApiResponse = await postDataWithToken('faq', data);
            setMessage(resp.message);
            setTimeout(() => {
                setMessage('')
            }, 2000)
        }
    }
    return (
        <section>
            <div className="container">
                <div className="w-full mb-10 text-end">
                    <Link to={'/faq'} className="px-4 py-2 text-sm bg-primary text-white">View Faq</Link>
                </div>
                <div className="grid grid-cols-4">
                    {
                        message && (
                            <>
                                <div className="w-full col-span-4 mb-10 bg-green-800 text-white p-2 text-sm">
                                    {message}
                                </div>
                            </>
                        )
                    }
                    <div className="col-span-4 mb-5">
                        <Input onChange={(e) => setFaq(e.target.value)} value={faq} label='Enter Faq Question' onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                    </div>
                    <div className="col-span-4">
                        <Textarea label='Enter Description for faq' value={description} onChange={(e) => setDescription(e.target.value)} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                    </div>
                    <div className="col-span-4">
                        <button onClick={submitdata} className="bg-primary text-white px-4 py-2 rounded">Submit</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CreateFaq
