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

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <TextField
          id="search-bar"
          className="text"
          value={pokemonID}
          onChange={(prop) => {
            setPokemonID(prop.target.value)
          }}
          label="Enter a charactor ID..."
          variant="outlined"
          placeholder="Search..."
          size="medium"
        />

        <Button
          aria-label="search"
          onClick={() => {
            search()
          }}
        >
          <SearchIcon style={{ fill: 'blue' }} />
        </Button>

        <br />
      </div>

      {/* <p>You have entered {pokemonID}</p> */}

      {pokemonInfo === undefined ? (
        <p>Charactor not found. Please try again.</p>
      ) : (
        <div
          id="pokemon-result"
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '100px 10px 0px 10px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Grid item>
            <Box bgcolor="pink" p={12}>
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
            </Box>
          </Grid>
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
