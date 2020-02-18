import { createMuiTheme } from "@material-ui/core/styles"

import { primaryColor, secondaryColor, dangerColor } from "../color-scheme"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
    error: {
      main: dangerColor,
    },
    background: {
      default: "#fff",
    },
  },
})

export default theme
