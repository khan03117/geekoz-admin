import React from 'react'
interface Prop {
    label: string;
}
const FormLabel: React.FC<Prop> = ({ label }) => {
    return (
        <label htmlFor="" className='text-xs  text-primary block mb-2 font-light uppercase tracking-wider'>{label}</label>
    )
}

export default FormLabel