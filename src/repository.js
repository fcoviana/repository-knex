const { response } = require("./utils/response");

module.exports = class Repository {
  constructor({ db, table, entity }) {
    this.db = db;
    this.table = table;
    this.entity = entity;
  }

  /**
   * Find One Knex Where formatted with repository entity
   * @param {object} where Knex Where
   */
  async findWhere(where) {
    try {
      const [foundItem] = await this.db(this.table).where(where);
      const formattedItem = new this.entity(foundItem);

      return response(true, formattedItem);
    } catch (error) {
      return response(false, null, error);
    }
  }

  /**
   * Fetch all results
   */
  async fetchAll() {
    try {
      const data = await this.db(this.table);

      return response(true, data);
    } catch (error) {
      return response(false, null, error);
    }
  }

  /**
   * create object in database (insert)
   * @param {object} object data to insert
   */
  async create(object) {
    try {
      await this.db(this.table).insert(object);

      return response(true, object);
    } catch (error) {
      return response(false, null, error);
    }
  }

  /**
   * update data in database (update)
   * @param {object} object data to update
   */
  async update(object) {
    try {
      const { id } = object;
      await this.db(this.table).where({ id }).update(object);

      return response(true, object);
    } catch (error) {
      return response(false, null, error);
    }
  }

  /**
   * remove row in database (delete)
   * @param {string | number} id row id to remove
   */
  async destroy(id) {
    try {
      await this.db(this.table).where({ id }).del();

      return response(true, {});
    } catch (error) {
      return response(false, null, error);
    }
  }

  /**
   * remove (logical exclusion) row in database (soft delete)
   * @param {object} object id to update the deleted_At of the row
   */
  async delete(object) {
    try {
      const { id } = object;
      Object.assign(object, { deletedAt: new Date().toLocaleString() });
      await this.db(this.table).where({ id }).update(object);

      return response(true, object);
    } catch (error) {
      return response(false, null, error);
    }
  }
};
