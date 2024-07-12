import { Input } from '@material-tailwind/react'
import React from 'react'
import { postData } from '../utils';
import { useNavigate } from 'react-router-dom';
import loginimg from '../assets/login.jpg'
interface Fdata {
    email: string;
    password: string;
}


const Login: React.FC = () => {
    interface ApiResponse {
        success: string;
        message: string;
        data: string;
    }
    const [fdata, setFdata] = React.useState<Fdata>({ email: '', password: '' });
    const [status, setStatus] = React.useState<string>('');
    const [msg, setMsg] = React.useState<string>('');
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFdata((prev: Fdata) => ({
            ...prev,
            [name]: value
        }));
    };
    const post_data = async () => {
        const resp: ApiResponse = await postData('social', fdata);
        setStatus(resp.success)
        if (resp.success == "1") {
            localStorage.setItem('atoken', resp.data);
            navigate('/dashboard');
        } else {
            setMsg(resp.message);
        }
    }
    React.useEffect(() => {
        if (status == "1") {
            navigate('/dashboard');
        }
    }, [status, navigate]);
    return (
        <>
            <section className="">
                <div className="w-full ">
                    <div className="grid grid-cols-2">
                        <div className="col-span-1">
                            <img src={loginimg} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="col-span-1">
                            <div className="w-full h-full">
                                <div className=" h-screen flex items-center bg-white justify-center">

                                    <div className=" w-[24rem] p-5 shadow-lg shadow-blue-gray-200 rounded-md bg-white">
                                        <div className="form-group mb-5">
                                            <h4 className="text-2xl font-bold">Login</h4>
                                        </div>
                                        {
                                            msg && (
                                                <>
                                                    <div className={`w-full my-5 rounded-md ${status == "1" ? 'bg-green-700' : 'bg-red-700'}`}>
                                                        <div className="w-full rounded-md p-4 text-white">
                                                            {msg}
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }
                                        <div className="form-group mb-5">
                                            <Input label='Enter Username' name='email' onChange={handleInputChange} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />

                                        </div>
                                        <div className="form-group mb-5">
                                            <Input type='password' name='password' label='Enter Password' onChange={handleInputChange} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />

                                        </div>
                                        <div className="form-group w-full">
                                            <button onClick={post_data} title="login" className="bg-primary text-white w-full py-2 rounded-md">Login</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default Login
