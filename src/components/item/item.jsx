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

function RefreshItem({ itemList, itemRefreshCallback }) {
  return (
    <div className={'groceryItems'}>
      <Grid container spacing={2}
            fontFamily={['Franklin Gothic Medium', 'Arial Narrow', 'Arial', 'sans-serif']}>
        {itemList.map((item) => (
          <Grid item xs={6} md={4} lg={4} key={item.ID} >
            <Box
              borderRadius={5}
              border={item.is_purchased ? '3px solid #5D8' :'3px solid #3CF'}
              sx={{
                margin: '10px',
                padding: '10px',
                textAlign: "center",
                boxShadow: 3,
                bgcolor: "#DDEEFF"
              }}
            >
              {item.is_purchased === false ? (
                <div>
                  <h3>{item.name}</h3>
                  <div>Quantity: {item.quantity} {item.unit}</div><br />
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{
                        padding: "5px",
                        margin: "5px",
                        width: "90px"
                      }}
                      onClick={() => handleMarkAsPurchased(item.id, itemRefreshCallback)}
                    >
                      Purchase
                    </Button><br />
                    
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{
                        padding: "5px",
                        margin: "5px",
                        width: "90px"
                      }}
                      onClick={() => handleClickDelete(item.id, itemRefreshCallback)}
                    >
                      Delete
                    </Button>
                </div>
              ) : (
                <div>
                  <h3>{item.name}</h3>
                  <div>Quantity: {item.quantity} {item.unit}</div><br />
                  <Button id={item.ID} 
                    variant='outlined'
                    size='small'
                    disabled
                    sx={{
                      padding: "5px",
                      margin: "5px",
                      width: "90px"
                    }}>  
                    Purchased
                  </Button><br />

                  <Button
                    variant="outlined"
                    color="info"
                    size="small"
                    sx={{
                      padding: "5px",
                      margin: "5px",
                      width: "90px",
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