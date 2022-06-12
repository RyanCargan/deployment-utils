import { exec } from 'child_process'
import * as http from 'http'
import { secret } from './config.js'

console.log(`-----SECRET ${secret}-----`)

const script = () => {exec('sh deploy.sh',
    (error, stdout, stderr) => {
        console.log(stdout)
        console.log(stderr)
        if (error !== null) {
            console.log(`exec error: ${error}`)
        }
})}

const server = http.createServer(function(request, response) {
	console.dir(request.param)

	if (request.method == 'POST') {
		console.log('POST')
    	var body = ''
		request.on('data', function(data) {
			body += data
			console.log('Partial body: ' + body)
		})
		// ‘end’ event only emitted after data is fully consumed
		request.on('end', function() {
			console.log('Body: ' + body)
			console.log(`-----BODY ${body}-----`)
			if (body === secret) {
				script()
			}
			response.writeHead(200, {'Content-Type': 'text/html'})
			response.end(`POST request received.\nSECRET: ${secret}`)
		})
	} else {
		console.log('GET')
		var html = `
			<html>
				<body>
					<form method="post" action="http://localhost:5000">
					Name: 
						<input type="text" name="name" />
						<input type="submit" value="Submit" />
					</form>
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
