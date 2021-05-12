import {
    GET_PROFILE,
    GET_PROFILES,
    GET_REPOS,
    NO_REPOS,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    ACCOUNT_DELETED,
    PROFILE_ERROR

} from '../actions/types'

const intialState={
    profile:null,
    profiles:[],
    repos:[],
    loading:true,
    error:{}
}

function profileReducer( state=intialState , action){

    const {type,payload} = action

   switch (type) {
       case GET_PROFILE:
       case UPDATE_PROFILE:
      
           return {
               ...state,
               profile:payload,
               loading:false
           };

           case GET_PROFILES:
            return {
                ...state,
                profiles:payload,
                loading:false
            };

            case PROFILE_ERROR:
                return {
                    ...state,
                    error:payload,
                    profile:null,
                    loading:false,
                   
                };

            case GET_REPOS:
                return {
                    ...state,
                    repos:payload,
                    loading:false
                };


                case NO_REPOS:
                    return {
                        ...state,
                        repos:null,
                        loading:false
                    };
                    
                    case ACCOUNT_DELETED:
                    case CLEAR_PROFILE:
                        return {
                            ...state,
                            repos:[],
                            profile:null
                        }  
       default:
           return state
   }
};
export default profileReducer;

