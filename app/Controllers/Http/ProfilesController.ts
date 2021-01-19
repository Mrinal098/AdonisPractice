import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Profile from 'App/Models/Profile'

export default class ProfilesController {
    public async createProfile({request, response, auth}: HttpContextContract){

        await auth.authenticate()
        
        const user = auth.user

        const validationSchema = schema.create({
            age: schema.number(),
            gender: schema.string(),
        })

        const profileDetails = await request.validate({
            schema: validationSchema,
        })

        const profile = await Profile.create({
            userId: user?.id,
             ...profileDetails
        })

        return response.status(201).json({
            message: "Profile created"
        })
    }

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
            age: schema.number(),
            gender: schema.string(),
        })

        const profileDetails = await request.validate({
            schema: validationSchema,
        })

        const profile = await Profile.findByOrFail('userId', user?.id)

        profile.age = profileDetails.age
        profile.gender = profileDetails.gender

        profile.save()

        return response.status(200).json({
            message: "User profile updated"
        })
    }
}
