import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class UserController {

    public async update({request, response, auth}: HttpContextContract){

        await auth.authenticate()

        const user = auth.user

        const validationSchema = schema.create({
            name: schema.string.optional(),
            phone_number: schema.string.optional({}, [
                rules.maxLength(10),
            ]),
            email: schema.string.optional({}, [
                rules.email(),
                rules.unique({ table: 'users', column: 'email'}),
            ]),
        })

        const userDetails = await request.validate({
            schema: validationSchema,
        })

        const userData = await User.findOrFail(user?.id)
        
        userData.name = userDetails.name == undefined ? userData.name : userDetails.name 
        userData.email = userDetails.email == undefined ? userData.email : userDetails.email
        userData.phone_number = userDetails.phone_number == undefined ? userData.phone_number : userDetails.phone_number

        userData.save()

        return response.status(200).json({
            message: "User data updated"
        })
    }
}
