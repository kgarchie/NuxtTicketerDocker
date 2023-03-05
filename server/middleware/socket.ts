import WebSocket, {WebSocketServer} from "ws";
import prisma from "~/script";

type Client = {
    user_id: string; // id of client, can be session id or user id
    socket: WebSocket; // socket of client
}

declare global {
    var wss: WebSocketServer;
    var clients: Client[];
}

let wss: WebSocketServer;
let clients: Client[] = [];

export default defineEventHandler((event) => {
    if (!global.wss) {
        wss = new WebSocketServer({server: event.node.res.socket?.server});

        // I don't know if this is the best way to do this, I used async/await
        wss.on("connection", async (socket) => {
            const user_cookie = getCookie(event, "user") || null;
            const {data: userRequest} = await $fetch('/api/user',
                {
                    headers: {
                        "Cookie": `user=${user_cookie}`
                    }
                }
            ).then((data) => {
                return data
            }).catch((error) => {
                console.log(error)
            })

            const user = userRequest.value.user_id || null

            // Instead of querying the database twice,
            // I think it's better to query once and store user in a global variable or sth that is only accessible to the session user
            // accessible to the rest of the project
            // This will definitely be slow when there are many clients
            if (!user) {
                return null
            } else {

            }

            socket.on("message", (message) => {

                // this will definitely be slow when there are many clients
                // but for now it's fine
                wss.clients.forEach((client) => {
                    if (client == socket && client.readyState === WebSocket.OPEN) {
                        clients.push(
                            {
                                // user id will be the message sent by the client
                                user_id: message.toString(),
                                // this is the socket of the client
                                socket: client
                            }
                        )
                    }
                })
            })

            socket.on("close", () => {
                console.log("closed")
            })
        })

        global.wss = wss;
    }
})


/*
* Dead code
* if (uuidRegExp.test(user)) {
                    db_user = await prisma.ephemeralUser.findUnique({
                        where: {
                            user_id: user
                        }
                    }).catch((error) => {
                        console.log(error)
                    }).then(
                        (data) => {
                            if (data) {
                                prisma.ephemeralUser.update(
                                    {
                                        where: {
                                            user_id: data.user_id
                                        },
                                        data: {
                                            is_active: true
                                        }
                                    }
                                )
                            }
                            return data
                        }
                    )
                } else {
                    db_user = await prisma.user.findUnique({
                        where: {
                            id: parseInt(user)
                        }
                    }).catch((error) => {
                        console.log(error)
                    }).then(
                        (data) => {
                            if (data) {
                                prisma.user.update(
                                    {
                                        where: {
                                            id: data.id
                                        },
                                        data: {
                                            is_active: true
                                        }
                                    }
                                )
                            }
                            return data
                        }
                    )
                }
                *
                if (db_user !== null) {
                    socket.send(db_user + "connected to server and active")
                } else {
                    socket.send("user not found")
                }
* */
