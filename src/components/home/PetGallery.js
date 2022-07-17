import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ImageListItem from '@material-ui/core/ImageListItem'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import ImageListItemBar from '@material-ui/core/ImageListItemBar'
import './PetGallery.css'
import CircularStatic from '../commons/CircularProgressWithLabel'
import { apiKey } from '../../APIKEYS'
import { Grid } from '@material-ui/core'

import dummyPNG from '../../images/see-more-work/1.jpeg'


function PetGallery() {
  const [petsData, setPetsData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadPets = async () => {
      try {
        setLoading(true)

        let cids = await fetch('https://api.nft.storage', {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        })
        cids = await cids.json()
        console.log(
          '🚀 ~ file: PetGallery.js ~ line 28 ~ loadPets ~ cids',
          cids,
        )

        const temp = []
        for (let cid of cids.value) {
          if (cid?.cid) {
            let data = await fetch(
              `https://ipfs.io/ipfs/${cid.cid}/metadata.json`,
            )

            data = await data.json()
            console.log(' data', data)

            // formats the imageURL
            const getImage = (ipfsURL) => {
              if (!ipfsURL) return
              ipfsURL = ipfsURL.split('://')
              return 'https://ipfs.io/ipfs/' + ipfsURL[1]
            }

            data.image = await getImage(data.image)
            data.cid = cid.cid
            data.created = cid.created
            temp.push(data)
          }
        }
        setPetsData(temp)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    loadPets()
  }, [])

  console.log('petsData', petsData);

  // const petsDataa = [
  //   {cid: 1, created: "", description: 'lorem ipsum descriptio asjdnadnj', image: "https://ipfs.io/ipfs/bafybeifa4admkjcfaeefrvvxgqpsgqtmtx23xu2smm76ior6zxnf62nxuy/b4.jpeg", name: ''},
  //   {cid: 1, created: "", description: 'lorem ipsum descriptio asjdnadnj', image: "https://ipfs.io/ipfs/bafybeifa4admkjcfaeefrvvxgqpsgqtmtx23xu2smm76ior6zxnf62nxuy/b4.jpeg", name: ''},
  //   {cid: 1, created: "", description: '', image: "https://ipfs.io/ipfs/bafybeifa4admkjcfaeefrvvxgqpsgqtmtx23xu2smm76ior6zxnf62nxuy/b4.jpeg", name: ''},
  //   {cid: 1, created: "", description: '', image: "https://ipfs.io/ipfs/bafybeifa4admkjcfaeefrvvxgqpsgqtmtx23xu2smm76ior6zxnf62nxuy/b4.jpeg", name: ''},
  //   {cid: 1, created: "", description: '', image: "https://ipfs.io/ipfs/bafybeifa4admkjcfaeefrvvxgqpsgqtmtx23xu2smm76ior6zxnf62nxuy/b4.jpeg", name: ''},
  // ]

  return (
    <div style={{ minHeight: '70vh', paddingBottom: '3rem' }}>
      {loading ? (
        <CircularStatic />
      ) : (
        <div style={{ flexGrow: 1 }}>
          <Grid container spacing={1} style={{display: 'flex', justifyContent: 'center'}}>
            {petsData.length != 0 ?
             (
              petsData.map((pet, index) => (
                <Grid item key={index} style={{width: '80%', transform: 'translateX(10%)'}}>
                  <div className='tree-card'>
                    <img src={pet.image} alt={pet.name} style={{width: '100%', height: '100%', borderRadius: '5px', objectFit: 'cover'}}/>
                    <div>
                      <p>{pet.description}</p>
                      <a href={`/pet-details/${pet.cid}`}>View details</a>
                    </div>
                  </div>
                  {/* <ImageListItem style={{ height: '450px', listStyle: 'none' }}>
                    <img src={pet.image} alt={pet.name} />
                    <ImageListItemBar
                      title={pet.name}
                      subtitle={<span>by: {pet.description}</span>}
                      actionIcon={
                        <IconButton
                          aria-label={`info about ${pet.name}`}
                          className="icon"
                        >
                          <Button
                            variant="contained"
                            size="small"
                            component={Link}
                            to={`/pet-details/${pet.cid}`}
                            className="view-btn"
                          >
                            View
                          </Button>
                        </IconButton>
                      }
                    />
                  </ImageListItem> */}
                </Grid>
              ))
            )
            : (
              <h2>No Pets Yet...</h2>
            )}
          </Grid>
        </div>
      )}
    </div>
  )
}

export default PetGallery
