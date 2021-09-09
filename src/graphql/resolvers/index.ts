import type { IResolvers } from 'mercurius'
import Todo from '../../models/todo'
import Label from '../../models/label'

export const resolvers: IResolvers = {
  Todo: {
    labels: async (todo, arg, ctx, __) => {
      const ls = await Label.find({ id: { $in: todo.labels.map(l => l._id) } })

      return ls.map(l => ({
        _id: l.id,
        name: l.name,
      }))
    },
  },
  Label: {
    todos: async (label, arg, ctx, __) => {
      const todos = await Todo.find({ labels: { $in: [label] } })

      return todos.map(t => ({
        _id: t.id,
        color: t.color,
        title: t.title,
        isChechBoxMode: t.isChechBoxMode,
        createdAt: t.createdAt,
        notes: t.notes,
        labels: t.labels,
      }))
    },
  },
  Query: {
    todos: async (_, arg, ctx, __) => {
      try {
        const todos = await Todo.find()
        return todos.map(t => ({
          _id: t.id,
          color: t.color,
          title: t.title,
          isChechBoxMode: t.isChechBoxMode,
          createdAt: t.createdAt,
          notes: t.notes,
          labels: t.labels,
        }))
      } catch (error) {
        throw error
      }
    },
    async labels(_, arg, ctx, __) {
      const ls = await Label.find()

      return ls.map(l => ({
        _id: l.id,
        name: l.name,
      }))
    },
  },
  Mutation: {
    // async createTodo(_, { input }, ctx, __) {
    //   const obj = new Todo({
    //     title: input.title,
    //     notes: input.notes.map(text => ({ text, isCompleted: false })),
    //     color: input.color ?? '#fefefe',
    //     createdAt: new Date().toISOString(),
    //     isChechBoxMode: false,
    //     labels: localLabel.filter(label => input.labels.includes(label.name)),
    //   })
    //   const newTodo = await obj.save()
    //   return {
    //     _id: newTodo.id,
    //     title: newTodo.title,
    //     notes: newTodo.notes,
    //     color: newTodo.color,
    //     createdAt: newTodo.createdAt,
    //     isChechBoxMode: newTodo.isChechBoxMode,
    //     labels: localLabel.filter(label => newTodo.labels.includes(label.name)),
    //   }
    // },
    // createLabel(_, { name }, ctx, info) {
    //   const newLabelType: LabelType = {
    //     _id: localLabel.length + '',
    //     name,
    //     todos: [],
    //   }
    //   localLabel.push(newLabelType)
    //   return newLabelType
    // },
    // updateTodo(id: number, name: string) {
    //   localTodos[id] = name
    //   return name
    // },
    // deleteTodo(id: number) {
    //   const deleted = localTodos[id]
    //   localTodos.filter((_, i) => i !== id)
    //   return deleted
    // },
  },
  //   Subscription: {
  //     newNotification: {
  //       subscribe: (_root, _args, { pubsub }) => {
  //         return pubsub.subscribe(NOTIFICATION)
  //       },
  //     },
  //   },
}
