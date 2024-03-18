"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const constants_1 = require("./constants");
const users = {};
exports.default = (httpServer) => {
    const io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: process.env.FRONTEND_URL,
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });
    io.use((socket, next) => {
    });
    io.on('connection', (socket) => {
        console.log('Socket connection. socket.connected: ', socket.connected);
        /**
         * Notifications.
         */
        socket.on(constants_1.Events.CREATE_NOTIFICATION, (data) => {
        });
        socket.on('disconnect', () => {
            console.log('Socket disconnected');
        });
    });
};
