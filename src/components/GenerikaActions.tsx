import { IconButton} from '@chakra-ui/react';
import { MenuContent, MenuRoot, MenuTrigger } from "./ui/menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { QueryKey } from '@tanstack/react-query';
import { type ValidationSchema } from "./GenerikaTable";
import { GenerikaEdit} from "./GenerikaEdit";
import { GenerikaDelete } from "./GenerikaDelete";


export type GenerikaActionsMenuProps<T> = {
    record: T,
    mutationEditFn: (record: T) => Promise<any>,
    mutationDeleteFn: (record: T) => Promise<any>,
    validationSchema? : ValidationSchema<T>,
    hiddenFields?: (keyof T)[]
    schema: any,
    queryKey?: QueryKey,
    openAPI: any
}
  
export function GenerikaActionsMenu<TypeRecord extends Record<string, any>>({
      record,
      mutationEditFn,
      mutationDeleteFn,
      validationSchema,
      hiddenFields,
      schema,
      queryKey,
      openAPI
    }: GenerikaActionsMenuProps<TypeRecord>) {

    return (
      <MenuRoot>
        <MenuTrigger asChild>
          <IconButton variant="ghost" color="inherit">
            <BsThreeDotsVertical />
          </IconButton>
        </MenuTrigger>
        <MenuContent>
          <GenerikaEdit
            record={record}
            mutationEditFn={mutationEditFn}
            queryKey={queryKey}
            validationSchema = {validationSchema}
            hiddenFields = {hiddenFields}
            schema={schema}
            openAPI={openAPI}
          />
          <GenerikaDelete
            record={record}
            mutationDeleteFn={mutationDeleteFn}
            queryKey={queryKey}
          />
        </MenuContent>
      </MenuRoot>
    );
}
  
