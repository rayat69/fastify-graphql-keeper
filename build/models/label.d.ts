/// <reference types="mongoose" />
import { Label } from '../graphql/generated';
export interface ILabel extends Omit<Label, '_id' | 'todos'> {
}
declare const labelModel: import("mongoose").Model<ILabel, {}, {}>;
export default labelModel;
