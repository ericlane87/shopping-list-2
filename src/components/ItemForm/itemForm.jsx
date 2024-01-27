import { useState } from 'react';
import { newItem } from '../../ItemAPI/item.api';
import './itemForm.css'
import {ResetList} from '../../ItemAPI/item.api'




function AddItemForm(props) {
    const [nameValue, setNameValue] = useState('');
    const [quantityValue, setQuantityValue] = useState('');
    const [UnitValue, setUnitValue] = useState('');
    
    const handleChangeOfQuantity = (event) => {
      setQuantityValue(event.target.value);
    };
 
const DeleteAll = (event)=>{
  ResetList()
  .then(() => {
     props.itemRefreshCallback()
   })
   .catch((err) => {
     console.error('ERROR:from here', err);
   });
}
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
          setUnitValue('') ; 
        })
        .catch((err) => {
          console.error('ERROR Failed at:', err);
        });
    };


    
  
    return (
      <form onSubmit={handleSubmitItem} className='spacing'>
        <label>
          <span>Name:</span>
          <input
            id="name"
            onChange={(event) => setNameValue(event.target.value)}
            value={nameValue}
          />
        </label>
        {/* <p>{nameValue}</p> */}
        <label>
          <span>Quantity:</span>
          <input
            id="quantity"
            onChange={handleChangeOfQuantity}
            value={quantityValue}
          />
        </label>

        <label>
          <span>Unit:</span>
          <input
            id="unit"
            onChange={(event) => setUnitValue(event.target.value)}
            value={UnitValue}
          />
        </label>
        <button type="submit">Save</button>
        <button type="button" onClick={DeleteAll}>Reset</button>

      </form>


    );
  }

  export default AddItemForm 