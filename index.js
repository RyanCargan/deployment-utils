import { exec } from 'child_process'
import * as http from 'http'
import { secret } from './config.js'

const script = () => {exec('sh deploy.sh',
    (error, stdout, stderr) => {
        console.log(stdout)
        console.log(stderr)
        if (error !== null) {
            console.log(`exec error: ${error}`)
        }
})}

const server = http.createServer(function(request, response) {
	if (request.param) {
		console.dir(request.param)
	}

	if (request.method == 'POST') {
		let body = ''

		request.on('data', function(data) {
			body += data
		})

		request.on('end', function() {
			let state = ''

			if (body === secret) {
				script()
				state = "VALID"
			} else {
				state = "INVALID"
			}

			response.writeHead(200, {'Content-Type': 'text/html'})
			response.end(`POST request received.\nSTATE: ${state}`)
		})
	} else {
		console.log('GET')

		var html = `
			<html>
				<body>
					POST requests only.
				</body>
			</html>`

		response.writeHead(200, {'Content-Type': 'text/html'})
		response.end(html)
	}
})

const port = 5000
const host = '127.0.0.1'
server.listen(port, host)
console.log(`Listening at http://${host}:${port}`)
