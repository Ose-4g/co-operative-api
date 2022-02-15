'use strict';
const { DataTypes } = require('sequelize');
const {DATE} = require('sequelize')
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('balls',{
      id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    radius:{
        type: DataTypes.STRING
    },
    brand:{
        type: DataTypes.STRING
    },
    sport:{
        type: DataTypes.STRING
    },
    createdAt:DATE,
    updatedAt: DATE
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('balls')
  }
};
