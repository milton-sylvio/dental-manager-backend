'use strict'

class PatientsController {
  constructor(Patient) {
    this.Patient = Patient;
    this.perPage = 8;
  }

  loadEnumValues(req, res) {
    // console.log("this.Patient.schema.path('identification').enumValues", this.Patient.schema.path('identification').enumValues)

    try {  
      res.send({      
        identification: this.Patient.schema.path('identification').enumValues,
        marital: this.Patient.schema.path('marital_status').enumValues,
        gender: this.Patient.schema.path('gender').enumValues
      });
    } catch (err) {
      res.status(400).send({ error: 'Falah ao trazer os ENUMS!' });
    }
  }

  async get(req, res) {
    try {
      const allPatients = await this.Patient.find();
      const currentPage = (req.query.page) || 1;
      const ordered = req.query.ordered ? {sort: req.query.ordered} : null;
      let filtered = {}

      if (req.query.filtered) {
        let request = req.query.filtered.split(',');
        let params;
        let field;
        let conditions = {};

        request.forEach(r => {
          params = r.split(':');
          field = params[0];
          conditions[field] = params[1];
        });

        filtered = JSON.parse(JSON.stringify(conditions))
      }

      let patients = await this.Patient.find(filtered, null, ordered)            
      .skip(this.perPage * (currentPage - 1)) // we will not retrieve all records, but will skip first 'n' records
      .limit(this.perPage); // will limit/restrict the number of records to display

      let countPatients = await this.Patient.countDocuments(filtered);
            
      res.send({
        patients: patients,
        current_page: currentPage,
        per_page: this.perPage,
        next_page_url: currentPage + 1,
        all: allPatients,
        total: countPatients
      });
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  async search(req, res) {
    const {
      params: { q }
    } = req;

    if (!q || q === '') {
      return
    }
    
    try {
      const query = new RegExp(q, 'i')
      let conditions = {
        $or: [
          { 'name': query },
          { 'email': query },
          { 'phone': query },
          { 'cell_phone': query }
        ]
      }

      const patient = await this.Patient.find(conditions)

      res.send({
        patients: patient,
        total: patient.length
      });
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  async getById(req, res) {
    const {
      params: { id }
    } = req;

    try {
      const patient = await this.Patient.find({ _id: id });
      res.send(patient);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  async create(req, res) {
    const { email, name, marital_status } = req.body;

    if (!email || !name) {
      return res.status(400).send({ error: 'Dados insuficientes!' });
    }

    const patient = new this.Patient(req.body);
    
    try {
      if (await this.Patient.findOne({ email })) {
        return res.status(400).send({ error: 'Usuário já registrado!' });
      }

      if (!marital_status) {
        patient.marital_status = this.Patient.schema.path('marital_status').options.default;
      }
      
      patient.created = Date.now();

      await patient.save();
    
      res.status(201).send({ patient });
    } catch (err) {
      res.status(422).send(err.message);
    }
  }

  async update(req, res) {
    try {
      await this.Patient.updateOne({ _id: req.params.id }, req.body);
      res.sendStatus(200);
    } catch (err) {
      res.status(422).send(err.message);
    }
  }

  async remove(req, res) {
    try {
      await this.Patient.deleteOne({ _id: req.params.id });
      res.sendStatus(204);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
}

export default PatientsController;
