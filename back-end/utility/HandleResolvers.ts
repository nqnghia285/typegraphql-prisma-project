import graphqlFields from 'graphql-fields';
import { ResolverParams } from 'setup-apollo-server-express';

function handleResolvers({ source, args, context, info }: ResolverParams) {
   // const parseFields = graphqlFields(info, {}, { processArguments: true, excludedFields: ['__typename'] });
   // context.graphqlFields = parseFields;
   // console.log("args: ", args);
   // console.log("parseFields: ", parseFields);
}

export default handleResolvers;
