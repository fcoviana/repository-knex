const { response } = require("./utils/response");

module.exports = class Repository {
  constructor({ connection, table, entity }) {
    this.connection = connection;
    this.table = table;
    this.entity = entity;
  }

  /**
   * Find One Knex Where formatted with repository entity
   * @param {object} where Knex Where
   * @return {response}
   */
  async findWhere(where) {
    try {
      const [foundItem] = await this.connection(this.table).where(where);
      const formattedItem = new this.entity(foundItem);

      return response({ success: true, data: formattedItem });
    } catch (error) {
      return response({ error: true, data: error });
    }
  }

  /**
   * Fetch all results
   * @return {response}
   */
  async fetchAll() {
    try {
      const data = await this.connection(this.table);

      return response({ success: true, data });
    } catch (error) {
      return response({ error: true, data: error });
    }
  }

  /**
   * create object in database (insert)
   * @param {object} object data to insert
   * @return {response}
   */
  async create(object) {
    try {
      await this.connection(this.table).insert(object);

      return response({ success: true, data: object });
    } catch (error) {
      return response({ error: true, data: error });
    }
  }

  /**
   * update data in database (update)
   * @param {object} object data to update
   * @return {response}
   */
  async update(object) {
    try {
      const { id } = object;
      await this.connection(this.table).where({ id }).update(object);

      return response({ success: true, data: object });
    } catch (error) {
      return response({ error: true, data: error });
    }
  }

  /**
   * remove row in database (delete)
   * @param {string | number} id row id to remove
   * @return {response}
   */
  async destroy(id) {
    try {
      await this.connection(this.table).where({ id }).del();

      return response({ success: true, data: {} });
    } catch (error) {
      return response({ error: true, data: error });
    }
  }

  /**
   * remove (logical exclusion) row in database (soft delete)
   * @param {object} object id to update the deleted_At of the row
   * @return {response}
   */
  async delete(object) {
    try {
      const { id } = object;
      Object.assign(object, { deletedAt: new Date().toLocaleString() });
      await this.connection(this.table).where({ id }).update(object);

      return response({ success: true, data: object });
    } catch (error) {
      return response({ error: true, data: error });
    }
  }
};
