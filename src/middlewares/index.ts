import { getUserBySessionToken } from '../db/users';
import express from 'express';
import { get, merge } from 'lodash';


export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, 'user.id') as string;

        if (!currentUserId) {
            return res.sendStatus(403);
        }


        if (currentUserId.toString() !== id) {
            return res.sendStatus(403);
        }

        next();


    } catch (error) {
        console.log(error);
        return res.sendStatus(400);

    }
}


export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['MAHMUT-AUTH'];

        if (!sessionToken) {
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        if (!existingUser) {
            return res.sendStatus(403);
        }

        merge(req, { user: existingUser });

        return next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};