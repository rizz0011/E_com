import React, { useState } from 'react';
import { Popover, TextField, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      setAnchorEl(e.currentTarget);
      const res = await fetch(`http://localhost:8000/v1/product/searchFilter?search=${value}`);
      const searchData = await res.json();
      setFilteredData(searchData?.data || []);
    } else {
      setFilteredData([]);
      setAnchorEl(null);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  const open = Boolean(anchorEl);
  const id = open ? 'search-popover' : undefined;

  return (
    <div>
      <TextField
        sx={{ width: '400px' }}
        id="search-bar"
        placeholder="Search"
        size="small"
        variant="outlined"
        value={query}
        onChange={handleSearch}
        fullWidth
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          style: { width: anchorEl ? anchorEl.clientWidth : undefined },
        }}
      >
        <List style={{ maxHeight: '200px', overflowY: 'auto', width: '400px' }}>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => {
                  setQuery(item.title);
                  handleClose();
                }}
              >
                <ListItemAvatar>
                    <img src={item.ImgUrls[0]} style={{width:'30px',}}/>
                </ListItemAvatar>
                <ListItemText
                  primary={truncateText(item?.title, 40)}
                  secondary={truncateText(item?.description, 40)}
                />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No results found" />
            </ListItem>
          )}
        </List>
      </Popover>
    </div>
  );
}

export default SearchBar;
