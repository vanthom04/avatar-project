/* eslint-disable @typescript-eslint/no-explicit-any */
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

export interface ActionType {
  type: string
  payload: any
}

// my avatars
export const getAllMyAvatars = (payload: MyAvatar[]) => ({
  type: GET_ALL_MY_AVATARS,
  payload
})

export const addMyAvatar = (payload: MyAvatar) => ({
  type: ADD_MY_AVATAR,
  payload
})

export const updateMyAvatar = (payload: MyAvatar) => ({
  type: UPDATE_MY_AVATAR,
  payload
})

export const removeMyAvatar = (payload: string) => ({
  type: REMOVE_MY_AVATAR,
  payload
})

// templates
export const getAllTemplates = (payload: Template[]) => ({
  type: GET_ALL_TEMPLATES,
  payload
})

export const addTemplate = (payload: Template) => ({
  type: ADD_TEMPLATE,
  payload
})

export const updateTemplate = (payload: Template) => ({
  type: UPDATE_TEMPLATE,
  payload
})

export const removeTemplate = (payload: string) => ({
  type: REMOVE_TEMPLATE,
  payload
})
