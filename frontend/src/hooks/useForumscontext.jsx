import { ForumContext } from "../context/ForumContext";
import { useContext } from 'react'

export const useForumContext = () => {
    const context = useContext(ForumContext)
    if (!context) {
        throw Error('useForumsContext must be used inside an ForumsContextProvider')
    }
    return context
}