const router = require("express").Router()
const User = require("../models/User")

router.get("/users", async (req, res, next) => {
	User.find({})
		.then((data) => res.send(data))
		.catch((err) => next(err))
})

router.post("/create", async (req, res, next) => {
	User.create(req.body)
		.then((newUser) => res.json(newUser))
		.catch((err) => next(err))
})

router.put("/update/:id", async (req, res, next) => {
	User.findByIdAndUpdate(req.params.id, req.body)
		.then((obj) => {
			req.body.id = req.params.id
			res.json(req.body)
		})
		.catch((err) => next(err))
})

router.delete("/remove/:id", async (req, res, next) => {
	User.findByIdAndRemove(req.params.id)
		.then((obj) => res.send(`Deleted ${req.params.id}`))
		.catch((err) => next(err))
})

module.exports = router
