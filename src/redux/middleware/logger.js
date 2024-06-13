export const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log('type: ', action.type);
  console.log('payload: ', action.payload);
  console.log(
    '%c currentState: ',
    'background: #222; color: #ff0d0d',
    store.getState()
  );

  next(action);

  console.log(
    '%c next state: ',
    'background: #222; color: #bada55',
    store.getState()
  );
};
