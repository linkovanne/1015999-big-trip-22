/**
 * @method
 * @param {(Array<EventObjectData>)} events
 * @param {(EventObjectData)} updatedEvent
 * @return {(Array<EventObjectData>)} events
 */
function updateEvent(events, updatedEvent) {
  return events.map((event) => event.id === updatedEvent.id ? updatedEvent : event);
}

export {updateEvent};
