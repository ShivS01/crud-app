import { Button, IconButton, Input, Typography } from "@mui/material"
import { createTheme } from "@mui/system"
import { makeStyles } from "@mui/styles"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { useEffect, useState } from "react"
import reqServer from "../services/data"

const theme = createTheme()
const useStyles = makeStyles(() => ({
	rowContainer: {
		display: "flex",
		justifyContent: "space-around",
		alignContent: "center",
		alignItems: "center",
		padding: theme.spacing(1),
	},
	pad: {
		padding: theme.spacing(1),
	},
}))

const DataList = () => {
	const classes = useStyles()
	const [data, setData] = useState([])

	useEffect(() => {
		console.log("useEffect")
		reqServer.read().then((res) => {
			console.log(res)
			setData(res)
		})
	}, [])

	const [edit, setEdit] = useState(false)
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [selected, updateSelected] = useState(null)

	const editToggler = (e) => {
		setEdit(!edit)
		if (!edit) {
			console.log(e.target)
			let index = e.target.getAttribute("index")
			updateSelected(index)
			setName(data[index].name)
			setEmail(data[index].email)
		}
	}
	const updateName = (e) => setName(e.target.value)
	const updateEmail = (e) => setEmail(e.target.value)

	const updateHandler = (e) => {
		e.preventDefault()
		let updatedObj = { name, email }
		console.log(updatedObj)
		reqServer.update(data[selected].id, updatedObj).then((e) => alert("Updated"))
		let copy = [...data]
		copy[selected].name = name
		copy[selected].email = email
		setData(copy)
		setEdit(false)
	}
	const removeHandler = (e) => {
		e.preventDefault()
		let index = e.target.getAttribute("index")
		updateSelected(index)
		let objId = data[index].id
		reqServer.remove(objId).then((e) => alert("Deleted!"))
		let copy = [...data]
		if (index !== -1) {
			copy.splice(index, 1)
			setData(copy)
		}
	}
	// console.log(data)
	return (
		<>
			<div>
				{edit ? (
					<div className={classes.rowContainer}>
						<Input
							placeholder="Name"
							value={name}
							onChange={(e) => updateName(e)}
						></Input>
						<Input
							placeholder="Email"
							value={email}
							onChange={(e) => updateEmail(e)}
						></Input>
						<Button
							variant="contained"
							color="secondary"
							onClick={(e) => updateHandler(e)}
						>
							Update
						</Button>
					</div>
				) : (
					<></>
				)}
				{data.map((entry, idx) => (
					<div key={entry.id} className={classes.rowContainer}>
						<Typography align="center" className={classes.pad}>
							{entry.name}
						</Typography>
						<Typography align="center" className={classes.pad}>
							{entry.email}
						</Typography>

						<IconButton
							index={idx}
							className={classes.pad}
							onClick={(e) => editToggler(e)}
						>
							<EditIcon index={idx} />
						</IconButton>
						<IconButton
							index={idx}
							className={classes.pad}
							onClick={(e) => removeHandler(e)}
						>
							<DeleteIcon />
						</IconButton>
					</div>
				))}
			</div>
		</>
	)
}

export default DataList
