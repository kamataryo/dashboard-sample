import React from 'react'
import TextField from '@material-ui/core/TextField'

export const UrlList = () => (
  <TextField
    id="allowed-url"
    label="Input Allowed URL"
    multiline
    rowsMax={ 6 }
    margin="normal"
    placeholder={ 'http://localhost:8080\nhttp://example.com' }
  />
)

export default UrlList
