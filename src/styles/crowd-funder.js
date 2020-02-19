const primaryColor = "#9c27b0"

const secondaryColor = "#556cd6"

const warningColor = "#ff9800"

const dangerColor = "#f44336"

const successColor = "#4caf50"

const infoColor = "#00acc1"

const grayColor = "#999999"

const defaultFont = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontWeight: "300",
  lineHeight: "1.5em",
}

const containerFluid = {
  paddingRight: "15px",
  paddingLeft: "15px",
  marginRight: "auto",
  marginLeft: "auto",
  width: "100%",
}
const container = {
  ...containerFluid,
  "@media (min-width: 576px)": {
    maxWidth: "540px",
  },
  "@media (min-width: 768px)": {
    maxWidth: "720px",
  },
  "@media (min-width: 992px)": {
    maxWidth: "960px",
  },
  "@media (min-width: 1200px)": {
    maxWidth: "1140px",
  },
}

const title = {
  color: "#3C4858",
  margin: "1.75rem 0 0.875rem",
  textDecoration: "none",
  fontWeight: "700",
  fontFamily: `"Roboto Slab", "Times New Roman", serif`,
}

export {
  primaryColor,
  secondaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  grayColor,
  defaultFont,
  container,
  containerFluid,
  title,
}
