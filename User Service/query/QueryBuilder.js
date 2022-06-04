class AbstractQueryBuilder {
  constructor(table = "") {
    this.table = table;
  }

  insert(info) {
    let keys = "";
    let values = "";
    for (var key in info) {
      if (info.hasOwnProperty(key)) {
        keys += keys.length > 0 ? "," + key : key;
        values += (values.length > 0 ? "," : "") + "'" + info[key] + "'";
      }
    }
    return `INSERT INTO ${this.table} (${keys}) VALUES (${values})`;
  }

  findById(id, project = "*") {
    return `SELECT ${project} FROM ${this.table} WHERE id = ${id}`;
  }

  find(project = "*") {
    return `SELECT ${project} FROM ${this.table}`;
  }

  update(id, info) {
    let updateOn = "";
    for (var key in info) {
      if (info.hasOwnProperty(key)) {
        updateOn += (updateOn.length > 0 ? "," : "") + `${key}='${info[key]}'`;
      }
    }
    return `UPDATE ${this.table} SET ${updateOn} WHERE id = ${id}`;
  }
}

class CustomerQueryBuilder extends AbstractQueryBuilder {
  constructor() {
    super("customer");
  }
}

module.exports = {
  customerQuery: new CustomerQueryBuilder(),
};
