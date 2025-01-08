import { EntityManager, Repository } from 'typeorm';

export class BaseRepository<T> {
  protected readonly collectionName: Repository<T>;
  private readonly entityManager: EntityManager;

  constructor(collectionName: Repository<T>, entityManager: EntityManager) {
    this.collectionName = collectionName;
    this.entityManager = entityManager;
  }

  async insertData(value: any) {
    const table = this.collectionName.metadata.tableName;

    // Get the keys of the provided object (i.e., column names)
    const keys = Object.keys(value);
    const columns = keys.map((item) => `"${item}"`).join(', ');
    const values = keys.map((key) => `$${keys.indexOf(key) + 1}`).join(', ');

    // Create the query dynamically
    const query = `INSERT INTO ${table} (${columns}, "created_at", "updated_at") 
    VALUES (${values}, NOW(), NOW()) 
    RETURNING *`;

    // Generate the parameters dynamically based on the value object
    const parameters = [...keys.map((key) => value[key]), ...[]]; // Adding the values dynamically

    const res = await this.entityManager.query(query, parameters);

    return res[0];
  }

  async findDataById(id: string) {
    const query = `SELECT * from ${this.collectionName.metadata.tableName} WHERE id = $1`;

    const parameter = [id];

    const result = await this.entityManager.query(query, parameter);

    return result[0];
  }

  async deleteById(id: string) {
    const query = `DELETE FROM ${this.collectionName.metadata.tableName} WHERE id = $1`;
    try {
      const result = await this.collectionName.query(query, [id]);
      return result;
    } catch (error) {
      console.error('Error deleting data:', error);
      throw new Error('Unable to delete the record');
    }
  }
}
