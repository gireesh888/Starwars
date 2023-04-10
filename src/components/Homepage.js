import React,{useState, useEffect,useCallback} from 'react'
import {useNavigate} from "react-router-dom"
import { makeStyles } from '@mui/styles'
import { Button, Grid, Typography ,Skeleton } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Navbar from '../components/Navbar';

const useStyles = makeStyles(() => ({
  heading:{
    padding:"20px",
    color:"#E74C3C",
    fontFamily:"Montserrat !important",
    textTransform:"uppercase",
  },
  root:{
    // padding:"20px",
    display:"flex",
    flexDirection:"row",
    justifyContent:"flex-start",
    height:"100vh"
  },
  card:{
    backgroundColor:"#000",
    borderRadius:"8px",
    height:"400px",
    width:"300px !important",
    padding:"10px",
    margin:"20px",
    flexDirection:"column !important",
    justifyContent:"flex-start"
  },
  title:{
    color:"#FFF",
    fontFamily:"Montserrat !important",
    textTransform:"uppercase",
  },
  key:{
    color:"#FFF",
    fontFamily:"Montserrat !important",
    textTransform:"capitalize",
    padding:"10px",
    textDecoration:"underline"
  },
  value:{
    color:"#FFF",
    fontFamily:"Montserrat !important",
    textTransform:"capitalize",
    padding:"15px",
  },
  releaseDate:{
    color:"#E74C3C",
    fontFamily:"Montserrat !important",
    textTransform:"capitalize",
  },
  buttonContainer:{
    height:"5%",
    flexDirection:'row',
    justifyContent:"flex-end",
    alignItems:"center"
  },
  head:{
    height:"23%",
    flexDirection:"column !important",
    justifyContent:"flex-start"
  },
  body:{
    height:"66%",
    flexDirection:"column !important",
    justifyContent:"flex-start",
    marginTop:"10px"
  },
  button:{
    color:"#E74C3C !important ",
  }
}))
export default function Homepage({navigation}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();
  const classes = useStyles()

  const loadingStateData = [1,2,3,4,5,6,7,8,9,10]
  useEffect(()=>{
    getData()
  },[])

  async function getData(){
    await fetch(`https://swapi.dev/api/films`)
          .then(response => response.json())
          .then(res => {
            console.log("respnse", res)
            setData(res)
            setLoading(false)
          })
          .catch((error) => console.log(error));
  }

  const handleClick = useCallback((movie) => () => {
      console.log("movie", movie)
      navigate(`/movie/${movie.episode_id}`,{state: movie})
    },
    [],
  )

  return (
    <div>
      <Navbar/>
      <Typography variant="h4" className={classes.heading}>List of Movies</Typography>
      <Grid className={classes.root} container>
      {loading ?
          <>
          {loadingStateData.map((d, index)=>(
            <Skeleton
              key = {index}
              sx={{ bgcolor: 'grey.900',margin:"20px", borderRadius:"8px",}}
              variant="rectangular"
              width={300}
              height={400}
            />
          ))}
            
          </>
          :
          <>
          {data != null && data.results.map((item,index)=>(
          <Grid className={classes.card} container>
            <Grid className={classes.head} container>
              <Typography variant="h4" className={classes.title}>{item.title}</Typography>
            </Grid>
            <Grid className={classes.body} container>
              <Typography variant="body" className={classes.releaseDate}>( {item.release_date.slice(0,4)} )</Typography>

              <Typography variant="body" className={classes.key}>Director  :-</Typography>
              <Typography variant="body" className={classes.value}>{item.director}</Typography>
              <Typography variant="body" className={classes.key}>Producers  :-</Typography>
              <Typography variant="body" className={classes.value}>{item.producer}</Typography>
            </Grid>
            <Grid className={classes.buttonContainer}>
              <Button onClick={handleClick(item)} variant="text" className={classes.button} > View Details  <ChevronRightIcon/> </Button>
            </Grid>
          </Grid>
    
        ))}
        </>
        }
      </Grid>
    </div>
  )
}
