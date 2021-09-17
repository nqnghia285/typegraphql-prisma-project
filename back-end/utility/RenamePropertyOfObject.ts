import { IArgsRenamePropertyOfObject } from '~/@types/ArgsRenamePropertyOfObject.type';

function renamePropertyOfObject({ obj, oldProp, newProp }: IArgsRenamePropertyOfObject): void {
   obj[newProp] = obj[oldProp];
   delete obj[oldProp];
}

export default renamePropertyOfObject;
