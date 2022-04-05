import mongoose, { Model } from 'mongoose';

export * from 'mongoose';

if (!global.mongoose) {
  global.mongoose = mongoose;
}
const globalMongoose: typeof mongoose = global.mongoose;
export default globalMongoose;
export function initializeModel<T>(name, schema): T {
  return (
    globalMongoose.models[name] || (globalMongoose.model(name, schema) as any)
  );
}

export const isActive = {
  type: Boolean,
  index: true,
  default: true,
};

export type ModelInstance<T> = InstanceType<Model<T>>;

export function addDeactivate<T>(schema): void {
  // eslint-disable-next-line no-param-reassign
  schema.methods.deactivate = async function deactivate(): Promise<
    ModelInstance<T>
  > {
    this.isActive = false;
    return this.save();
  };
}

export function setupMongooseTests() {
  const globalAny: any = global;
  beforeAll(async () => {
    await globalMongoose.connect(globalAny.__MONGO_URI__);
  });

  afterEach(async () => {
    await globalMongoose.connection.db.dropDatabase();
  });

  afterAll(async () => {
    await globalMongoose.connection.close();
  });
}
