import { GraphQLResponse, GraphQLRequestContext } from 'apollo-server-types'
import renamePropertyOfObject from '~/utility/RenamePropertyOfObject'

// Customize response
function formatResponse(response: GraphQLResponse, requestContext: GraphQLRequestContext<object>): GraphQLResponse | null {
   if (response.data) {
      switch (Object.keys(response.data).pop()) {
         // User
         case 'getUsers':
            renamePropertyOfObject({ obj: response.data, oldProp: 'getUsers', newProp: 'users' })
            break
         default:
            break
      }
   }

   // if (response.errors?.length! > 0) {
   // 	const err = response.errors![0];
   // 	switch (err.path![0]) {
   // 		// User
   // 		case "getUsers":
   // 			delete response.data!.getUsers;
   // 			response.data!.users = null;
   // 			break;
   // 		case "createUser":
   // 			response.data!.createUser = {
   // 				isSuccess: false,
   // 				message: "Failed!",
   // 			};
   // 			break;
   // 		case "updateUser":
   // 			response.data!.updateUser = {
   // 				isSuccess: false,
   // 				message: "Failed!",
   // 			};
   // 			break;
   // 		case "deleteUser":
   // 			response.data!.deleteUser = {
   // 				isSuccess: false,
   // 				message: "Failed!",
   // 			};
   // 			break;
   // 		case "songIsExisted":
   // 			delete response.data!.songIsExisted;
   // 			response.data!.isExist = null;
   // 			break;
   // 		default:
   // 			break;
   // 	}
   // }

   // console.log('GraphQL Response after handled: ', response);

   return response
}

export default formatResponse
