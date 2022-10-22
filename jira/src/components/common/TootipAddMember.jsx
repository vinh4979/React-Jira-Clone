import {
  Autocomplete,
  InputLabel,
  styled,
  TextField,
  Tooltip,
  tooltipClasses,
  Typography
} from '@mui/material'
import React from 'react'

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.background.default,
    // color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 500,
    // fontSize: theme.typography.pxToRem(12),
    border: '1px solid gray',
    padding: '15px',
    height: '100%'
  }
}))

const TootipAddMember = ({ children, getValue, getInputValue, arrUser }) => {
  return (
    <>
      <HtmlTooltip
        title={
          <React.Fragment>
            <InputLabel
              sx={{
                fontWeight: '900',
                marginBottom: '15px'
              }}
            >
              Add user
            </InputLabel>
            <Autocomplete
              onChange={getValue}
              onInputChange={getInputValue}
              disablePortal
              id="combo-box-demo"
              // isOptionEqualToValue={(option, value) =>
              //   option.name === value.name
              // }
              getOptionLabel={option => option.name}
              options={arrUser}
              // size="small"
              sx={{ width: 200 }}
              // fullWidth
              renderInput={params => (
                <TextField {...params} placeholder="Search user" />
              )}
            />
          </React.Fragment>
        }
      >
        {children}
      </HtmlTooltip>
    </>
  )
}

export default TootipAddMember
