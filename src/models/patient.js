import mongoose from 'mongoose';

const PatientSchema = new mongoose.Schema({
  identification: {
    type: String,
    enum: ['', 'Dr.', 'Dra.', 'Sr.', 'Sra.', 'Srta.']
  }, // Indentficação (Saudação)
  register: String, // Número de Registro (pode conter nros, letras e caracteres especiais)
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: [4, 'Nome muito curto!']
  },
  avatar: Buffer,
  gender: {
    type: String,
    enum: ['Masculino', 'Feminino']
  },
  cpf: String,
  birthday: Date,
  obs: String,

  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  cell_phone: {
    type: String,
    required: true
  },
  phone: String,
  commercial_phone: String,
  message_phone: String, // Telefone de Recado
  message_name: String, // Nome para Recado

  zip_code: {
    required: true,
    type: String
  },
  address: {
    required: true,
    type: String
  },
  address_number: Number,
  complement: String,
  neighborhood: String,
  city: String,
  state: String, // UF

  rg: String,
  nationality: String,
  naturalness_city: String,
  naturalness_state: String,
  schooling: String,
  marital_status: {
    type: String,
    enum: ['Casado', 'Solteiro', 'Divorciado', 'Viuvo'],
    default: 'Solteiro'
  }, // Estado civil
  religion: String,
  profession: String, // Profissão
  status: {
    type: Boolean,
    default: true
  },

  covenant_id: Number,
  covenant: {
    type: Boolean,
    default: false
  },
  covenant_name: String,
  covenant_plans: String,
  covenant_card_number: String,
  covenant_card_validate: String,
  covenant_ownership: String,

  // indication: String, 
  start_treatment: Date,
  end_treatment: Date,
  
  created: Date,
  updated: Date
});

PatientSchema.index({ name: 'text', email: 'text', cell_phone: 'text', phone: 'text'  });

PatientSchema.set('toJSON', {
  transform: (doc, ret) => ({
    _id: ret._id,
    identification: ret.identification,
    register: ret.register,
    name: ret.name,
    avatar: ret.avatar,
    gender: ret.gender,
    cpf: ret.cpf,
    birthday: ret.birthday,
    obs: ret.obs,

    email: ret.email,
    cell_phone: ret.cell_phone,
    phone: ret.phone,
    commercial_phone: ret.commercial_phone,
    message_phone: ret.message_phone,
    message_name: ret.message_name,

    zip_code: ret.zip_code,
    address: ret.address,
    address_number: ret.address_number,
    complement: ret.complement,
    neighborhood: ret.neighborhood,
    city: ret.city,
    state: ret.state,
    
    rg: ret.rg,
    nationality: ret.nationality,
    naturalness_city: ret.naturalness_city,
    naturalness_state: ret.naturalness_state,
    schooling: ret.schooling,
    marital_status: ret.marital_status,
    profession: ret.profession,
    // religion: ret.religion,
    status: ret.status,
    
    covenant_id: ret.covenant_id,
    covenant: ret.covenant,
    covenant_name: ret.covenant_name,
    covenant_plans: ret.covenant_plans,
    covenant_card_number: ret.covenant_card_number,
    covenant_card_validate: ret.covenant_card_validate,
    covenant_ownership: ret.covenant_ownership,

    indication: ret.indication,
    
    start_treatment: ret.start_treatment,
    end_treatment: ret.end_treatment,

    created: ret.created,
    updated: ret.updated
  })
});

PatientSchema.index({ name: 'text' });

const Patient = mongoose.model('Patient', PatientSchema);

export default Patient;
