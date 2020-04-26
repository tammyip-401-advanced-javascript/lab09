'use strict';

class Model {
  constructor(schema) {
    this.schema = schema;
  }

  create(record) {
    const newRecord = new this.schema(record);
    return newRecord.save();
  }

  // verify that id is a valid id
  // findOne with that id
  async read(_id) {
    let record = await this.schema.findOne({ _id });
    // record = await record.populate();
    // console.log('Full Category', record.fullCategory);
    // console.log('Full String', record.fullString);

    // record.fullString = 'changed';
    // console.log('Full String after Change', record.fullString);
    return record;
  }

  async readByQuery(query) {
    let results = await this.schema.find(query);
    return results;
  }

  async update(_id, data) {
    let updateInfo = await this.schema.updateOne({ _id }, data);
    if (updateInfo && updateInfo.nModified === 1) {
      let record = await this.read(_id);
      return record;
    }
    return false;
  }

  async delete(_id) {
    let deleteInfo = await this.schema.deleteOne({ _id });
    if (deleteInfo.deletedCount === 1) {
      return true;
    }
    return false;
  }
}

module.exports = Model;