const pool = require('../config/db.config');

class TopkModel {

    async create(place, name, photo_link, rate, film_link, description) {
        const query = await pool.query('INSERT INTO topk (place, name, photo_link, rate, film_link, description)' +
            ' VALUES ($1, $2, $3, $4, $5, $6) RETURNING id', [place, name, photo_link, rate, film_link, description]);
        return query.rows[0].id;
    }

    async getAllFilm(pageSize, offset) {
        const query = await pool.query('SELECT * FROM topk ORDER BY place ASC LIMIT $1 OFFSET $2;',
            [pageSize, offset]);
        return query.rows;
    }

    async getOneFilm(film_id) {
        const query = await pool.query('SELECT * FROM topk where id = $1;',
            [film_id]);
        return query.rows[0];
    }

    async update(id, place, name, photo_link, rate, film_link, description) {
        let query = 'update topk set place = $1, name = $2, photo_link = $3, rate = $4,' +
            ' film_link = $5, description = $6 where id = $7;';
        await pool.query(query, [place, name, photo_link, rate, film_link, description, id]);

        return 'OK';
    }

    async delete(id) {
        let query = 'delete from topk where id = $1;';
        await pool.query(query, [id]);

        return 'OK';
    }

}

module.exports = new TopkModel();