
exports.up = function(knex, Promise) {
    return knex.schema.createTable("cluckr", t => {
        t.increments("id");
        t.string("username");
        t.text("content");
        t.string("image_url");
        t.timestamp("created_at").defaultTo(knex.fn.now());
        t.timestamp("updated_at").defaultTo(knex.fn.now());
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("cluckr");
};
