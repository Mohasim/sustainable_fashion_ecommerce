import {cookies} from 'next/headers';
import Joi from 'joi';

import { usersRepo } from '@/helpers/server';
import { apiHandler } from '@/helpers/server/api';


module.exports = apiHandler({
    POST: login
});

async function login(req: Request) {
    const body = await req.json();
    console.log('in route body', body);
    const {user, token} = await usersRepo.authenticate(body);

    // return jwt token in http only cookie
    cookies().set('authorization', token, { httpOnly: true });

    return user;
}

login.schema =  Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
});