import React from 'react';
import { 
    List,
    Datagrid,
    TextField,
    ReferenceField,
    NumberField,
    BooleanField,
    Edit,
    Create,
    SimpleForm,
    ReferenceInput,
    TextInput,
    SelectInput,
    LongTextInput,
    NumberInput,
    BooleanInput,
    DisabledInput,
    SelectArrayInput
} from 'react-admin';

import ImageAltUrlSelect from './components/ImageAltUrlSelect';
import ListItem from './components/ListItem';

export const ContentList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="handle" />
            <TextField source="group" />
        </Datagrid>
    </List>
);

export const ContentEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <ListItem source="titleEn" />
            <ListItem source="titleEst" />
            <ListItem source="titleRus" />
            <ListItem source="subTitleEn" />
            <ListItem source="subTitleEst" />
            <ListItem source="subTitleRus" />
            <ListItem source="paragraphEn" />
            <ListItem source="paragraphEst" />
            <ListItem source="paragraphRus" />
            <ImageAltUrlSelect source="imgAll"/>
        </SimpleForm>
    </Edit>
);

export const ProductCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="titleEn" />
            <TextInput source="titleEst" />
            <TextInput source="titleRus" />
            <LongTextInput source="descriptionShortEn" />
            <LongTextInput source="descriptionShortEst" />
            <LongTextInput source="descriptionShortRus" />
            <LongTextInput source="descriptionLongEn" />
            <LongTextInput source="descriptionLongEst" />
            <LongTextInput source="descriptionLongRus" />
            <NumberInput source="amount" />
            <BooleanInput source="available"/>
            <NumberInput source="price" />
        </SimpleForm>
    </Create>
);