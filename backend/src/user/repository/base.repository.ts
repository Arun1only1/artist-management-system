import { PaginationInput } from './../dto/input/pagination.input';
export class BaseRepository {
  private readonly collectionName;

  constructor(collectionName) {
    this.collectionName = collectionName;
  }

  async insertData(value: any) {
    const data = this.collectionName.create(value);
    return await this.collectionName.save(data);
  }

  async updateDataById(id: string, value: any) {
    await this.collectionName.update(id, value);
  }

  async findDataById(id: string) {
    return await this.collectionName.findOne({ where: { id } });
  }

  async findDataByCondition(condition: any = {}) {
    return await this.collectionName.findOne({ where: condition });
  }
  async findDataByConditionAndRelations(condition: any = {}, relations: any[]) {
    return await this.collectionName.findOne({ where: condition, relations });
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

  async deleteByCondition(condition: any) {
    return await this.collectionName.delete(condition);
  }

  async findDataUsingPagination(
    condition: any = {},
    paginationInput: PaginationInput,
    relations?: string[],
  ) {
    const { page, limit } = paginationInput;

    const skip = (page - 1) * limit;

    const query: any = {
      where: condition,
      take: limit,
      skip,
    };

    if (relations && relations.length > 0) {
      query.relations = relations;
    }

    const [result, total] = await this.collectionName.findAndCount(query);

    return { result, total, totalPages: Math.ceil(total / limit) };
  }
}
