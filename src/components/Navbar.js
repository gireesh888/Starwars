import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { makeStyles } from '@mui/styles'
import Autocomplete from '@mui/material/Autocomplete';
import React,{useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import { Button,TextField,Box } from '@mui/material';
import logo from "../Assets/logo.png"
const useStyles = makeStyles((theme) => ({
  navbar:{
    backgroundColor:"#000",
    alignItems:"center",
    height:"80px",
    justifyContent:"space-between",

  },
  input:{
    backgroundColor:'#FFF',
    width:"200px",
    borderRadius:"10px",

  }
}))



export default function Navbar() {
  const [searchData, setSearchData] = useState([])
  const [movies, setMovies] = useState([])
  const [people, setPeople] = useState([])
  const [starships, setStarships] = useState([])
  const [planets, setPlanets] = useState([])

  const classes = useStyles()
  const navigate = useNavigate();

  useEffect(()=>{
      getMovies()
  },[])

  async function getMovies(){
    setSearchData([])
    await fetch(`https://swapi.dev/api/films`)
          .then(response => response.json())
          .then(res => {
            console.log("movies in navbar", res)
            if(res.results !== undefined){
              res.results.map((movie)=>{
                setSearchData((prevState) =>[...prevState, movie.title])
                setMovies((prevState) =>[...prevState, movie])
              })
            }
          })
          .then(res => getPeople())
          .catch((error) => console.log(error));
  }

  async function getPeople(){
    await fetch(`https://swapi.dev/api/people`)
          .then(response => response.json())
          .then(res => {
            console.log("people in navbar", res)
            if(res.results !== undefined){
              res.results.map((people)=>{
                setSearchData((prevState) =>[...prevState, people.name])  
                setPeople((prevState) =>[...prevState, people])  
              })
            }
          })
          .then(res => getPlanets())
          .catch((error) => console.log(error));
  }


  async function getPlanets(){
    await fetch(`https://swapi.dev/api/planets`)
          .then(response => response.json())
          .then(res => {
            console.log("planets in navbar", res)
            if(res.results !== undefined){
              res.results.map((planet)=>{
                setSearchData((prevState) =>[...prevState, planet.name])  
                setPlanets((prevState) =>[...prevState, planet])  
              })
            }
          })
          .then(res => getStarships())
          .catch((error) => console.log(error));
  }

  async function getStarships(){
    await fetch(`https://swapi.dev/api/starships`)
          .then(response => response.json())
          .then(res => {
            console.log("starships in navbar", res)
            if(res.results !== undefined){
              res.results.map((starship)=>{
                setSearchData((prevState) =>[...prevState, starship.name])  
                setStarships((prevState) =>[...prevState, starship])  
              })
            }
          })
          .catch((error) => console.log(error));
  }

  useEffect(()=>{
    console.log("searchData", searchData)
  },[searchData])

  async function openOption(key){
    console.log("key", key)
    const searchedMovieData = movies.find(x => x.title === key)
    const serchedPlanetData = planets.find(x => x.name === key)
    const serchedPeopleData = people.find(x => x.name === key)
    const serchedStarshipsData = starships.find(x => x.name === key)
    if(searchedMovieData !== undefined){
      navigate('/details',{state: searchedMovieData})
    }
    if(serchedPeopleData !== undefined){
      navigate('/actor',{state: serchedPeopleData})
    } 
    if(serchedPlanetData !== undefined){
      navigate('/planet',{state: serchedPlanetData})
    } 
    if(serchedStarshipsData !== undefined){
      navigate('/starship',{state: serchedStarshipsData})
    }     
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className={classes.navbar}>
          <Button onClick={()=> navigate("/")}>
            <img
            src={logo}
            alt={"logo"}
            style={{height:"30px",}}
            />

          </Button>
          
        <Autocomplete
          id="free-solo-demo"
          className={classes.input}
          options={searchData}
          renderInput={(params) => <TextField {...params} label="search" />}
          onChange={(event, value) => openOption(value)} 
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}