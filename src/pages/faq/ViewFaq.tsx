import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import { delete_data, getData } from '../../utils';
import { DeleteOutlined } from '@ant-design/icons';
const ViewFaq: React.FC = () => {
    interface FAQ {
        _id: string;
        question: string;
        answer: string;
    }
    const [open, setOpen] = React.useState(0);
    const [faqs, setFaq] = useState<FAQ[]>([]);
    const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
    const getdata = async () => {
        await getData('faq').then(resp => {
            setFaq(resp.data);
        })
    }
    const handledelete = async (id: string) => {
        await delete_data('faq/' + id);
        getdata();
    }
    useEffect(() => {
        getdata();
    }, [])
    return (
        <section>
            <div className="container">
                <div className="w-full mb-10 text-end">
                    <Link to={'/faq/create'} className="px-4 py-2 text-sm bg-primary text-white">Create New</Link>
                </div>
                <div className="w-full">

                    {
                        faqs.length > 0 && faqs.map((faq, index) => (
                            <>
                                <Accordion open={open === index} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                    <AccordionHeader className='relative text-sm' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onClick={() => handleOpen(index)}>
                                        {faq.question}

                                        <button onClick={() => handledelete(faq._id)} className="absolute z-50 px-5 py-1 bg-red-700 text-white rounded text-sm end-0 top-0">
                                            <DeleteOutlined /> Delete
                                        </button>
                                    </AccordionHeader>
                                    <AccordionBody className="text-xs">
                                        {faq.answer}
                                    </AccordionBody>
                                </Accordion>
                            </>
                        ))
                    }


                </div>
            </div>
        </section>
    )
}

export default ViewFaq
