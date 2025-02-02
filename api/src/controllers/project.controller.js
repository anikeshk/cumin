const rds = require('../db/rds');

const ProjectController = {
  async createProject(req, res) {
    try {
      const { userid } = req.user;
      const { name, description } = req.body;
      const rows = await rds.query(
        'INSERT INTO projects (name, description, created_by) VALUES ($1, $2, $3) RETURNING *',
        [name, description, userid]
      );
      // insert into project count table
      res.status(201).json({ message: 'Project created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async getProjects(req, res) {
    try {
      const { rows } = await rds.query('SELECT * FROM projects');
      res.status(200).json({ projects: rows });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async updateProject(req, res) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      await rds.query('UPDATE projects SET name = $1, description = $2 WHERE id = $3', [
        name,
        description,
        id,
      ]);
      res.status(200).json({ message: 'Project updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async deleteProject(req, res) {
    try {
      const { id } = req.params;
      await rds.query('DELETE FROM projects WHERE id = $1', [id]);
      res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = ProjectController;
