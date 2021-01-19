import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class UserController {

    public async update({request, response, params, auth}: HttpContextContract){

        await auth.authenticate()

        const validationSchema = schema.create({
            name: schema.string(),
            phone_number: schema.string({}, [
                rules.maxLength(10),
            ]),
            email: schema.string({}, [
                rules.email(),
                rules.unique({ table: 'users', column: 'email'}),
            ]),
        })

        const userDetails = await request.validate({
            schema: validationSchema,
        })

        const user = await User.findOrFail(params.id)
        
        user.name = userDetails.name
        user.email = userDetails.email
        user.phone_number = userDetails.phone_number

        user.save()

        return response.status(200).json({
            message: "User data updated"
        })
    }
}
