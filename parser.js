const net = require('net');
const fs = require('fs');

const server = net.createServer(socket => {   
    let tempBuffer;
    socket.on('data', data => {
        //console.log(`DATA RECEIVED: ${data.toString()}`);
        if (tempBuffer) 
            tempBuffer = Buffer.concat([tempBuffer, data]);
        else
            tempBuffer = data;

        const completeRequest = getCompleteRequest(tempBuffer);
        if (completeRequest){
            const requestData = parseRequestHead(completeRequest.head);
            console.log(requestData);

            if (requestData.path != '/' && requestData.path != '/favicon.ico'){
                fs.readFile(__dirname + '/static' + requestData.path, (err, data) => {
                    if (err){
                        console.log(`ERROR: ${err}`);
                         socket.end();
                    }
                    socket.end(data);
                });
            }
        }
    })
});

function getCompleteRequest(buffer){
    let tempString = buffer.toString('utf-8');    
    if (~tempString.indexOf('\r\n\r\n')){
        const requestParts = tempString.split('\r\n\r\n');
        return {
            head: requestParts[0],
            body: requestParts[1]
        };
    }
}

function parseRequestHead(buffer){
    const result = {};
    result.headers = {};
    
    const requestHead = buffer.toString('utf-8');
    const requestRecords = requestHead.split('\r\n');
    const requestParams = requestRecords.shift().split(' ');

    result.method = requestParams[0];
    result.path = requestParams[1];
    result.protocol = requestParams[2];

    for (let requestRecord of requestRecords){
        const recordParts = requestRecord.split(': ');
        result.headers[recordParts[0]] = recordParts[1];
    }
    
    return result;
}

let PORT = process.env.PORT || 3000;
server.listen(PORT, 'localhost', () => {
    console.log(`server listening on port ${PORT}`);
});