import Router from 'next/router';
import useRequest from '../../hooks/use-request';


const TicketShow = ({ticket}) => {
    const {doRequest, errors} = useRequest({
        url: '/api/orders',
        method: 'post',
        body: {
            ticketId: ticket.id
        },
        onSuccess: (order) => Router.push('/orders/[orderId]', `/orders/${order.id}`)
    })
    

    return (
        <div>
            <h1>{ticket.title}</h1>
            <h4> Price: {ticket.price}</h4>
            {errors}
            <button onClick={() => doRequest()} className="btn btn-primay">
                Purchase
            </button>
        </div>
    )
}


TicketShow.getInitialProps = async (context, client) => {
    // console.log("Full context:", context); // Debugging line
    const {ticketId} = context.query;
    // console.log("Extracted ticketId:", ticketId); // Debugging line

    if (!ticketId) {
        console.error("ticketId is missing!");
        return { ticket: {} };
    }

    try {
        const {data} = await client.get(`/api/tickets/${ticketId}`);
        // console.log("Fetched ticket data:", data);
        return { ticket: data };
    } catch (error) {
        console.error("Error fetching ticket data:", error);
        return { ticket: {} };
    }
}


export default TicketShow;