import { pool } from '../db.js'

export const getEmployes = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM employes')
    res.send(rows)
  } catch (error) {
    return res.status(500).json({ message: 'Algo salio mal' })
  }
}

export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params
    const [rows] = await pool.query('SELECT * FROM employes WHERE id=?', [id])
    if (rows.length <= 0) return res.status(404).json({ message: 'Employee not found' })
    res.json(rows[0])
  } catch (error) {
    return res.status(500).json({ message: 'Algo salio mal' })
  }
}

export const createEmployee = async (req, res) => {
  try {
    const { name, salary } = req.body
    const [rows] = await pool.query('INSERT INTO employes(name, salary) VALUES (?,?)', [name, salary])
    res.send({
      id: rows.insertId,
      name,
      salary
    })
  } catch (error) {
    return res.status(500).json({ message: 'Algo salio mal' })
  }
}

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params
    const { name, salary } = req.body
    const [result] = await pool.query('UPDATE employes SET name= IFNULL(?, name), salary= IFNULL(?, salary) WHERE id=?', [name, salary, id])
    if (result.affectedRows <= 0) return res.status(404).send('Employee not found')
    const [rows] = await pool.query('SELECT * FROM employes WHERE id=?', [id])
    res.json(rows[0])
  } catch (error) {
    return res.status(500).json({ message: 'Algo salio mal' })
  }
}

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params
    const [result] = await pool.query('DELETE FROM employes WHERE id=?', [id])
    if (result.affectedRows <= 0) return res.status(404).send('Employee not found')
    res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({ message: 'Algo salio mal' })
  }
}
