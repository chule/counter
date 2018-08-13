import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: { main: '#ffffff' }, // Purple and green play nicely together.
        secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
    },

});


export const bigButton = {
    background: 'white',
    // borderRadius: 3,
    // border: 0,
    // color: 'grey',
    height: 84,
    width: 250,
    // padding: '0 30px',
    // boxShadow: 'grey',
    margin: 5
  };

  export const smallButton = {
    background: 'white',
    // borderRadius: 3,
    // border: 0,
    // color: 'grey',
    height: 20,
    // padding: '0 30px',
    // boxShadow: 'grey',
    margin: 5,
    fontSize: 11
  };



export default theme