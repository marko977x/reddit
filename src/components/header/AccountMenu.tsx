import React, { Component } from 'react';
import { MenuList, MenuItem, Paper, Popper } from '@material-ui/core';

class AccountMenu extends Component {
  render() {
    return (
      <div>
        <Popper open={true}>
          <MenuList>
            <MenuItem>Remove Account</MenuItem>
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Popper>
      </div>
    );
  }
}

export default AccountMenu;