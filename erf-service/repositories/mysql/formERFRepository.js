const { FormERF } = require('../../models');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { Op, QueryTypes } = require('sequelize');

class FormERFRepository {
    constructor() {
        this._model = FormERF;
    }

    async getAll() {
        return await this._model.sequelize.query('select * from qv_form_erf', {
            type: QueryTypes.SELECT
        })
    }

    async getById({ id = '' }) {
        if(id == '') {
            throw new InvariantError('ID not provided');
        }

        const data = this._model.sequelize.query('select * from qv_form_erf where id_erf = $id_erf', {
            type: QueryTypes.SELECT,
            bind: { id_erf: id }
        })

        if(!data) {
            throw new NotFoundError('ERF not found');
        }

        return data;
    }

    // async addTask(params) {
    //     const data = {
    //         task: params.task
    //     }

    //     try {
    //         return this._model.create(data)
    //     } catch (error) {
    //         throw new InvariantError('Add Task Failed');
    //     }
    // }

    // async updateTask({ id, body }) {
    //     if(id === '') {
    //         throw new InvariantError('ID not Provided');
    //     }

    //     const task = await this._model.findOne({ where: { id: id }});
    //     if(!task) {
    //         throw new NotFoundError('Task not found');
    //     }

    //     const data = {
    //         task: body.task,
    //         status: body.status
    //     }
        
    //     try {
    //         return this._model.update(data, { where: { id: id } })
    //     } catch (error) {
    //         throw new InvariantError('Update Task Failed');
    //     }
    // }

    // async deleteTask({ id }) {
    //     if(id === '') {
    //         throw new InvariantError('ID not Provided');
    //     }

    //     const task = await this._model.findOne({ where: { id: id }});
    //     if(!task) {
    //         throw new NotFoundError('Task not found');
    //     }
        
    //     try {
    //         return this._model.destroy({ where: { id: id } })
    //     } catch (error) {
    //         throw new InvariantError('Delete Task Failed');
    //     }
    // }
}

module.exports = FormERFRepository;