import { onData } from "./onData";
import { onEnd } from "./onEnd";
import { onError } from "./onError";


export const onConnection = (socket) => {
    console.log('client connected from : ${socket.remoteAddress}: ${socket.remotePort}')
    
    socket.on('data', onData(socket));
    socket.on('end', onEnd(socket));
    socket.on('error', onError(socket));

};