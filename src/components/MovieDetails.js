import React, { useEffect, useState, useCallback } from 'react'
import {useNavigate, useLocation} from "react-router-dom"
import { Button, Grid, Typography ,Link,Skeleton, Card } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { makeStyles } from '@mui/styles'
import Person3RoundedIcon from '@mui/icons-material/Person3Rounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import MovieIcon from '@mui/icons-material/Movie';
import Navbar from '../components/Navbar';


const useStyles = makeStyles((theme) => ({
  root:{
    flexDirection:"column",
    justifyContent:"flex-start",
    padding:"20px"
  },
  subHeading:{
    padding:"20px",
    color:"#E74C3C",
    fontFamily:"Montserrat !important",
    textTransform:"uppercase",
    fontWeight:"semi-bold",
    fontStyle:"italic",
    textDecoration:"underline",
    fontSize:"20px !important"
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
    display:"flex",
    flexDirection:"row",
    justifyContent:"flex-start",
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

export default function MovieDetails({navigation}) {
  const[characters, setCharacters] = useState([])
  const[starships, setStarships] = useState([])
  const[planets, setPlanets] = useState([])
  const [loading, setLoading] = useState(true)
  const[showMore, setShowMore] = useState(false)
  const [showSeemore,setShowSeemore] = useState(false)

  const navigate = useNavigate();
  const location = useLocation();

  const movie = location.state
  const classes = useStyles()
  const loadingStateData = [1,2,3,4,5,6,7]


  useEffect(()=>{
    console.log("data coming", movie)
    getAllCharacters()
  },[])

  async function getAllCharacters(){
    movie.characters.map((c)=>{
      getCharacters(c)
    })  
    getAllStarships()

  }

  async function getCharacters(url){
    setCharacters([])
    await fetch(url)
          .then(response => response.json())
          .then(res => {
            console.log("character respnse", res)
            setCharacters((prevState) => [...prevState , res])
          })
          .catch((error) => console.log(error));
  }

  async function getAllStarships(){
    movie.starships.map((s)=>{
      getStarships(s)
    })  
    getAllPlanets()

  }

  async function getStarships(url){
    setStarships([])
    await fetch(url)
          .then(response => response.json())
          .then(res => {
            console.log("starships respnse", res)
            setStarships((prevState) => [...prevState , res])
          })
          .catch((error) => console.log(error));
  }

  async function getAllPlanets(){
    movie.planets.map((p)=>{ 
      getPlanets(p)
    })  
  }
  async function getPlanets(url){
    setPlanets([])
    await fetch(url)
          .then(response => response.json())
          .then(res => {
            console.log("planet respnse", res)
            setPlanets((prevState) => [...prevState , res])
            setLoading(false)
          })
          .catch((error) => console.log(error));
  }

  const openCharacter = useCallback((id) => () => {
    console.log("character", id)
    navigate('/actor',{state: id})
  },
  [],
)

  const openStarship = useCallback((id) => () => {
    console.log("starship", id)
    navigate('/starship',{state: id})
  },
  [],
)

  const openPlanet = useCallback((id) => () => {
    console.log("planet", id)
    navigate('/planet',{state: id})
  },
  [],
)

useEffect(()=>{
  if(characters.length > 6){
    setShowSeemore(true)
  }
},[characters])

  return (
    <>
    <Navbar/>
    <div className={classes.root}>
      <Grid className={classes.headContainer} container>
          <Grid item xs={2}>
            <Card className={classes.titleCard} container>
              <MovieIcon sx={{height: "100%", width: "100%", color:"#7E7A7A"}}/>
            </Card>
          </Grid>
          <Grid item xs={10} className={classes.detailsContainer} container>
            <Typography variant="h4" className={classes.heading}>{movie.title}</Typography>
            <Typography variant="body" className={classes.releaseDate}>{movie.release_date.slice(8,10)} - {movie.release_date.slice(5,7)} - {movie.release_date.slice(0,4)} </Typography>
            <Grid className={classes.keyValueContainer} container>
              <Typography variant="body" className={classes.key}>Director  :-</Typography>
              <Typography variant="body" className={classes.value}>{movie.director}</Typography>
            </Grid>
            <Grid className={classes.keyValueContainer} container>
              <Typography variant="body" className={classes.key}>Producers  :-</Typography>
              <Typography variant="body" className={classes.value}>{movie.producer}</Typography>
            </Grid>
            {/* <Typography variant="body" className={classes.detail}>{character.birth_year}</Typography> */}
          </Grid>
      </Grid>
      <Grid container className={classes.DescContainer}>
        <Typography variant="h5" className={classes.subHeading}>Description</Typography>
        <Typography variant="body" className={classes.value}>{movie.opening_crawl}</Typography>
      </Grid>
      <Grid className={classes.subheadingContainer} container>
        <Typography variant="h5" className={classes.subHeading}>Characters</Typography>
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
        {characters.slice(0,7).map((item, index)=>(
          <Grid className={classes.card} container>
            <Grid className={classes.head} container>
              <Person3RoundedIcon sx={{height: 100, width: 140, color:"#7E7A7A"}}/>
            </Grid>
            <Grid className={classes.buttonContainer} container>
              <Grid item xs={8}>
                <Typography variant="h4" className={classes.title}>{item.name}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Button onClick={openCharacter(item)} variant="text" className={classes.button} > <ChevronRightIcon/> </Button>
              </Grid>
            </Grid>
          </Grid>
          // <button onClick={openCharacter(item)} key={index}>{item.name}</button >
        ))}
        </>
        :
        <>
          {characters.map((item, index)=>(
            <Grid className={classes.card} container>
              <Grid className={classes.head} container>
                <Person3RoundedIcon sx={{height: 100, width: 140, color:"#7E7A7A"}}/>
              </Grid>
              <Grid className={classes.buttonContainer} container>
                <Grid item xs={8}>
                  <Typography variant="h4" className={classes.title}>{item.name}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Button onClick={openCharacter(item)} variant="text" className={classes.button} > <ChevronRightIcon/> </Button>
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
      <Grid className={classes.subheadingContainer} container>
        <Typography variant="h5" className={classes.subHeading}>Starships</Typography>
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
              height={250}
            />
          ))}
          </> 
          :
          <>
          {starships.map((item, index)=>(
            <Grid className={classes.card} container>
              <Grid className={classes.head} container>
                <RocketLaunchRoundedIcon sx={{height: 100, width: 140, color:"#7E7A7A"}}/>
              </Grid>
              <Grid className={classes.buttonContainer} container>
                <Grid item xs={8}>
                  <Typography variant="h4" className={classes.title}>{item.name}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Button onClick={openStarship(item)} variant="text" className={classes.button} > <ChevronRightIcon/> </Button>
                </Grid>
              </Grid>
            </Grid>
            // <button onClick={openStarship(item)} key={index}>{item.name}</button >
          ))}
          </>
        }
      </Grid>
      <Grid className={classes.subheadingContainer} container>
        <Typography variant="h5" className={classes.subHeading}>Planets</Typography>
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
              height={250}
            />
          ))}
          </>
          :
          <>
        {planets.map((item, index)=>(
          <Grid className={classes.card} container>
            <Grid className={classes.head} container>
              <PublicRoundedIcon sx={{height: 100, width: 140, color:"#7E7A7A"}}/>
            </Grid>
            <Grid className={classes.buttonContainer} container>
              <Grid item xs={8}>
                <Typography variant="h4" className={classes.title}>{item.name}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Button onClick={openPlanet(item)} variant="text" className={classes.button} > <ChevronRightIcon/> </Button>
              </Grid>
            </Grid>
          </Grid>
          // <button onClick={openPlanet(item)} key={index}>{item.name}</button >
        ))}
        </>
        }
      </Grid>
  
    </div>
    </>
  )
}
