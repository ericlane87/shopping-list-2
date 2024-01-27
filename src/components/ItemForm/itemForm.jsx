import { useState } from 'react';
import { newItem } from '../../ItemAPI/item.api';
import './itemForm.css';
import { ResetList } from '../../ItemAPI/item.api';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function AddItemForm(props) {
  const [nameValue, setNameValue] = useState('');
  const [quantityValue, setQuantityValue] = useState('');
  const [UnitValue, setUnitValue] = useState('');

  const handleChangeOfQuantity = (event) => {
    setQuantityValue(event.target.value);
  };

  const DeleteAll = (event) => {
    ResetList()
      .then(() => {
        props.itemRefreshCallback();
      })
      .catch((err) => {
        console.error('ERROR:from here', err);
      });
  };
  const handleSubmitItem = (event) => {
    event.preventDefault();

    console.log('Values for SUBMIT:', {
      name: nameValue,
      quantity: quantityValue,
      unit: UnitValue,
    });

    // post data
    newItem({
      name: nameValue,
      quantity: quantityValue,
      unit: UnitValue,
    })
      .then((response) => {
        // on success fetchData
        props.itemRefreshCallback();

        setNameValue('');
        setQuantityValue('');
        setUnitValue('');
      })
      .catch((err) => {
        console.error('ERROR Failed at:', err);
      });
  };

  return (
    <Box component="form" onSubmit={handleSubmitItem} className="spacing">
      <TextField
        className="input-fields"
        label="Name:"
        id="name"
        onChange={(event) => setNameValue(event.target.value)}
        value={nameValue}
      />

      {/* <p>{nameValue}</p> */}

      <TextField
        className="input-fields"
        label="Quantity:"
        id="quantity"
        margin="5px"
        onChange={handleChangeOfQuantity}
        value={quantityValue}
      />

      <TextField
        className="input-fields"
        label="Unit:"
        id="unit"
        onChange={(event) => setUnitValue(event.target.value)}
        value={UnitValue}
      />

      <button type="submit">Save</button>
      <button type="button" onClick={DeleteAll}>
        Reset
      </button>
    </Box>
  );
}

export default AddItemForm;
