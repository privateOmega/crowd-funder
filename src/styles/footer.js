import { primaryColor, dangerColor } from "./crowd-funder"

const footerStyles = {
  footer: {
    padding: "1.5rem 0",
    textAlign: "center",
    display: "flex",
    zIndex: "2",
    position: "relative",
  },
  container: {
    margin: "0 auto",
    padding: "0",
  },
  icon: {
    color: dangerColor,
    width: "18px",
    height: "18px",
    position: "relative",
    top: "3px",
  },
  a: {
    color: primaryColor,
    textDecoration: "none",
    backgroundColor: "transparent",
  },
}

export default footerStyles
