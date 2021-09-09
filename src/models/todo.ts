import { model, Schema, PopulatedDoc, Document } from 'mongoose'
import { Todo } from '../graphql/generated'
import { ILabel } from './label'

type ITodo = Todo & {
  labels: PopulatedDoc<ILabel & Document>[]
}

const todoSchema = new Schema<ITodo>({
  title: {
    type: String,
    required: true,
  },
  notes: [
    {
      text: {
        type: String,
        required: true,
      },
      isCompleted: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
  ],
  labels: [
    {
      type: Schema.Types.ObjectId,
      ref: 'labels',
    },
  ],
  color: {
    type: String,
    required: true,
    default: '#fafafa',
  },
  isChechBoxMode: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: String,
    required: true,
    default: new Date().toISOString,
  },
})

const todoModel = model<ITodo>('todos', todoSchema)

export default todoModel
