import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1b5e20',
    },
    secondary: {
      main: '#9be564',
      contrastText: '#14261a',
    },
    background: {
      default: '#f6f8f4',
      paper: '#ffffff',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Segoe UI", system-ui, sans-serif',
  },
})
