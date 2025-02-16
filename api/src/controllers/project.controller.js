const rds = require('../db/rds');

const ProjectController = {
  async createProject(req, res) {
    try {
      const { user_id } = req.user;
      const { name, description } = req.body;
      const { rows } = await rds.query(
        'INSERT INTO projects (name, description, created_by) VALUES ($1, $2, $3) RETURNING *',
        [name, description, user_id]
      );
      let project = {
        id: rows[0].id.toString(),
        name: rows[0].name,
        description: rows[0].description,
        todoCount: rows[0].todoCount,
        inProgressCount: rows[0].inProgressCount,
        doneCount: rows[0].doneCount,
      };
      res.status(201).json({ project });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async getProjects(req, res) {
    try {
      const { rows } = await rds.query('SELECT * FROM projects');
      let projects = [];
      if (rows.length > 0) {
        projects = rows.map((project) => {
          return {
            id: project.id.toString(),
            name: project.name,
            description: project.description,
            todoCount: project.todoCount,
            inProgressCount: project.inProgressCount,
            doneCount: project.doneCount,
          };
        });
      }
      res.status(200).json({ projects });
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
