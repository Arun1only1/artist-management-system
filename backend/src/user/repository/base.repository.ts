import { PaginationInput } from './../dto/input/pagination.input';
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

  async updateDataById(id: string, value: any) {
    await this.collectionName.update(id, value);
  }

  async findDataById(id: string) {
    return await this.collectionName.findOne({ where: { id } });
  }

  async findAllDataWithRelations(condition: any, relationTable: string) {
    return await this.collectionName.find(
      { where: condition },
      { relations: [relationTable] },
    );
  }

  async findAllData(condition: any) {
    return await this.collectionName.find({ where: condition });
  }

  async deleteById(id: string) {
    return await this.collectionName.delete(id);
  }

  async findDataUsingPagination(
    condition: any = {},
    paginationInput: PaginationInput,
  ) {
    const { page, limit } = paginationInput;

    const skip = (page - 1) * limit;

    const [result, total] = await this.collectionName.findAndCount({
      where: condition,
      take: limit,
      skip,
    });

    return { result, total, totalPages: Math.ceil(total / limit) };
  }
}
