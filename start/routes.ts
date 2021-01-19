/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import AuthController from 'App/Controllers/Http/AuthController'
import UserController from 'App/Controllers/Http/UserController'

Route.group(()=>{
  Route.post('/signUp', 'AuthController.signup')
  Route.post('/login', 'AuthController.login')
  Route.put('/updateUser/:id', 'UserController.update')
}).prefix('api')

