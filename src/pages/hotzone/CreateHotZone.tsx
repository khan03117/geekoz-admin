import React from 'react'
import FormLabel from '../../layout/FormLabel'
import { formcontrol, formDataWithToken } from '../../utils'
import { useNavigate } from 'react-router-dom'

const CreateHotZone: React.FC = () => {
    const navigate = useNavigate();
    const [file, setFile] = React.useState<File>();
    const [url, setUrl] = React.useState('');
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files.length > 0) {
            setFile(files[0]);
        }
    };

    const submitform = async () => {
        const fdta = new FormData();
        fdta.append('url', url);
        if (file) {
            fdta.append('image', file);
        }
        await formDataWithToken('hot-zone', fdta, navigate);

    }

    return (
        <>
            <section>
                <div className="container">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1">
                            <FormLabel label={'Select Media File'} />
                            <input type="file" onChange={handleFileChange} name="" id="" className={formcontrol} />
                        </div>
                        <div className="col-span-1">
                            <FormLabel label={'Enter Url'} />
                            <input type="text" onChange={(e) => setUrl(e.target.value)} name="url" id="" className={formcontrol} />
                        </div>
                        <div className="col-span-1 text-end pt-7">
                            <button onClick={submitform} className="bg-primary text-white px-5 py-2 rounded">Submit</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CreateHotZone