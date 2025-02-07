import { useEffect, useState } from "react";
import StripeCheckout from 'react-stripe-checkout'
import useRequest from '../../hooks/use-request';
import Router from "next/router";


const OrderShow = ({order, currentUser}) => {
    const [timeLeft, setTimeLeft] = useState(0);
    const {doRequest, errors} = useRequest({
        url: '/api/payments',
        method: 'post',
        body: {
            orderId: order.id
        },
        onSuccess: () => Router.push('/orders')
    });


    useEffect(() => {
        const findTimeLeft = () => {
            const msLeft = new Date(order.expiresAt) - new Date();
            setTimeLeft(Math.round(msLeft / 1000));
        };

        findTimeLeft();
        const timerId = setInterval(findTimeLeft, 1000);

        return () => {
            clearInterval(timerId)
        };
    }, [order]);

    if(timeLeft <= 0){
        return <div>Order Expired</div>
    }


    return <div> 
        Time left to pay: {timeLeft} seconds
        <StripeCheckout
            token={(token) => doRequest({token: id})}
            stripeKey="pk_test_51QaBfSKXg0rzWZyfLIQyE6M56oQ6I767ipz2r9Jgztolqt2D1iWIsv9qJyPsa2EGsnORYwsKtWXDdpCTJcmaiyqG00v275YD8m"
            amount={order.ticket.price * 100}
            email={currentUser.email}
        />
        {errors}
    </div>
}


OrderShow.getInitialProps = async (context, client) => {
    const {orderId} = context.query;


    if (!orderId) {
        console.error("orderId is missing!");
        return { ticket: {} };
    }


    try {
        const {data} = await client.get(`/api/orders/${orderId}`);
        console.log("Fetched order data:", data);
        return { order: data };
    } catch (error) {
        console.error("Error fetching ticket data:", error);
        return { order: null };
    }
}


export default OrderShow;