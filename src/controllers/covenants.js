/* CONVÊNIOS */
class CovenantsController {
  constructor(Covenant) {
    this.Covenant = Covenant;
  }

  async get(req, res) {
    try {
      const covenants = await this.Covenant.find({});
      res.send(covenants);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  async getById(req, res) {
    const {
      params: { id }
    } = req;

    try {
      const covenant = await this.Covenant.find({ _id: id });
      res.send(covenant);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  async create(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send({ error: 'Informe o nome do Convênio!' });
    }
    
    const covenant = new this.Covenant(req.body);
    
    try {
      if (await this.Covenant.findOne({ name })) {
        return res.status(400).send({ error: 'Convênio já cadastrado!'});
      }
      
      covenant.created = Date.now();

      await covenant.save();
    
      res.status(201).send({ covenant });
    } catch (err) {
      res.status(422).send(err.message);
    }
  }

  async update(req, res) {
    const body = req.body;

    try {
      const covenant = await this.Covenant.findById(req.params.id);

      covenant.name = body.name;
      covenant.updated = Date.now();

      await covenant.save();

      res.sendStatus(200);
    } catch (err) {
      res.status(422).send(err.message);
    }
  }

  async remove(req, res) {
    try {
      await this.Covenant.deleteOne({ _id: req.params.id });
      res.sendStatus(204);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
}

export default CovenantsController;
