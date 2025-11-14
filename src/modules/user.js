import { isAction } from "redux"
import { createAction, handleActions } from "redux-actions"


const SET_PREVIOUS_URL = "user/SET_PREVIOUS_URL"
const SET_USER = "user/SET_USER"
const SET_USER_STATUS = "user/SET_USER_STATUS"

export const setPreviousUrl = createAction(SET_PREVIOUS_URL)
export const setUser = createAction(SET_USER)
export const setUserStatus= createAction(SET_USER_STATUS)

const UserInitialValue = {
  currentUser: {
    memberEmail: "",
    memberAddress: "",
    memberDetailAddress: "",
    memberPostcode: "",
    memberPhone: "",
    memberBirth: "",
    memberGender: "",
    memberNickname: "",
    memberPhone: "",
    memberCandy: "",
    memberRank: "",
    memberName: "",
    memberPictureName: "",
    memberPicturePath: "",
    memberProvider: ""
  },
  isLogin: false,
  previousUrl: ""
}

const user = handleActions({
  [SET_PREVIOUS_URL] : (state, action) =>  ({...state, previousUrl: action.payload}),
  [SET_USER] : (state, action) =>  ({...state, currentUser: action.payload}),
  [SET_USER_STATUS] : (state, action) =>  ({...state, isLogin: action.payload}),
},UserInitialValue)

export default user;