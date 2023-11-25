import { createContext,useReducer } from "react";
export const ForumContext=createContext()
export const forumsReducer=(state,action)=>{
  switch (action.type) {
    case 'SET_FORUMS': // Update this action type
      return {
        forums: action.payload,
      };
    case 'CREATE_FORUMS':
      return {
        forums: [action.payload, ...state.forums],
      };
    default:
      return state;
  }
}
export const ForumContextProvider=({children})=>{
    const [state,dispatch]=useReducer(forumsReducer,{
        forums:null
    })
    return(
        <ForumContext.Provider value={{...state,dispatch}}>
            {children}
        </ForumContext.Provider>
    )
}