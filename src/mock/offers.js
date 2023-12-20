export const offers = [
  {
    type: 'taxi', // Allowed: taxi┃bus┃train┃ship┃drive┃flight┃check-in┃sightseeing┃restaurant
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa31',
        title: 'Upgrade to a business class',
        price: 120
      }
    ]
  },
  {
    type: 'flight', // Allowed: taxi┃bus┃train┃ship┃drive┃flight┃check-in┃sightseeing┃restaurant
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa32',
        title: 'Add luggage',
        price: 50
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa33',
        title: 'Switch to comfort',
        price: 80
      }
    ]
  }
];
