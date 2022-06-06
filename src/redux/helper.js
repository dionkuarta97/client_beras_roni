export const defaultInitState = { loading: true, error: null, data: null };

export const defaultDoneState = (data) => ({
  loading: false,
  error: null,
  data: data,
});

export const defaultFailedState = (message) => ({
  loading: false,
  error: message,
  data: null,
});
