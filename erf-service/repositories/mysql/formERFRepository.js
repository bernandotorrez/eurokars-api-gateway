const { FormERF } = require('../../models');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { Op, QueryTypes } = require('sequelize');
const globalFunction = require('../../utils/globalFunction');

class FormERFRepository {
    constructor() {
        this._model = FormERF;
    }

    async getERFs() {
        return await this._model.sequelize.query('select * from qv_form_erf where status = "1"', {
            type: QueryTypes.SELECT
        })
    }

    async getERFDropdown() {
        return await this._model.sequelize.query('select id_erf from qv_form_erf where status = "1"', {
            type: QueryTypes.SELECT
        })
    }

    async getERF({ id = '' }) {
        if(id == '') {
            throw new InvariantError('ID not provided');
        }

        const data = await this._model.sequelize.query('select * from qv_form_erf where id_erf = $id_erf', {
            type: QueryTypes.SELECT,
            bind: { id_erf: id }
        })

        if(!data) {
            throw new NotFoundError('ERF not found');
        }

        return data;
    }

    async addERF(params) {
        const data = {
            id_erf: params.id_erf,
            date: globalFunction.current_date(),
            id_user: params.id_user,
            id_position: params.id_position,
            id_company: params.id_company,
            report_to: params.report_to,
            id_dept: params.id_dept,
            sub_ordinate: params.sub_ordinate,
            id_branch: params.id_branch,
            head_count: params.head_count,
            status_employee: params.status_employee,
            duration: params.duration,
            contract: params.contract,
            status_employee_remarks: params.status_employee_remarks,
            reason_to_hire: params.reason_to_hire,
            employee_name: params.employee_name,
            sex: params.sex,
            due_to_reason: params.due_to_reason,
            source_hire: params.source_hire,
            id_education_background: params.id_education_background,
            id_bank: params.id_bank,
            id_det_com: params.id_det_com,
            key_competency: params.key_competency,
            salary_budget_start: globalFunction.remove_number_format(params.salary_budget_start),
            salary_budget_end: globalFunction.remove_number_format(params.salary_budget_end),
            expected_join_date: globalFunction.check_date(params.expected_join_date),
            expected_join_date_remarks: params.expected_join_date_remarks,
            request_by: params.request_by,
            approved_by: params.approved_by,
            acknowledge_by: params.acknowledge_by,
            education_background_other: params.education_background_other,
            email_user: params.email_user,
            email_head: params.email_head,
            email_cc: params.email_cc,
            email_dir_hr: params.email_dir_hr,
        }

        const check = await this._model.findOne({ where: { id_erf: params.id_erf } })

        if(check) {
            throw new InvariantError('ID ERF Already Exist!')
        }

        try {
            return await this._model.create(data)
        } catch (error) {
            throw new InvariantError('Add ERF Failed');
        }
    }

    async updateERF({ id, params }) {
        if(id === '') {
            throw new InvariantError('ID not Provided');
        }

        const erf = await this._model.findOne({ where: { id_erf: id }});
        if(!erf) {
            throw new NotFoundError('ERF not found');
        }

        const data = {
            date: globalFunction.current_date(),
            id_user: params.id_user,
            id_position: params.id_position,
            id_company: params.id_company,
            report_to: params.report_to,
            id_dept: params.id_dept,
            sub_ordinate: params.sub_ordinate,
            id_branch: params.id_branch,
            head_count: params.head_count,
            status_employee: params.status_employee,
            duration: params.duration,
            contract: params.contract,
            status_employee_remarks: params.status_employee_remarks,
            reason_to_hire: params.reason_to_hire,
            employee_name: params.employee_name,
            sex: params.sex,
            due_to_reason: params.due_to_reason,
            source_hire: params.source_hire,
            id_education_background: params.id_education_background,
            id_bank: params.id_bank,
            id_det_com: params.id_det_com,
            key_competency: params.key_competency,
            salary_budget_start: globalFunction.remove_number_format(params.salary_budget_start),
            salary_budget_end: globalFunction.remove_number_format(params.salary_budget_end),
            expected_join_date: globalFunction.check_date(params.expected_join_date),
            expected_join_date_remarks: params.expected_join_date_remarks,
            request_by: params.request_by,
            approved_by: params.approved_by,
            acknowledge_by: params.acknowledge_by,
            education_background_other: params.education_background_other,
            email_user: params.email_user,
            email_head: params.email_head,
            email_cc: params.email_cc,
            email_dir_hr: params.email_dir_hr,
        }
        
        try {
            return await this._model.update(data, { where: { id_erf: id } })
        } catch (error) {
            throw new InvariantError('Update ERF Failed');
        }
    }

    async deleteERF({ id }) {
        if(id === '') {
            throw new InvariantError('ID not Provided');
        }

        const erf = await this._model.findOne({ where: { id_erf: id }});
        if(!erf) {
            throw new NotFoundError('ERF not found');
        }

        const data = {
            status: '0'
        }
        
        try {
            return this._model.update(data, { where: { id_erf: id } })
        } catch (error) {
            throw new InvariantError('Delete ERF Failed');
        }
    }
}

module.exports = FormERFRepository;