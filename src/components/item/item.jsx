import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { UpdateItem } from '../../ItemAPI/item.api';
import {deleteItem} from '../../ItemAPI/item.api';
function handleMarkAsPurchased(id,itemRefreshCallback) {
  UpdateItem(id)
    .then(() => {
      itemRefreshCallback ()
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
}


function handleClickDelete(id,itemRefreshCallback) {
  // Implement the logic for deleting an item
  console.log(`Deleting item with ID: ${id}`);

  deleteItem(id)
  .then(() => {
    itemRefreshCallback ()
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });
}

function RefreshItem({ itemList,itemRefreshCallback }) {
  return (
    <div className="App">
      <Grid container spacing={2}>
        {itemList.map((item) => (
          <Grid item xs={8} md={6} lg={3} key={item.ID}>
            <Box
              borderRadius={5}
              border={'3px solid rgb(113, 132, 48)'}
              sx={{
                margin: '10px',
                padding: '10px',
              }}
            >
              {item.is_purchased === false ? (
                <div>
                  <span>{item.name}</span>
                  <span> {item.quantity}</span>
                  <span>{item.unit} </span>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => handleMarkAsPurchased(item.id, itemRefreshCallback)}
                  >
                     Purchased
                  </Button>
                  
                  <Button padding="100px"
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => handleClickDelete(item.id,itemRefreshCallback)}
                  >
                    Delete
                  </Button>
                </div>
              ) : (
                <div>
                  {item.name}
                  <span>  {item.quantity}</span>
                  <span>{item.unit}</span>
                  <button id={item.ID} disabled>Purchased</button>
                </div>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default RefreshItem;