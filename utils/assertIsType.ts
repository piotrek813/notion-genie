type typeMap = {
  string: string;
  number: number;
  bigint: bigint;
  boolean: boolean;
  symbol: symbol;
  undefined: undefined;
  object: object;
};

type PrimitiveTypes = keyof typeMap;
type Constructor = { new (...args: any[]): any };
type PrimitiveOrConstructor = PrimitiveTypes | Constructor;

type GuardedType<T extends PrimitiveOrConstructor> = T extends { new (...args: any[]): infer U }
  ? U
  : T extends keyof typeMap
  ? typeMap[T]
  : never;

export function assertIsType<T extends PrimitiveOrConstructor[]>(
  value: unknown,
  ...types: T
): asserts value is GuardedType<T[number]> {
  for (const type of types) {
    if (typeof type === "string" && typeof value === type) return;
    else if (type instanceof Function && value instanceof type) return;
  }
  throw new Error(`Incorrect type. Type should be ${types} instead was ${typeof value}`);
}
