import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

import User from "App/Models/User";

export default class AuthController {

    public async signup({request, response}: HttpContextContract){
        const validationSchema = schema.create({
            name: schema.string({}, [
                rules.minLength(1),
            ]),
            phone_number: schema.string({}, [
                rules.maxLength(10),
            ]),
            email: schema.string({}, [
                rules.email(),
                rules.unique({ table: 'users', column: 'email'}),
            ]),
            password: schema.string({}, [
                rules.confirmed(),
            ]),
        })

        const userDetails = await request.validate({
            schema: validationSchema,
        })

        const user = await User.create(
            userDetails
        )

        return response.status(201).json({
            message: "User created"
        })
    }

    public async login({request, auth}: HttpContextContract){
        const email = request.input('email')
        const password = request.input('password')

        const token = await auth.attempt(email, password)

        return token.toJSON()
    }
}
