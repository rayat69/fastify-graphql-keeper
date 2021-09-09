import type { GraphQLResolveInfo } from 'graphql'
import type { MercuriusContext } from 'mercurius'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) =>
  | Promise<import('mercurius-codegen').DeepPartial<TResult>>
  | import('mercurius-codegen').DeepPartial<TResult>
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X]
} &
  { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  _FieldSet: any
}

export type UpdatesNoteInput = {
  text: Scalars['String']
  isCompleted: Scalars['Boolean']
}

export type CreateTodoInput = {
  title: Scalars['String']
  notes: Array<Scalars['String']>
  labels: Array<Scalars['ID']>
  color?: Maybe<Scalars['String']>
  isChechBoxMode?: Maybe<Scalars['Boolean']>
}

export type UpdateTodoInput = {
  title?: Maybe<Scalars['String']>
  notes?: Maybe<Array<UpdatesNoteInput>>
  labels?: Maybe<Array<Scalars['ID']>>
  color?: Maybe<Scalars['String']>
  isChechBoxMode?: Maybe<Scalars['Boolean']>
}

export type Label = {
  __typename?: 'Label'
  _id: Scalars['ID']
  name: Scalars['String']
  todos: Array<Todo>
}

export type Mutation = {
  __typename?: 'Mutation'
  createTodo?: Maybe<Todo>
  updateTodo?: Maybe<Todo>
  deleteTodo?: Maybe<Todo>
  copyTodo?: Maybe<Todo>
  createLabel?: Maybe<Label>
  deleteLabel?: Maybe<Label>
}

export type MutationcreateTodoArgs = {
  input: CreateTodoInput
}

export type MutationupdateTodoArgs = {
  id: Scalars['ID']
  input?: Maybe<UpdateTodoInput>
}

export type MutationdeleteTodoArgs = {
  id: Scalars['ID']
}

export type MutationcopyTodoArgs = {
  id: Scalars['ID']
}

export type MutationcreateLabelArgs = {
  name: Scalars['String']
}

export type MutationdeleteLabelArgs = {
  id: Scalars['ID']
}

export type Note = {
  __typename?: 'Note'
  text: Scalars['String']
  isCompleted: Scalars['Boolean']
}

export type Query = {
  __typename?: 'Query'
  todos: Array<Todo>
  labels: Array<Label>
  user?: Maybe<User>
}

export type Todo = {
  __typename?: 'Todo'
  _id: Scalars['ID']
  title: Scalars['String']
  notes: Array<Note>
  labels: Array<Label>
  color: Scalars['String']
  isChechBoxMode: Scalars['Boolean']
  createdAt: Scalars['String']
}

export type User = {
  __typename?: 'User'
  _id: Scalars['ID']
  email: Scalars['String']
  name: Scalars['String']
  todos: Array<Todo>
  labels: Array<Label>
  listMode: Scalars['Boolean']
  darkMode: Scalars['Boolean']
}

export type ResolverTypeWrapper<T> =
  | Promise<T>
  | T
  | (() => Promise<T>)
  | (() => T)

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  UpdatesNoteInput: UpdatesNoteInput
  String: ResolverTypeWrapper<Scalars['String']>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  CreateTodoInput: CreateTodoInput
  ID: ResolverTypeWrapper<Scalars['ID']>
  UpdateTodoInput: UpdateTodoInput
  Label: ResolverTypeWrapper<Label>
  Mutation: ResolverTypeWrapper<{}>
  Note: ResolverTypeWrapper<Note>
  Query: ResolverTypeWrapper<{}>
  Todo: ResolverTypeWrapper<Todo>
  User: ResolverTypeWrapper<User>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  UpdatesNoteInput: UpdatesNoteInput
  String: Scalars['String']
  Boolean: Scalars['Boolean']
  CreateTodoInput: CreateTodoInput
  ID: Scalars['ID']
  UpdateTodoInput: UpdateTodoInput
  Label: Label
  Mutation: {}
  Note: Note
  Query: {}
  Todo: Todo
  User: User
}

export type LabelResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['Label'] = ResolversParentTypes['Label']
> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  todos?: Resolver<Array<ResolversTypes['Todo']>, ParentType, ContextType>
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MutationResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  createTodo?: Resolver<
    Maybe<ResolversTypes['Todo']>,
    ParentType,
    ContextType,
    RequireFields<MutationcreateTodoArgs, 'input'>
  >
  updateTodo?: Resolver<
    Maybe<ResolversTypes['Todo']>,
    ParentType,
    ContextType,
    RequireFields<MutationupdateTodoArgs, 'id'>
  >
  deleteTodo?: Resolver<
    Maybe<ResolversTypes['Todo']>,
    ParentType,
    ContextType,
    RequireFields<MutationdeleteTodoArgs, 'id'>
  >
  copyTodo?: Resolver<
    Maybe<ResolversTypes['Todo']>,
    ParentType,
    ContextType,
    RequireFields<MutationcopyTodoArgs, 'id'>
  >
  createLabel?: Resolver<
    Maybe<ResolversTypes['Label']>,
    ParentType,
    ContextType,
    RequireFields<MutationcreateLabelArgs, 'name'>
  >
  deleteLabel?: Resolver<
    Maybe<ResolversTypes['Label']>,
    ParentType,
    ContextType,
    RequireFields<MutationdeleteLabelArgs, 'id'>
  >
}

export type NoteResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['Note'] = ResolversParentTypes['Note']
> = {
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  isCompleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  todos?: Resolver<Array<ResolversTypes['Todo']>, ParentType, ContextType>
  labels?: Resolver<Array<ResolversTypes['Label']>, ParentType, ContextType>
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
}

export type TodoResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['Todo'] = ResolversParentTypes['Todo']
> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  notes?: Resolver<Array<ResolversTypes['Note']>, ParentType, ContextType>
  labels?: Resolver<Array<ResolversTypes['Label']>, ParentType, ContextType>
  color?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  isChechBoxMode?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UserResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  todos?: Resolver<Array<ResolversTypes['Todo']>, ParentType, ContextType>
  labels?: Resolver<Array<ResolversTypes['Label']>, ParentType, ContextType>
  listMode?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  darkMode?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type Resolvers<ContextType = MercuriusContext> = {
  Label?: LabelResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Note?: NoteResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Todo?: TodoResolvers<ContextType>
  User?: UserResolvers<ContextType>
}

type Loader<TReturn, TObj, TParams, TContext> = (
  queries: Array<{
    obj: TObj
    params: TParams
  }>,
  context: TContext & {
    reply: import('fastify').FastifyReply
  }
) => Promise<Array<import('mercurius-codegen').DeepPartial<TReturn>>>
type LoaderResolver<TReturn, TObj, TParams, TContext> =
  | Loader<TReturn, TObj, TParams, TContext>
  | {
      loader: Loader<TReturn, TObj, TParams, TContext>
      opts?: {
        cache?: boolean
      }
    }
export interface Loaders<
  TContext = import('mercurius').MercuriusContext & {
    reply: import('fastify').FastifyReply
  }
> {
  Label?: {
    _id?: LoaderResolver<Scalars['ID'], Label, {}, TContext>
    name?: LoaderResolver<Scalars['String'], Label, {}, TContext>
    todos?: LoaderResolver<Array<Todo>, Label, {}, TContext>
  }

  Note?: {
    text?: LoaderResolver<Scalars['String'], Note, {}, TContext>
    isCompleted?: LoaderResolver<Scalars['Boolean'], Note, {}, TContext>
  }

  Todo?: {
    _id?: LoaderResolver<Scalars['ID'], Todo, {}, TContext>
    title?: LoaderResolver<Scalars['String'], Todo, {}, TContext>
    notes?: LoaderResolver<Array<Note>, Todo, {}, TContext>
    labels?: LoaderResolver<Array<Label>, Todo, {}, TContext>
    color?: LoaderResolver<Scalars['String'], Todo, {}, TContext>
    isChechBoxMode?: LoaderResolver<Scalars['Boolean'], Todo, {}, TContext>
    createdAt?: LoaderResolver<Scalars['String'], Todo, {}, TContext>
  }

  User?: {
    _id?: LoaderResolver<Scalars['ID'], User, {}, TContext>
    email?: LoaderResolver<Scalars['String'], User, {}, TContext>
    name?: LoaderResolver<Scalars['String'], User, {}, TContext>
    todos?: LoaderResolver<Array<Todo>, User, {}, TContext>
    labels?: LoaderResolver<Array<Label>, User, {}, TContext>
    listMode?: LoaderResolver<Scalars['Boolean'], User, {}, TContext>
    darkMode?: LoaderResolver<Scalars['Boolean'], User, {}, TContext>
  }
}
declare module 'mercurius' {
  interface IResolvers
    extends Resolvers<import('mercurius').MercuriusContext> {}
  interface MercuriusLoaders extends Loaders {}
}
