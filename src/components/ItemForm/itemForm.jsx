import { useState } from 'react';
import { newItem } from '../../ItemAPI/item.api';
import './itemForm.css';
import { ResetList } from '../../ItemAPI/item.api';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
    <form className="spacing" onSubmit={handleSubmitItem}>
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
      <span className="buttons">
        <Button variant="contained" size="medium" type="submit">
          Save
        </Button>
        <Button
          variant="contained"
          size="medium"
          type="button"
          onClick={DeleteAll}
        >
          Reset
        </Button>
      </span>
    </form>
  );
}

export default AddItemForm;
