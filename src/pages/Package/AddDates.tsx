import React from 'react'

const AddDates : React.FC = () => {
    return (
        <>
            <section>
                <div className="container">
                    <div className="grid grid-cols-1">
                        <div className="w-full">
                            <div className="w-1/4">
                                <div className="w-full flex">
                                    <input type="date" name="" id="" className="w-full outline-none" />
                                    <button>Add Date</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AddDates