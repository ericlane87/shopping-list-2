import axios from 'axios';

export const UpdateItem = (itemID) => {
  return axios.put(`/api/items/${itemID}`);
};
export const fetchItem = () => {
  // axios GET call
  return axios.get('/api/items');
};
export const newItem = (ItemData) => {
return axios.post('/api/items',ItemData);
};

export const ResetList = () => {
  return axios.delete(`/api/items`);
};

export const deleteItem = (itemID) => {
  return axios.delete(`/api/items/${itemID}`);
};


