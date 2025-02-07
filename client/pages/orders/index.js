const OrderIndex = ({orders}) => {
    return (
        <ul>
            {
                orders.map((order) => {
                    return (
                        <li key={order.id}>
                            {order.ticket.title} - {order.status}
                        </li>
                    )
                })
            }
        </ul>
    )
}


OrderIndex.getInitialProps = async (context, client) => {
    try {
        const {data} = await client.get('/api/orders');
        // console.log("Fetched ticket data:", data);
        return { orders: data };
    } catch (error) {
        console.error("Error fetching ticket data:", error);
        return { orders: {} };
    }
}