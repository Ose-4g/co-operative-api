'use strict';
const { DataTypes } = require('sequelize');
const {DATE} = require('sequelize')

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable('groups', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(30),
        unique: true,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(200),
      },
      visibility: {
        type: DataTypes.ENUM('private', 'public'),
        defaultValue: 'public',
        allowNull: false,
      },
      maxCapacity: {
        type: DataTypes.INTEGER,
        defaultValue: 20,
        allowNull: false,
      },
      weeklyContribution: {
        type: DataTypes.INTEGER,
        defaultValue: 1000,
        allowNull: false,
      },
      createdAt:DATE,
      updatedAt: DATE
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('groups')
  }
};
