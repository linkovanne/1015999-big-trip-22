function isDisabledControl(event) {
  return event.target?.disabled;
}

function isControlType(event, type) {
  return event.target?.tagName !== type;
}

function isKeyType(event, key) {
  return event.key === key;
}

function getNumberWithSpaces(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

/**
 * @method
 * @param {Array<EventObjectData>} events
 * @param {Array<OfferObjectData>} offers
 */
function getTripCost(events, offers) {
  const initialCost = 0;
  const totalCost = events.reduce(
    (eventAccumulator, event) => {
      const initialOffersPrice = 0;
      const offersCost = offers
        .find((offer) => offer.type === event.type).offers
        .filter((offerItem) => event.offers.includes(offerItem?.id))
        .reduce(
          (offerAccumulator, offer) => offerAccumulator + offer.price,
          initialOffersPrice
        );

      return eventAccumulator + event.basePrice + offersCost;
    },
    initialCost,
  );

  return getNumberWithSpaces(totalCost);
}

export {isDisabledControl, isControlType, isKeyType, getTripCost};
