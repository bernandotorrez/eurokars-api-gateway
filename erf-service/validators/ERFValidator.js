const Joi = require('@hapi/joi');
const BadRequestError = require('../exceptions/BadRequestError');

const AddERFSchema = Joi.object({
    id_erf: Joi.string().max(50).required(),
    date: Joi.date(),
    id_user: Joi.number().required(),
    id_position: Joi.number().required(),
    id_company: Joi.number().required(),
    report_to: Joi.string().max(100).required(),
    id_dept: Joi.number().required(),
    sub_ordinate: Joi.string().max(100).required(),
    id_branch: Joi.number().required(),
    head_count: Joi.number().required(),
    status_employee: Joi.string().valid('P', 'C', 'O', 'I').required(),
    duration: Joi.string().max(25),
    contract: Joi.string(),
    status_employee_remarks: Joi.string(),
    reason_to_hire: Joi.string().valid('B', 'NB').required(),
    employee_name: Joi.string().max(100).required(),
    sex: Joi.string().valid('M', 'F').required(),
    due_to_reason: Joi.string(),
    source_hire: Joi.string().valid('I', 'A').required(),
    id_education_background: Joi.number().required(),
    id_bank: Joi.number().required(),
    id_det_com: Joi.number().required(),
    key_competency: Joi.string().required(),
    salary_budget_start: Joi.string().max(50).required(),
    salary_budget_end: Joi.string().max(50).required(),
    expected_join_date: Joi.date().required(),
    expected_join_date_remarks: Joi.string(),
    request_by: Joi.string().max(100).required(),
    approved_by: Joi.string().max(100).required(),
    acknowledge_by: Joi.string().max(100).required(),
    education_background_other: Joi.string().max(50),
    email_user: Joi.string().max(100).required(),
    email_head: Joi.string().max(100).required(),
    email_cc: Joi.string().max(100).required(),
    email_dir_hr: Joi.string().max(100).required(),
})

const UpdateERFSchema = Joi.object({
    date: Joi.date(),
    id_user: Joi.number().required(),
    id_position: Joi.number().required(),
    id_company: Joi.number().required(),
    report_to: Joi.string().max(100).required(),
    id_dept: Joi.number().required(),
    sub_ordinate: Joi.string().max(100).required(),
    id_branch: Joi.number().required(),
    head_count: Joi.number().required(),
    status_employee: Joi.string().valid('P', 'C', 'O', 'I').required(),
    duration: Joi.string().max(25),
    contract: Joi.string(),
    status_employee_remarks: Joi.string(),
    reason_to_hire: Joi.string().valid('B', 'NB').required(),
    employee_name: Joi.string().max(100).required(),
    sex: Joi.string().valid('M', 'F').required(),
    due_to_reason: Joi.string(),
    source_hire: Joi.string().valid('I', 'A').required(),
    id_education_background: Joi.number().required(),
    id_bank: Joi.number().required(),
    id_det_com: Joi.number().required(),
    key_competency: Joi.string().required(),
    salary_budget_start: Joi.string().max(50).required(),
    salary_budget_end: Joi.string().max(50).required(),
    expected_join_date: Joi.date().required(),
    expected_join_date_remarks: Joi.string(),
    request_by: Joi.string().max(100).required(),
    approved_by: Joi.string().max(100).required(),
    acknowledge_by: Joi.string().max(100).required(),
    education_background_other: Joi.string().max(50),
    email_user: Joi.string().max(100).required(),
    email_head: Joi.string().max(100).required(),
    email_cc: Joi.string().max(100).required(),
    email_dir_hr: Joi.string().max(100).required(),
})

const AddERFValidator = (payload) => {
    const validationResult = AddERFSchema.validate(payload);

    if(validationResult.error) {
        throw new BadRequestError(validationResult.error.message);
    }
}

const UpdateERFValidator = (payload) => {
    const validationResult = UpdateERFSchema.validate(payload);

    if(validationResult.error) {
        throw new BadRequestError(validationResult.error.message);
    }
}

module.exports = {
    AddERFValidator,
    UpdateERFValidator
}