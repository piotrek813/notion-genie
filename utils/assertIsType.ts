// function assertIsType<T extends PrimitiveTypes>(
//   value: unknown,
//   ...type: T[]
// ): asserts value is typeMap[T] {
//   if (!type.some((t) => t === typeof value)) {
//     throw new Error(`Incorrect type. Type should be ${type} instead was ${typeof value}`);
//   }
// }

// function typeGuard<T extends PrimitiveOrConstructor[]>(o:unknown, className: T):
//   o is GuardedType<T[number]> {

//     for(let name of className) {
//       if (typeof name === 'string' && typeof o === name) return true;
//       if (typeof name === 'function' && o instanceof name) return true;
//     }

//     return false;
// }

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
