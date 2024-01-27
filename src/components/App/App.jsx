import AddItemForm from '../ItemForm/itemForm.jsx';
import Header from '../Header/Header.jsx'
import './App.css';
import React, {useEffect, useState}from 'react';
import { fetchItem} from '../../ItemAPI/item.api.js';
import RefreshItem from '../item/item.jsx';






function App() {

    
      const [itemList, setItemList] = useState([]);
    
      const refreshItem = () => {
        const itemPromise = fetchItem();
        itemPromise
          .then((response) => {
            console.log('SERVER DATA:', response);
            setItemList(response.data);
          })
          .catch((err) => {
            console.error('ERROR:', err);
          });
      };
    
      useEffect(() => {
        refreshItem();
      }, []); // 
    
 



    return (
        <div className="App">
            <Header />

            <main>

                <AddItemForm itemRefreshCallback={refreshItem}></AddItemForm>

                <RefreshItem itemList ={itemList} itemRefreshCallback={refreshItem} />
            </main>


        </div>
    );
}

export default App;