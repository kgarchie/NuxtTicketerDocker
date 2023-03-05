// This is not designed with scalability in mind, but it's a good start
// In itself it's not secure, add hash tokenization to the mix, and you have a secure system
import prisma from "~/script"
import {v4 as uuidV4} from "uuid";

// infer type
// let session_user_id: string | number | null = null

export default defineEventHandler(async (event) => {
        let user = getCookie(event, "user")
        // my gut tells me that there should be a way of checking for uuid
        let uuidRegExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gm


        if (!user) {
            // this is the part where you can redirect to login page
            // create ephemeral user in prisma database with uuid to identify session and set as active
            await prisma.ephemeralUser.create({
                data: {
                    user_id: uuidV4(),
                    is_active: true
                }
            }).then(
                (data) => {
                    // session_user_id = data.user_id
                    setCookie(event, "user", data.user_id)
                    return {
                        statusCode: 200,
                        user_id: data.user_id
                    }
                }
            ).catch(
                (error) => {
                    console.log(error)
                    return {
                        statusCode: 500,
                        body: "Unable to create temporary user" + error
                    }
                }
            )
            // set cookie with user id
            setCookie(event, "user", user)
        } else if (uuidRegExp.test(<string>user)) {
            // get user from prisma database and set as active if is ephemeral
            await prisma.ephemeralUser.findUnique(
                {
                    where: {
                        user_id: user
                    }
                }
            ).then(
                // set user as active
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
                        ).catch(
                            (error) => {
                                console.log(error)
                            }
                        ).finally(
                            () => {
                                if (data) {
                                    // session_user_id = data.user_id
                                    return {
                                        statusCode: 200,
                                        user_id: data.user_id
                                    }
                                } else {
                                    return {
                                        statusCode: 500,
                                        body: "Fatal | Database Integrity Violated | Attacks?"
                                    }
                                }
                            }
                        )
                    } else {
                        return {
                            statusCode: 500,
                            body: "Internal server error"
                        }
                    }
                }
            ).catch(
                (error) => {
                    console.log(error)
                    return {
                        statusCode: 500,
                        body: "uuid is valid but unable to find user" + error
                    }
                }
            )
        } else {
            // return the user from prisma database this is if the user is not ephemeral ie a registered user
            // not a uuid regex, will use sth else to identify user maybe a hash value of id?
            // if user has not been set in this node session
            return await prisma.user.findUnique(
                {
                    where: {
                        id: parseInt(<string>user)
                    }
                }
            ).then(
                (data) => {
                    if (data) {
                        return {
                            statusCode: 200,
                            user_id: data.id
                        }
                    } else {
                        return {
                            statusCode: 500,
                            body: "Fatal | Database Integrity Violated | Attacks?"
                        }
                    }
                }
            )

            // return session_user_id
        } // else
    }
)