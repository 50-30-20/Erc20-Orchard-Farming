import React from 'react'
import { StylesProvider, Chip, Container } from '@material-ui/core'
import './Home.css'
import PetGallery from './PetGallery'

function Home() {
  const handleDelete = () => {
    console.info('You clicked the delete icon.')
  }

  const handleClick = () => {
    console.info('You clicked the Chip.')
  }

  return (
    <StylesProvider injectFirst>
      <Container>
        <div className="label-btns">
          <Chip
            size="medium"
            label="Today"
            color="primary"
            clickable
            onClick={handleDelete}
          />

          <Chip
            size="medium"
            label="Last Week"
            clickable
            onClick={handleDelete}
          />

          <Chip
            size="medium"
            label="Last Month"
            clickable
            onClick={handleDelete}
          />

          <Chip
            size="medium"
            label="All Time"
            clickable
            onClick={handleDelete}
          />
        </div>
        <PetGallery />
      </Container>
    </StylesProvider>
  )
}

export default Home
