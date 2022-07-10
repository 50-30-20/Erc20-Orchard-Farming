import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  TextField,
  Container,
  StylesProvider,
  Typography,
  Button,
  IconButton,
  MenuItem,
} from '@material-ui/core'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import { NFTStorage, File } from 'nft.storage'
import { apiKey } from '../../APIKEYS'
import CircularStatic from '../commons/CircularProgressWithLabel'
import './CreatePet.css'

function CreatePet() {
  const history = useHistory()
  const petTypeRef = React.createRef()
  const [image, setImage] = useState('')
  const [imageName, setImageName] = useState('')
  const [imageType, setImageType] = useState('')
  const [petName, setPetName] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [petType, setPetType] = useState('')
  const [loading, setLoading] = useState(false)

  const handleImage = (event) => {
    setImage(event.target.files[0])
    setImageName(event.target.files[0].name)
    setImageType(event.target.files[0].type)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)

      const client = new NFTStorage({ token: apiKey })
      const metadata = await client.store({
        name: petName,
        description: `${ownerName}, ${petType}`,
        image: new File([image], imageName, { type: imageType }),
      })
      if (metadata) {
        history.push('/')
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <StylesProvider injectFirst>
      <Container className="root-create-pet">
        {loading ? (
          <CircularStatic />
        ) : (
          <div>
            <Typography className="title" color="textPrimary" gutterBottom>
              Add a photo of your pet
            </Typography>

            {image ? <img src={URL.createObjectURL(image)} alt="pet"  className="img-preview" /> : ''}
            <div className="form-container">
              <form className="form" noValidate autoComplete="off">
                <input
                  accept="image/*"
                  className="input"
                  id="icon-button-photo"
                  defaultValue={image}
                  onChange={handleImage}
                  type="file"
                />
                <label htmlFor="icon-button-photo">
                  <IconButton color="primary" component="span">
                    <PhotoCamera />
                  </IconButton>
                </label>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Pet's name"
                  variant="outlined"
                  className="text-field"
                  defaultValue={petName}
                  onChange={(e) => setPetName(e.target.value)}
                />
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Owner's name"
                  variant="outlined"
                  className="text-field"
                  defaultValue={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                />
                <TextField
                  fullWidth
                  name="petType"
                  select
                  label="Choose one option"
                  variant="outlined"
                  className="text-field"
                  onChange={(e) => setPetType(e.target.value)}
                  defaultValue=""
                  ref={petTypeRef}
                >
                  <MenuItem value="Cat">Cat</MenuItem>
                  <MenuItem value="Dog">Dog</MenuItem>
                  <MenuItem value="Bird">Bird</MenuItem>
                  <MenuItem value="Fish">Fish</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </form>
            </div>
          </div>
        )}
      </Container>
    </StylesProvider>
  )
}

export default CreatePet
