import {
  objectAsync,
  type ObjectEntriesAsync,
  type ObjectOutput,
  type ObjectSchema,
  type ObjectSchemaAsync,
  optionalAsync,
  type OptionalSchemaAsync,
} from '../../schemas/index.ts';
import type {
  BaseSchema,
  BaseSchemaAsync,
  ErrorMessage,
  PipeAsync,
} from '../../types.ts';
import { getRestAndDefaultArgs } from '../../utils/index.ts';

/**
 * Partial object schema type.
 */
type Partial<TObjectEntries extends ObjectEntriesAsync> = {
  [TKey in keyof TObjectEntries]: OptionalSchemaAsync<TObjectEntries[TKey]>;
};

/**
 * Creates an async object schema consisting of all properties of an existing
 * object schema set to optional.
 *
 * @param schema The affected schema.
 * @param pipe A validation and transformation pipe.
 *
 * @returns An async object schema.
 */
export function partialAsync<
  TObjectSchema extends ObjectSchema<any, any> | ObjectSchemaAsync<any, any>
>(
  schema: TObjectSchema,
  pipe?: PipeAsync<
    ObjectOutput<Partial<TObjectSchema['object']['entries']>, undefined>
  >
): ObjectSchemaAsync<Partial<TObjectSchema['object']['entries']>>;

/**
 * Creates an async object schema consisting of all properties of an existing
 * object schema set to optional.
 *
 * @param schema The affected schema.
 * @param error The error message.
 * @param pipe A validation and transformation pipe.
 *
 * @returns An async object schema.
 */
export function partialAsync<
  TObjectSchema extends ObjectSchema<any, any> | ObjectSchemaAsync<any, any>
>(
  schema: TObjectSchema,
  error?: ErrorMessage,
  pipe?: PipeAsync<
    ObjectOutput<Partial<TObjectSchema['object']['entries']>, undefined>
  >
): ObjectSchemaAsync<Partial<TObjectSchema['object']['entries']>>;

/**
 * Creates an async object schema consisting of all properties of an existing
 * object schema set to optional.
 *
 * @param schema The affected schema.
 * @param rest The object rest.
 * @param pipe A validation and transformation pipe.
 *
 * @returns An async object schema.
 */
export function partialAsync<
  TObjectSchema extends ObjectSchema<any, any> | ObjectSchemaAsync<any, any>,
  TObjectRest extends BaseSchema | undefined
>(
  schema: TObjectSchema,
  rest: TObjectRest,
  pipe?: PipeAsync<
    ObjectOutput<Partial<TObjectSchema['object']['entries']>, TObjectRest>
  >
): ObjectSchemaAsync<Partial<TObjectSchema['object']['entries']>, TObjectRest>;

/**
 * Creates an async object schema consisting of all properties of an existing
 * object schema set to optional.
 *
 * @param schema The affected schema.
 * @param rest The object rest.
 * @param error The error message.
 * @param pipe A validation and transformation pipe.
 *
 * @returns An async object schema.
 */
export function partialAsync<
  TObjectSchema extends ObjectSchema<any, any> | ObjectSchemaAsync<any, any>,
  TObjectRest extends BaseSchema | undefined
>(
  schema: TObjectSchema,
  rest: TObjectRest,
  error?: ErrorMessage,
  pipe?: PipeAsync<
    ObjectOutput<Partial<TObjectSchema['object']['entries']>, TObjectRest>
  >
): ObjectSchemaAsync<Partial<TObjectSchema['object']['entries']>, TObjectRest>;

export function partialAsync<
  TObjectSchema extends ObjectSchema<any, any> | ObjectSchemaAsync<any, any>,
  TObjectRest extends BaseSchema | undefined = undefined
>(
  schema: TObjectSchema,
  arg2?:
    | PipeAsync<
        ObjectOutput<Partial<TObjectSchema['object']['entries']>, TObjectRest>
      >
    | ErrorMessage
    | TObjectRest,
  arg3?:
    | PipeAsync<
        ObjectOutput<Partial<TObjectSchema['object']['entries']>, TObjectRest>
      >
    | ErrorMessage,
  arg4?: PipeAsync<
    ObjectOutput<Partial<TObjectSchema['object']['entries']>, TObjectRest>
  >
): ObjectSchemaAsync<Partial<TObjectSchema['object']['entries']>, TObjectRest> {
  // Get rest, error and pipe argument
  const [rest, error, pipe] = getRestAndDefaultArgs<
    TObjectRest,
    PipeAsync<
      ObjectOutput<Partial<TObjectSchema['object']['entries']>, TObjectRest>
    >
  >(arg2, arg3, arg4);

  // Create and return object schema
  return objectAsync(
    Object.entries(schema.object.entries).reduce(
      (entries, [key, schema]) => ({
        ...entries,
        [key]: optionalAsync(schema as BaseSchema | BaseSchemaAsync),
      }),
      {}
    ) as Partial<TObjectSchema['object']['entries']>,
    rest,
    error,
    pipe
  );
}
