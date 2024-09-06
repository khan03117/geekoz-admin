import React from 'react'
import { getData } from '../../utils';
import { useNavigate } from 'react-router-dom';

const ViewTickets: React.FC = () => {
    const navigate = useNavigate();
    interface Ticket {
        _id: string;
        title: string;
        category: {
            _id: string;
            title: string;
        },
        description: string;
        location: string;
        destination: {
            _id: string;
            title: string;
        }
    }
    const [tickets, setTickets] = React.useState<Ticket[]>([]);
    const gettickets = async () => {
        const item = await getData('ticket', navigate);
        setTickets(item.data);
    }
    const editTicket = async (id : string)=> {
        navigate(`/tickets/edit/${id}`);
    }
    React.useEffect(() => {
        gettickets();
    }, []);

    return (
        <>
            <section>
                <div className="container">
                    <div className="w-full">
                        <table className="w-full">
                            <thead>
                                <tr className='*:text-start  *:bg-primary *:text-white *:border *:border-blue-gray-300 *:p-2'>
                                    <th>Sr No</th>
                                    <th>Category</th>
                                    <th>Title</th>
                                    <th>Destionation</th>
                                    <th>Location</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tickets.map((ticket, index) => (
                                        <>
                                            <tr className='*:text-sm *:border *:border-blue-gray-300 *:p-2'>
                                                <td>
                                                    {index + 1}
                                                </td>
                                                <td>
                                                    <p className="text-xs  text-wrap inline ">
                                                        {ticket.category?.title}
                                                    </p>
                                                </td>
                                                <td>
                                                    <p className="text-xs  text-wrap inline w-[200px]" >
                                                        {ticket?.title}
                                                    </p>
                                                </td>
                                                <td>
                                                    {ticket?.destination?.title}
                                                </td>
                                                <td>
                                                    {ticket.location}
                                                </td>
                                                <td>
                                                    <button onClick={()=> editTicket(ticket._id)} className='bg-secondary text-xs text-white rounded p-2'>
                                                    
                                                        Edit</button>
                                                    <button className='bg-primary rounded p-2 text-white ms-3 text-xs'>Delete</button>
                                                </td>
                                            </tr>
                                        </>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ViewTickets