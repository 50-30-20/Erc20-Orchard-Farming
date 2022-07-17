import React, {useState} from 'react'

import './DonateCrypto.css'
import {
    TextField,
    Container,
    StylesProvider,
    Typography,
    Button,
    IconButton,
    MenuItem,
  } from '@material-ui/core'

const DonateCrypto = () => {

    const[donateAmount, setDonateAmount] = useState(0);
    const[orchardId, setOrchardID] = useState(0);

  return (
    <div className='main-container' style={{minHeight: '70vh', paddingBottom: '3.8rem'}}>
        <div className='main-container'>
            <div className='donate-card'>
                <p className='donate-card-title'>Donate</p>
                <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: '100%'}}>
                    <div>
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            label="Orchards's Id"
                            variant="outlined"
                            className="text-field"
                            defaultValue={orchardId}
                            onChange={(e) => setOrchardID(e.target.value)}
                        />
                        <div className='crypto-dropdown-container'>
                            <select className='dropdown' defaultValue={'ETH'}>
                                <option value="ETH">ETH</option>
                                <option value="USDT">USDT</option>
                            </select>
                            <input type="number" onChange={(e) => {setDonateAmount(e.target.value)}} style={{border: "rgba(0,0,0)", textAlign: 'center', height: '30px', width: "100px"}} placeholder="0.0"/>
                        </div>
                    </div>
                    <div className='donate-btn-container'>
                        <button>DONATE</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DonateCrypto