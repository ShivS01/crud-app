import { Button, Container, Input, List, ListItem, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import reqServer from "./services/data"
import { makeStyles } from "@mui/styles"
import { createTheme } from "@mui/system"
import DataList from "./components/DataList"

const theme = createTheme()
const useStyles = makeStyles(() => ({
	rowContainer: {
		display: "flex",
		justifyContent: "space-around",
		alignContent: "center",
		alignItems: "center",
		marginLeft: theme.spacing(10),
		marginRight: theme.spacing(10),
		marginBottom: theme.spacing(2),
	},
	columnContainer: {
		display: "flex",
		justifyContent: "space-around",
		flexDirection: "column",
		padding: theme.spacing(1),
	},
	pad: {
		padding: theme.spacing(2),
	},
}))

const App = () => {
	const classes = useStyles()

	const [name, setName] = useState("")
	const [email, setEmail] = useState("")

	const updateName = (e) => setName(e.target.value)
	const updateEmail = (e) => setEmail(e.target.value)
	const createHandler = (e) => {
		e.preventDefault()
		let newEntry = { name, email }
		reqServer.create(newEntry)
		setName("")
		setEmail("")
		alert("Created user")
		// console.log(data)
	}

	return (
		<div>
			<Typography className={classes.pad} align="center" variant="h4">
				React CRUD App
			</Typography>

			<div className={classes.rowContainer}>
				<Input placeholder="Name" value={name} onChange={(e) => updateName(e)}></Input>
				<Input placeholder="Email" value={email} onChange={(e) => updateEmail(e)}></Input>
				<Button variant="contained" color="success" onClick={(e) => createHandler(e)}>
					Create
				</Button>
			</div>

			<Container>
				<DataList />
			</Container>
		</div>
	)
}

export default App
