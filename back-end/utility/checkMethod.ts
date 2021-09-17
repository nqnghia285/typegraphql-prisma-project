export function checkMethos(source: string, collections: string[]): string {
   let result: string = '';
   collections.forEach((method) => {
      if (source.includes(method)) {
         result = method;
         return;
      }
   });

   return result;
}
