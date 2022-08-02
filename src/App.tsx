import { useState } from 'react'
import './App.css'
import axios from 'axios'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import TextField from '@mui/material/TextField'
import { Box, Button, Grid, Paper, Skeleton } from '@mui/material'

function App() {
  // Declare a new state variable, which we'll call "pokemonName"
  // const [pokemonName, setPokemonName] = useState('')
  const [pokemonID, setPokemonID] = useState('')
  const [pokemonInfo, setPokemonInfo] = useState<undefined | any>(undefined)

  const POKEMON_BASE_URL = 'https://api.disneyapi.dev/characters'

  return (
    <div>
      <h1>Disney Charactor Search</h1>

      <div>
        {/* <label>Enter the Charactor ID</label> */}
        <br />
        {/* <input
          type="text"
          id="name"
          name="name"
          onChange={(e) => setPokemonID(e.target.value)}
        /> */}

        <TextField
          id="search-bar"
          className="text"
          value={pokemonID}
          onChange={(prop: any) => {
            setPokemonID(prop.target.value)
          }}
          label="Enter a charactor ID..."
          variant="outlined"
          placeholder="Search..."
          size="small"
        />

        <IconButton
          aria-label="search"
          onClick={() => {
            search()
          }}
        >
          <SearchIcon style={{ fill: 'blue' }} />
        </IconButton>

        <br />
        {/* <button onClick={search}>Search</button> */}
      </div>

      <p>You have entered {pokemonID}</p>

      {pokemonInfo === undefined ? (
        <p>Charactor not found. Please try again.</p>
      ) : (
        <div id="pokemon-result">
          {pokemonInfo.imageUrl === null || pokemonInfo === null ? (
            <p>No image found</p>
          ) : (
            <img src={pokemonInfo.imageUrl} />
          )}
          <p>
            Name: {pokemonInfo.name}
            <br />
            TV Shows: {pokemonInfo.tvShows}
          </p>
        </div>
      )}
    </div>
  )

  function search() {
    if (pokemonID === undefined || pokemonID === '') {
      return
    }

    axios
      .get(POKEMON_BASE_URL + '/' + pokemonID)
      .then((res) => {
        // console.log(res.data)
        setPokemonInfo(res.data)
      })
      .catch((err) => {
        console.log('Charactor not found')
        setPokemonInfo(undefined)
      })
  }
}

export default App
