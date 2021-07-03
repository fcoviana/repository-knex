const Repository = require("../src/repository");
const knex = require("./__mocks__/knex");

class SutEntitySpy {
  constructor(data) {
    this.data = data;
  }
}

const makeSut = () => {
  const sut = new Repository({
    db: knex,
    table: "any_table",
    entity: new SutEntitySpy({}),
  });

  const data = {
    name: "any-name",
  };

  return { sut, data };
};

describe("Repository", () => {
  const { sut, data } = makeSut();
  jest.spyOn(sut, sut.create.name);
  jest.spyOn(sut, sut.fetchAll.name);
  jest.spyOn(sut, sut.findWhere.name);
  jest.spyOn(sut, sut.update.name);
  jest.spyOn(sut, sut.delete.name);
  jest.spyOn(sut, sut.destroy.name);

  test("Should call create", async () => {
    await sut.create(data);

    expect(sut.create).toHaveBeenCalled();
    expect(sut.create).toHaveBeenCalledTimes(1);
    expect(sut.create).toHaveBeenCalledWith(data);
  });

  test("Should call fetchAll", async () => {
    await sut.fetchAll();

    expect(sut.fetchAll).toHaveBeenCalled();
    expect(sut.fetchAll).toHaveBeenCalledTimes(1);
  });

  test("Should call findWhere", async () => {
    await sut.findWhere();

    expect(sut.findWhere).toHaveBeenCalled();
    expect(sut.findWhere).toHaveBeenCalledTimes(1);
  });

  test("Should call update", async () => {
    await sut.update(data);

    expect(sut.update).toHaveBeenCalled();
    expect(sut.update).toHaveBeenCalledTimes(1);
    expect(sut.update).toHaveBeenCalledWith(data);
  });

  test("Should call delete", async () => {
    await sut.delete(data);

    expect(sut.delete).toHaveBeenCalled();
    expect(sut.delete).toHaveBeenCalledTimes(1);
    expect(sut.delete).toHaveBeenCalledWith(data);
  });

  test("Should call destroy", async () => {
    await sut.destroy('any-id');

    expect(sut.destroy).toHaveBeenCalled();
    expect(sut.destroy).toHaveBeenCalledTimes(1);
  });
});
