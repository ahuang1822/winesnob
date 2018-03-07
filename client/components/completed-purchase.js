import React from 'react'
import { Link } from 'react-router-dom'

export const CompletedPurchase = (props) => {
    return (
        <div>
            <h5>Your order has been completed. Thank you for shopping with us!</h5>
            <h6>View your <Link to="/order-history">order history</Link> and leave a review on the wine you ordered.</h6>
        </div>
    )
}


export default CompletedPurchase
