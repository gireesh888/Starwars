import React, { useEffect, useState, useCallback } from 'react'
import {useNavigate, useLocation} from "react-router-dom"
import Person3RoundedIcon from '@mui/icons-material/Person3Rounded';
import { Button, Grid,TextField, Typography ,Link,Skeleton,Box,Card } from '@mui/material';
import { makeStyles } from '@mui/styles'
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MovieIcon from '@mui/icons-material/Movie';
import Navbar from '../components/Navbar';


const useStyles = makeStyles((theme) => ({
  root:{
    flexDirection:"column",
    justifyContent:"flex-start",
    padding:"20px"
  },
  titleCard:{
    height:"200px",
    width:"150px",
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#FFF",
    borderRadius:"6px !important"
  },
  profileTitle:{
    fontSize: "40px !important",
    fontWeight:"bold !important"
  },
  detail:{
    fontSize: "20px !important",
    fontWeight:"400 !important",
    fontStyle: "italic",
    color:"#E74C3C"
  },
  subHeading:{
    padding:"20px",
    color:"#E74C3C",
    fontFamily:"Montserrat !important",
    textTransform:"uppercase",
    fontWeight:"semi-bold",
    fontStyle:"italic",
    textDecoration:"underline",
  
  },
  heading:{
    // padding:"25px",
    color:"#000",
    fontFamily:"Montserrat !important",
    textTransform:"uppercase",
    fontWeight:"bold !important",
  },
  subheadingContainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    padding:"20px"
  },
  charactersContainer:{
    padding:"20px",
    display:"flex",
    flexDirection:"row",
    justifyContent:"flex-start",
  },
  value:{
    color:"#FFF",
    fontFamily:"Montserrat !important",
    textTransform:"capitalize",
    fontSize:"12px !important",
    padding:"15px",
  },
  buttonContainer:{
    height:"25%",
    justifyContent:"space-between",
    alignItems:"center"
  },
  head:{
    height:"70%",
    flexDirection:"column !important",
    justifyContent:"flex-start"
  },
  
  button:{
    color:"#E74C3C !important ",
  },
  seeMore:{
    color:"#FFF !important ",
    fontFamily:"Montserrat !important",
    textTransform:"capitalize",
    textDecoration:"underline",
    fontSize:"14px !important",
    cursor:"pointer"
  },
  card:{
    backgroundColor:"#000",
    borderRadius:"8px",
    height:"200px",
    width:"150px !important",
    padding:"10px",
    margin:"20px",
    flexDirection:"column !important",
    justifyContent:"flex-start"
  },
  title:{
    color:"#FFF",
    fontFamily:"Montserrat !important",
    textTransform:"uppercase",
    fontSize:"12px !important"
  },
  releaseDate:{
    color:"#E74C3C",
    fontFamily:"Montserrat !important",
    textTransform:"capitalize",
  },
  detailsContainer:{
    flexDirection:"column !important",
    justifyContent:"flex-start"
  },
  key:{
    color:"#FFF",
    fontFamily:"Montserrat !important",
    textTransform:"capitalize",
    // padding:"10px",
    textDecoration:"underline"
  },
  value:{
    color:"#FFF",
    fontFamily:"Montserrat !important",
    textTransform:"capitalize",
    padding:"15px",
  },
  keyValueContainer:{
    flexDirection:"row",
    alignItems:"center"
  },
  headContainer:{
    alignItems:"center"
  },
  DescContainer:{
    width:"100vw",
    flexDirection:"column !important",
    alignItems:"flex-start"
  }
  }))
export default function StarshipDetails() {
  const [loading, setLoading] = useState(true)
  const[showMore, setShowMore] = useState(false)
  const[films, setFilms] = useState([])
  const loadingStateData = [1,2,3,4,5,6,7]
  const [showSeemore,setShowSeemore] = useState(false)

  const navigate = useNavigate();
  const location = useLocation();
  const starShip = location.state
  const classes = useStyles()
  useEffect(()=>{
    getAllFilms()
  },[])

  async function getAllFilms(){
    console.log("starShip", starShip)
    starShip.films.map((c)=>{
      getFilmns(c)
    })  
  }


  async function getFilmns(url){
    setFilms([])
    await fetch(url)
          .then(response => response.json())
          .then(res => {
            console.log("films respnse", res)
            setFilms((prevState) => [...prevState , res])
            setLoading(false)
          })
          .catch((error) => console.log(error));
  }

  const openFilms = useCallback((id) => () => {
    console.log("starShip", id)
    navigate('/details',{state: id})
  },
  [],
)


useEffect(()=>{
  if(films.length > 6){
    setShowSeemore(true)
  }
},[films])
  return (
    <div>
      <Navbar/>
      <Grid className={classes.root}>
        <Grid className={classes.headContainer} container>
          <Grid item xs={2}>
            <Card className={classes.titleCard} container>
              <RocketLaunchRoundedIcon sx={{height: "100%", width: "100%", color:"#7E7A7A"}}/>
            </Card>
          </Grid>
          <Grid item xs={10} className={classes.detailsContainer} container>
            <Typography variant="h4" className={classes.heading}>{starShip.name}</Typography>
            <Typography variant="body" className={classes.detail}>{starShip.model}</Typography>
            <Grid className={classes.keyValueContainer} container>
              <Typography variant="body" className={classes.key}>Manufacturer  :-</Typography>
              <Typography variant="body" className={classes.value}>{starShip.manufacturer}</Typography>
            </Grid>
            <Grid className={classes.keyValueContainer} container>
              <Typography variant="body" className={classes.key}>Max Speed  :-</Typography>
              <Typography variant="body" className={classes.value}>{starShip.max_atmosphering_speed}</Typography>
            </Grid>
            {/* <Typography variant="body" className={classes.detail}>{character.birth_year}</Typography> */}
          </Grid>
        </Grid>
        <Grid className={classes.subheadingContainer} container>
        <Typography variant="h5" className={classes.subHeading}>Films</Typography>
        {showSeemore &&
        <Link variant="h5" className={classes.seeMore} onClick={()=>setShowMore(!showMore)}>{!showMore ? "see more" : "see less" }</Link>
        }  
        </Grid>
      
      <Grid className={classes.charactersContainer} container>
      {loading ?
        <>
        {loadingStateData.map((d, index)=>(
            <Skeleton
              key = {index}
              sx={{ bgcolor: 'grey.900',margin:"20px", borderRadius:"8px",}}
              variant="rectangular"
              width={150}
              height={200}
            />
          ))}
          </>
          :
          <>
        {!showMore ?
        <> 
        {films.slice(0,7).map((item, index)=>(
          <Grid className={classes.card} container>
            <Grid className={classes.head} container>
              <MovieIcon sx={{height: 100, width: 140, color:"#7E7A7A"}}/>
            </Grid>
            <Grid className={classes.buttonContainer} container>
              <Grid item xs={8}>
                <Typography variant="h4" className={classes.title}>{item.title}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Button onClick={openFilms(item)} variant="text" className={classes.button} > <ChevronRightIcon/> </Button>
              </Grid>
            </Grid>
          </Grid>
          // <button onClick={openCharacter(item)} key={index}>{item.name}</button >
        ))}
        </>
        :
        <>
          {films.map((item, index)=>(
            <Grid className={classes.card} container>
              <Grid className={classes.head} container>
                <MovieIcon sx={{height: 100, width: 140, color:"#7E7A7A"}}/>
              </Grid>
              <Grid className={classes.buttonContainer} container>
                <Grid item xs={8}>
                  <Typography variant="h4" className={classes.title}>{item.title}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Button onClick={openFilms(item)} variant="text" className={classes.button} > <ChevronRightIcon/> </Button>
                </Grid>
              </Grid>
            </Grid>
            // <button onClick={openCharacter(item)} key={index}>{item.name}</button >
          ))}
          </>
        }
        </>
      }
      </Grid>
    </Grid>
    </div>
  )
}
