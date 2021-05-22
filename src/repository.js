module.exports = class Repository {
  constructor({ db, table, entity }) {
    this.db = db;
    this.table = table;
    this.entity = entity;
  }

  async findWhere(where) {
    try {
      const [foundItem] = await this.db.transaction((trx) => trx(this.table).where(where));
      const formattedItem = new this.entity(foundItem);

      return formattedItem;
    } catch (error) {
      return false;
    }
  }

  async fetchAll() {
    try {
      const data = await this.db.transaction((trx) => trx(this.table));

      return data;
    } catch (error) {
      return false;
    }
  }

  async create(object) {
    try {
      await this.db.transaction((trx) => trx(this.table).insert(object));

      return object;
    } catch (error) {
      return false;
    }
  }

  async update(object) {
    try {
      const { id } = object;
      await this.db.transaction((trx) => trx(this.table).where({ id }).update(object));

      return object;
    } catch (error) {
      return false;
    }
  }

  async destroy(id) {
    try {
      await this.db.transaction((trx) => trx(this.table).where({ id }).del());

      return true;
    } catch (error) {
      return false;
    }
  }

  async delete(object) {
    try {
      const { id } = object;
      Object.assign(object, { deletedAt: new Date().toLocaleString() });
      await this.db.transaction((trx) => trx(this.table).where({ id }).update(object));

      return object;
    } catch (error) {
      return false;
    }
  }
};
