import { ActionType } from './actions'
import { MyAvatar, Template } from '~/types'
import {
  ADD_MY_AVATAR,
  ADD_TEMPLATE,
  GET_ALL_MY_AVATARS,
  GET_ALL_TEMPLATES,
  REMOVE_MY_AVATAR,
  REMOVE_TEMPLATE,
  UPDATE_MY_AVATAR,
  UPDATE_TEMPLATE
} from './constants'

export type InitialStateType = {
  myAvatars: MyAvatar[]
  templates: Template[]
}

export const initialState: InitialStateType = {
  myAvatars: [],
  templates: []
}

const reducer = (state: InitialStateType, action: ActionType) => {
  switch (action.type) {
    case GET_ALL_MY_AVATARS:
      return {
        ...state,
        myAvatars: [...action.payload]
      }
    case ADD_MY_AVATAR:
      return {
        ...state,
        myAvatars: [...state.myAvatars, action.payload]
      }
    case UPDATE_MY_AVATAR:
      return {
        ...state,
        myAvatars: state.myAvatars.map((avatar) => {
          if (avatar.id === action.payload.id) {
            return action.payload
          } else {
            return avatar
          }
        })
      }
    case REMOVE_MY_AVATAR:
      return {
        ...state,
        myAvatars: state.myAvatars.filter((avatar) => avatar.id !== action.payload)
      }
    case GET_ALL_TEMPLATES:
      return {
        ...state,
        templates: [...action.payload]
      }
    case ADD_TEMPLATE:
      return {
        ...state,
        templates: [...state.templates, action.payload]
      }
    case UPDATE_TEMPLATE:
      return {
        ...state,
        templates: state.templates.map((template) => {
          if (template.id === action.payload.id) {
            return action.payload
          } else {
            return template
          }
        })
      }
    case REMOVE_TEMPLATE:
      return {
        ...state,
        templates: state.templates.filter((template) => template.id !== action.payload)
      }
    default:
      throw new Error('Invalid action type: ' + action.type)
  }
}

export default reducer
