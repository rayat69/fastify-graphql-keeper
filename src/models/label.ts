import { model, Schema, PopulatedDoc } from 'mongoose'
import { Label } from '../graphql/generated'

export interface ILabel extends Omit<Label, '_id' | 'todos'> {}

const labelSchema = new Schema<ILabel>({
  name: {
    type: String,
    required: true,
  },
})

const labelModel = model<ILabel>('labels', labelSchema)

export default labelModel
