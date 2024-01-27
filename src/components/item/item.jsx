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
          <Grid item xs={12} md={6} lg={6} key={item.ID} >
            <Box
              borderRadius={5}
              border={'3px solid rgb(113, 132, 48)'}
              alignContent={'center'}
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
                    color="primary"
                    size="small"
                    onClick={() => handleMarkAsPurchased(item.id, itemRefreshCallback)}
                  >
                     Purchase
                  </Button>
                  
                  <Button padding="100px"
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleClickDelete(item.id, itemRefreshCallback)}
                  >
                    Delete
                  </Button>
                </div>
              ) : (
                <div>
                  {item.name}
                  <span>  {item.quantity}</span>
                  <span>{item.unit}</span>
                  <Button id={item.ID} 
                    variant='outlined'
                    size='small'
                    disabled>  
                    Purchased
                  </Button>

                  <Button padding="100px"
                    variant="outlined"
                    color="info"
                    size="small"
                    sx={{
                      ":hover": {
                        bgcolor: "#3AF",
                        color: "white"
                      }
                    }}
                    onClick={() => handleClickDelete(item.id, itemRefreshCallback)}
                  >
                    Delete
                  </Button>
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