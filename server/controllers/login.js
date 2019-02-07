const router = require("express").Router()
const Joi = require("joi")

const users = [
	{
		username: "user",
		password: "user123456",
	},
	{
		username: "admin",
		password: "admin123456",
	},
]

const loginSchema = Joi.object().keys({
	username: Joi.string().required(),
	password: Joi.string()
		.min(8)
		.required(),
})

router.get("/", (req, res) => {
	res.json("this is login route")
})

router.post("/", (req, res, next) => {
	console.log(req.body)
	const result = Joi.validate(req.body, loginSchema)
	if (result.error) {
		next(result.error.details[0].message)
	}
	// Find user
	const foundUser = users.find(user => {
		return (
			user.username === req.body.username &&
			user.password === req.body.password
		)
	})

	if (foundUser) {
		res.json({ user: foundUser.username })
	} else {
		next("User not found")
	}
	//res.json(result)
})

module.exports = router
