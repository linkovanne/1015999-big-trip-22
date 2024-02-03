function isDisabledControl(event) {
  return event.target?.disabled;
}

function isControlType(event, type) {
  return event.target?.tagName !== type;
}

function isKeyType(event, key) {
  return event.key === key;
}

export {isDisabledControl, isControlType, isKeyType};
