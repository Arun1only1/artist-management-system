export class BaseRepository {
  private readonly collectionName;

  constructor(collectionName) {
    this.collectionName = collectionName;
  }

  async insertData(value: any) {
    const data = this.collectionName.create(value);
    await this.collectionName.save(data);
  }
}
