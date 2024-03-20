import { IRouteParams } from '@app/common/decorators'
import { RequestMethod } from '@nestjs/common'

export const UserRoutes = {
  createUser: {
    path: '/api/user',
    method: RequestMethod.POST,
    jwtSecure: false,
  } as IRouteParams,
  getAllUser: {
    path: '/api/user',
    method: RequestMethod.GET,
    jwtSecure: false,
  } as IRouteParams,
  updateUser: {
    path: '/api/user/:email',
    method: RequestMethod.PUT,
    jwtSecure: false,
  } as IRouteParams,
  getUser: {
    path: '/api/user/:email',
    method: RequestMethod.GET,
    jwtSecure: false,
  } as IRouteParams,
  deleteUser: {
    path: '/api/user/:email',
    method: RequestMethod.DELETE,
    jwtSecure: false,
  } as IRouteParams,
  createActivity: {
    path: '/api/activity/:email',
    method: RequestMethod.POST,
    jwtSecure: false,
  } as IRouteParams,
  getAllActivities: {
    path: '/api/activity/:email',
    method: RequestMethod.GET,
    jwtSecure: false,
  } as IRouteParams,
  deleteActivity: {
    path: '/api/activity/:email/:id',
    method: RequestMethod.DELETE,
    jwtSecure: false,
  } as IRouteParams,
  deleteActivities: {
    path: '/api/activity/:email',
    method: RequestMethod.PUT,
    jwtSecure: false,
  } as IRouteParams,
} as const
