
import { fade, makeStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors';

const Styling = () => {
  const useStyles = makeStyles((theme) => ({

    gridList: {
    width: 815,
    height: 500,
    transform: 'translateZ(0)',
     border: '1px solid',
    borderRadius: "20px"
    },
    titleBar1: {
      background:
        'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, ' +
        'rgba(0,0,0,0.2) 30%, rgba(0,0,0,0) 100%)',

    },
    titleBar2: {
      background:
        'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, ' +
        'rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 100%)',

    },
    iconPrice: {
      color: "white",
      marginRight: "10px",
      marginBottom: "15px",
      fontSize: "30px",
      fontFamily: "Droid Sans"
    },
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1
    },
    authForm: {
      '& > *': {
        margin: theme.spacing(2),
        width: '25ch',
        background: 'linear-gradient(45deg, #686868 50%, #81d4d4 90%)',
        boxShadow: '0 3px 5px 2px rgba(180, 180, 180, .3)',
      }
    },
    authBox: {
      '& > *': {
        margin: theme.spacing(1),
        width: '13ch',
        background: 'linear-gradient(45deg, #686868 50%, #81d4d4 90%)',
        boxShadow: '0 2px 5px 2px rgba(180, 180, 180, .3)',
      }
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    search: {
      position: 'absolute',
      top: 30,
      display: 'flex',
      borderRadius: "100px",
      backgroundColor: fade(theme.palette.common.white, 0.99),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.85),
      },
      width: '90%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: '400px',
      },
    },
    inputSearch: {
      height: '100%',
      width: '90%'
      // position: 'absolute',
    },
    searchIcon: {
      padding: theme.spacing(0, 1),
      height: '100%',
      backgroundColor: "pink",
      // width: '10%',
      right: 0,
      position: 'absolute',
      // cursor: 'pointer',
      // pointerEvents: 'cursor',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: "50px",
    },
      subRoot: {
        maxWidth: 345,
      },
      media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
      avatar: {
        backgroundColor: red[500],
      },
})); 
  return useStyles();
}

export default Styling;