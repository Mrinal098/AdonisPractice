import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Profile from 'App/Models/Profile'

export default class ProfilesController {
    public async getProfile({request, response, auth}: HttpContextContract){

        await auth.authenticate()

        const user = auth.user

        await user?.preload("profile")

        return response.status(200).json(
            user?.profile
        )
    }

    public async updateProfile({request, response, auth}: HttpContextContract){

        await auth.authenticate()

        const user = auth.user

        const validationSchema = schema.create({
            age: schema.number.optional(),
            gender: schema.string.optional(),
        })

        const profileDetails = await request.validate({
            schema: validationSchema,
        })

        const searchPayload = { userId: user?.id }

        await Profile.updateOrCreate(searchPayload, profileDetails)

        return response.status(200).json({
            message: "User profile updated"
        })
    }
}
