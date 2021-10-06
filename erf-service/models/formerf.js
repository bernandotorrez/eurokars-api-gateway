'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FormERF extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  FormERF.init({
    id_erf: {
      type: DataTypes.STRING(25),
      primaryKey: true,
    },
    date: DataTypes.DATE,
    id_position: DataTypes.INTEGER(11),
    id_company: DataTypes.INTEGER(11),
    report_to: DataTypes.STRING(100),
    id_dept: DataTypes.INTEGER(11),
    sub_ordinate: DataTypes.STRING(100),
    id_branch: DataTypes.INTEGER(11),
    id_education_background: DataTypes.INTEGER(11),
    id_bank: DataTypes.INTEGER(11),
    id_det_com: DataTypes.INTEGER(11),
    head_count: DataTypes.INTEGER(3),
    status_employee: DataTypes.ENUM('P','C','O','I'),
    duration: DataTypes.STRING(50),
    contract: DataTypes.INTEGER(2),
    status_employee_remarks: DataTypes.TEXT,
    reason_to_hire: DataTypes.ENUM('B', 'NB'),
    employee_name: DataTypes.STRING(100),
    due_to_reason: DataTypes.TEXT,
    sex: DataTypes.ENUM('M', 'F'),
    source_hire: DataTypes.ENUM('I', 'A'),
    key_competency: DataTypes.TEXT,
    education_background_other: DataTypes.STRING(50),
    salary_budget_start: DataTypes.STRING(50),
    salary_budget_end: DataTypes.STRING(50),
    expected_join_date: DataTypes.DATE,
    expected_join_date_remarks: DataTypes.TEXT,
    email_user: DataTypes.STRING(100),
    email_head: DataTypes.STRING(100),
    email_cc: DataTypes.STRING(100),
    email_dir_hr: DataTypes.STRING(100),
    request_by: DataTypes.STRING(100),
    approved_by: DataTypes.STRING(100),
    acknowledge_by: DataTypes.STRING(100),
    acknowledge_by: DataTypes.STRING(100),
    flag_send: DataTypes.ENUM('0', '1'),
    date_send: DataTypes.DATE,
    flag_approve_head: DataTypes.ENUM('0', '1'),
    date_approve_head: DataTypes.DATE,
    date_reject_head: DataTypes.DATE,
    flag_approve_dir_hr: DataTypes.ENUM('0', '1'),
    date_approve_dir_hr: DataTypes.DATE,
    date_reject_dir_hr: DataTypes.DATE,
    id_user: DataTypes.INTEGER(11),
    remark_reject: DataTypes.TEXT,
    date_cancel: DataTypes.DATE,
    flag_print: DataTypes.ENUM('0', '1'),
    date_print: DataTypes.DATE,
    date_print: DataTypes.DATE,
    status: DataTypes.ENUM('0', '1'),
  }, {
    sequelize,
    modelName: 'FormERF',
    tableName: 'tbl_form_erf',
    timestamps: false,
    underscored: true
  });
  return FormERF;
};