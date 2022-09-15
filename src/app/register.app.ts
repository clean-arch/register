import {
  InputDataType,
  InputDataTypeSync,
} from "./contracts/register.contract";

export class Register {
  private static components: Record<string, unknown> = {};
  private static uniqueComponents = new Set();
  private constructor() {}
  static async set(dataItem: InputDataType, customName?: string) {
    if (dataItem instanceof Promise) {
      const resolvedClass = await dataItem;
      this.components[customName || resolvedClass.constructor.name] =
        resolvedClass;
      return;
    }

    this.components[customName || dataItem.constructor.name] = dataItem;
  }

  static get<T>(dataItem: string | Function) {
    if (dataItem instanceof Function) {
      return this.components[dataItem.name] as T;
    }

    return this.components[dataItem as string] as T;
  }

  static sync = {
    set: (dataItem: InputDataTypeSync, customName?: string) => {
      this.components[customName || dataItem.constructor.name] = dataItem;
    },
  };

  static unique = {
    set: (dataItem: unknown) => this.uniqueComponents.add(dataItem),
    getAll: <T>() => Array.from(this.uniqueComponents) as T,
    rm: (dataItem: unknown) => this.uniqueComponents.delete(dataItem),
  };
}
