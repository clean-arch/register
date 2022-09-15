export class Register {
  private static components: Record<string, unknown> = {};
  private constructor() {}
  static async set(
    cls: FunctionConstructor | Promise<Function> | Promise<unknown> | unknown,
    customName?: string
  ) {
    if (cls instanceof Promise) {
      const resolvedClass = await cls;
      this.components[customName || resolvedClass.constructor.name] =
        resolvedClass;
      return;
    }

    this.components[customName || cls.constructor.name] = cls;
  }

  static async get<T>(cls: string | Function) {
    if (cls instanceof Function) {
      return this.components[cls.name] as T;
    }

    return this.components[cls as string] as T;
  }
}
