import { useState } from 'react'
import './App.css'
import axios from 'axios'
import SearchIcon from '@mui/icons-material/Search'
import TextField from '@mui/material/TextField'
import { Box, Button, Grid } from '@mui/material'

function App() {
  const [disneyID, setDisneyID] = useState('')
  const [disneyInfo, setDisneyInfo] = useState<undefined | any>(undefined)

  const BASE_URL = 'https://api.disneyapi.dev/characters'

  return (
    <div>
      <h1>Disney Charactor Search</h1>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <TextField
          id="search-bar"
          className="text"
          value={disneyID}
          onChange={(prop) => {
            setDisneyID(prop.target.value)
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

      {disneyInfo === undefined ? (
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
              {disneyInfo.imageUrl === null || disneyInfo === null ? (
                <p>No image found</p>
              ) : (
                <img src={disneyInfo.imageUrl} />
              )}
              <p>
                Name: {disneyInfo.name}
                <br />
                TV Shows: {disneyInfo.tvShows}
              </p>
            </Box>
          </Grid>
        </div>
      )}
    </div>
  )

  function search() {
    if (disneyID === undefined || disneyID === '') {
      return
    }

    axios
      .get(BASE_URL + '/' + disneyID)
      .then((res) => {
        // console.log(res.data)
        setDisneyInfo(res.data)
      })
      .catch((err) => {
        console.log('Charactor not found')
        setDisneyInfo(undefined)
      })
  }
}

export default App
