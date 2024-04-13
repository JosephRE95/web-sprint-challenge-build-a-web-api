/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Pull your server into this file and start it!
*/
const server = require('./api/server')

const port = process.env.PORT || 9000

server.listen(port, () => {
    console.log('listening on', port)
})