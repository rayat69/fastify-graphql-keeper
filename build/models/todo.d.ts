import { PopulatedDoc, Document } from 'mongoose';
import { Todo } from '../graphql/generated';
import { ILabel } from './label';
declare type ITodo = Todo & {
    labels: PopulatedDoc<ILabel & Document>[];
};
declare const todoModel: import("mongoose").Model<ITodo, {}, {}>;
export default todoModel;
