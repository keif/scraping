const Nightmare = require("nightmare")
require("nightmare-inline-download")(Nightmare)

const nightmare = Nightmare({
	show: true,
})

;(async () => {
	const url = "https://www.learningcontainer.com/sample-zip-files/"
	const selector = '[href$="sample-zip-file.zip"]'

	await nightmare.goto(url)

	await nightmare.click(selector)

	let download = await nightmare.download("./file.zip")

	console.log(download)

	debugger
})()
