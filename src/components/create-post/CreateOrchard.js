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
import './CreateOrchard.css'


function CreateOrchard() {
  const history = useHistory()
  const petTypeRef = React.createRef()
  const [image, setImage] = useState('')
  const [imageName, setImageName] = useState('')
  const [imageType, setImageType] = useState('')
  const [petName, setPetName] = useState('')
  const [walletAddress, setWalletAddress] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [petType, setPetType] = useState('')
  const [link, setLink] = useState('')
  const [farm, setFarm] = useState('')
  const [areasize, setAreaSize] = useState('')
  const [country, setCountry] = useState('')
  const [treeDescription, setTreeDescription] = useState('')
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
              Add Orchard Details
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
                  label="Orchards's name"
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
                {/* <TextField
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
                </TextField> */}
                <TextField
                  fullWidth
                  name="discription"
                  id="outlined-basic"
                  label="Discription"
                  variant="outlined"
                  className="text-field"
                  defaultValue={ownerName}
                  onChange={(e) => setTreeDescription(e.target.value)}
                />
                <TextField
                  fullWidth
                  name="walletAddress"
                  id="outlined-basic"
                  label="Orchard WalletAddress"
                  variant="outlined"
                  className="text-field"
                  defaultValue={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                />
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Website, Instagram link"
                  variant="outlined"
                  className="text-field"
                  defaultValue={link}
                  onChange={(e) => setLink(e.target.value)}
                />
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Farm type"
                  variant="outlined"
                  className="text-field"
                  defaultValue={farm}
                  onChange={(e) => setFarm(e.target.value)}
                />
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Country"
                  variant="outlined"
                  className="text-field"
                  defaultValue={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Area Size"
                  variant="outlined"
                  className="text-field"
                  defaultValue={areasize}
                  onChange={(e) => setAreaSize(e.target.value)}
                />
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

export default CreateOrchard
