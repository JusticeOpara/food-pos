const notifications=[
  {
    id: 1,
    orderNumber: '5490023',
    status: 'success',
    message: 'has been paid successfully',
    time: '10m ago',
    total: 40.49,
    paymentMethod: 'Debit Card',
    showDetails: false,
    items: [
      {
        id: 1,
        name: 'Orange Juice',
        emoji: '🍊',
        note: 'Less Ice',
        price: 2.87,
        quantity: 4
      },
      {
        id: 2,
        name: 'American Favorite',
        emoji: '🍕',
        crust: 'Stuffed Crust Sosis',
        extras: 'Extra Mozarela',
        price: 4.87,
        quantity: 1
      },
      {
        id: 3,
        name: 'Super Supreme',
        emoji: '🍕',
        crust: 'Stuffed Crust Cheesee',
        price: 5.75,
        quantity: 1
      },
      {
        id: 4,
        name: 'Favorite Cheese',
        emoji: '🍕',
        crust: 'Stuffed Crust Sosis',
        price: 6.57,
        quantity: 1
      }
    ]
  },
  {
    id: 2,
    orderNumber: '980766',
    status: 'cancelled',
    message: 'had 2 items canceled',
    time: '15m ago',
    total: 0,
    paymentMethod: null,
    showDetails: false,
    items: null
  },
  {
    id: 3,
    orderNumber: '980766',
    status: 'success',
    message: 'has been paid successfully',
    time: '20m ago',
    total: 40.49,
    paymentMethod: 'Cash',
    showDetails: false,
   items: [
      {
        id: 1,
        name: 'Orange Juice',
        emoji: '🍊',
        note: 'Less Ice',
        price: 2.87,
        quantity: 4
      },
      {
        id: 2,
        name: 'American Favorite',
        emoji: '🍕',
        crust: 'Stuffed Crust Sosis',
        extras: 'Extra Mozarela',
        price: 4.87,
        quantity: 1
      },
      {
        id: 3,
        name: 'Super Supreme',
        emoji: '🍕',
        crust: 'Stuffed Crust Cheesee',
        price: 5.75,
        quantity: 1
      },
      {
        id: 4,
        name: 'Favorite Cheese',
        emoji: '🍕',
        crust: 'Stuffed Crust Sosis',
        price: 6.57,
        quantity: 1
      }
    ]
  },
  {
    id: 4,
    orderNumber: '980766',
    status: 'pending',
    message: 'is waiting for confirmation',
    time: '25m ago',
    total: 28.99,
    paymentMethod: 'Credit Card',
    showDetails: false,
    items: null
  }
]
export default notifications