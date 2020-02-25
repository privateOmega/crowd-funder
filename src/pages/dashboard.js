import React, { useState, useEffect } from "react"
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core"
import classNames from "classnames"

import SEO from "../components/seo"
import Parallax from "../components/parallax"
import GridContainer from "../components/grid-container"
import GridItem from "../components/grid-item"
import { withFirebase } from "../services/firebase"
import * as config from "../config"

import dashboardPageStyles from "../styles/dashboard-page"

const useStyles = makeStyles(dashboardPageStyles)

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
    format: value => value.toLocaleString(),
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 170,
    align: "right",
    format: value => value.toFixed(2),
  },
]

function DashboardPage({ firebase }) {
  const classes = useStyles()

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [donations, setDonations] = useState([])
  const [donationAmount, setDonationAmount] = useState(0)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const updateDonations = snapshot => {
    const donationObject = {
      key: snapshot.key,
      ...snapshot.val(),
    }

    const updatedDonations = [...donations, donationObject]

    const updatedDonationAmount = updatedDonations.reduce(
      (result, value) => result + value.amount,
      0
    )

    setDonations(updatedDonations)
    setDonationAmount(updatedDonationAmount)
  }

  const addEventHandler = async donationsRefPromise => {
    const donationsRef = await donationsRefPromise
    donationsRef.on("child_added", updateDonations)
  }

  const removeEventHandler = async donationsRefPromise => {
    const donationsRef = await donationsRefPromise
    donationsRef.off("child_added", updateDonations)
  }

  useEffect(() => {
    if (firebase) {
      const donationsRefPromise = firebase.database().ref("donations")

      addEventHandler(donationsRefPromise)
      return () => {
        removeEventHandler(donationsRefPromise)
      }
    }
  }, [firebase])

  return (
    <>
      <SEO title="Dashboard page" />
      <Parallax small filter image={require("../images/background.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <div className={classes.section}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8}>
                <h2
                  className={classes.sectionTitle}
                >{`${config.currencySymbol}${donationAmount} Raised`}</h2>
              </GridItem>
            </GridContainer>
          </div>
          <div className={classes.section}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8}>
                <TableContainer className={classes.tableContainer}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        {columns.map(column => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {donations
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map(row => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.key}
                            >
                              {columns.map(column => {
                                const value = row[column.id]
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {column.format && typeof value === "number"
                                      ? column.format(value)
                                      : value}
                                  </TableCell>
                                )
                              })}
                            </TableRow>
                          )
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15]}
                  component="div"
                  count={donations.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    </>
  )
}

export default withFirebase(DashboardPage)
