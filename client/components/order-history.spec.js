/* global describe beforeEach it */
import { expect } from 'chai'
import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { OrderHistory } from './order-history'
import { fetchOrder } from '../store'

const adapter = new Adapter()
Enzyme.configure({ adapter })


describe('OrderHistory', () => {
  let orderHistory

  beforeEach(() => {
    const orderInfo = [{
      id: '1',
      updatedAt: '3/6/18',
      status: 'cart'
    }]
    orderHistory = shallow(<OrderHistory ordersOnProps={orderInfo} fetchOrder={fetchOrder} />)
  })

  it('renders the order information', () => {
    expect(orderHistory.find('h5').text()).to.be.equal('Date Ordered: 3/6/18')
    expect(orderHistory.find('h6').text()).to.be.equal('Status: cart')
  })
})
