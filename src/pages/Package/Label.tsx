import React from 'react'
interface Prop {
    title: string;
    hfor: string | null;
}
const Label: React.FC<Prop> = ({ title, hfor }) => {
    return (
        <>
            <label className='form-label text-secondary' htmlFor={hfor ? hfor : ""}>{title}</label>

        </>
    )
}

export default Label
