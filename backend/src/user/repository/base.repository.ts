export class BaseRepository {
  private readonly collectionName;

  constructor(collectionName) {
    this.collectionName = collectionName;
  }

  async insertData(value: any) {
    const data = this.collectionName.create(value);
    await this.collectionName.save(data);
  }

  async deleteData(id: string) {
    await this.collectionName.delete(id);
  }

  async updateData(id: string, value: any) {
    await this.collectionName.update(id, value);
  }

  async findDataById(id: string) {
    return await this.collectionName.findOne({ where: { id } });
  }

  async findData(condition: any) {
    return await this.collectionName.find({ where: condition });
  }
}
