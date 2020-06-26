import * as  sendmail from '../services/sendmail';

class UsersController {
  constructor(User, AuthService) {
    this.User = User
    this.AuthService = AuthService
  }

  async get(req, res) {
    try {
      const users = await this.User.find({})
      res.send(users)
    } catch (err) {
      res.status(400).send(err.message)
    }
  }

  async getById(req, res) {
    const {
      params: { id }
    } = req

    try {
      const user = await this.User.find({ _id: id })
      res.send(user)
    } catch (err) {
      res.status(400).send(err.message)
    }
  }

  async checkEmailExist(req, res) {
    const email = req.body.email

    if (!email) {
      return res.status(400).send({ error: 'Dados insuficientes!' })
    }

    if (await this.User.findOne({ email: email })) {
      return res.status(200).send({ error: 'Usuário JÁ registrado!'}) 
    } else {
      res.status(404).send({ error: 'Usuário NÃO registrado!'})
    }
  }

  async create(req, res) {
    const { email, password } = req.body.user

    if (!email || !password) {
      return res.status(400).send({ error: 'Dados insuficientes!' })
    }
    
    const user = new this.User(req.body.user)
    
    try {
      if (await this.User.findOne({ email })) {
        return res.status(400).send({ error: 'Usuário já registrado!'})
      }
      
      user.created = Date.now()

      await user.save()

      const token = this.AuthService.generateToken({
        name: user.name,
        email: user.email,
        password: user.password
        // role: user.role
      })
      
      user.password = undefined
    
      res.status(201).send({ user, token: token })

    } catch (err) {
      res.status(422).send(err.message)
    }
  }

  async update(req, res) {
    const body = req.body

    try {
      const user = await this.User.findById(req.params.id)

      user.name = body.name
      user.email = body.email
      user.role = body.role
      user.updated = Date.now()

      if (body.password) {
        user.password = body.password
      }

      await user.save()

      res.sendStatus(200)
    } catch (err) {
      res.status(422).send(err.message)
    }
  }

  async remove(req, res) {
    try {
      await this.User.deleteOne({ _id: req.params.id })
      res.sendStatus(204)
    } catch (err) {
      res.status(400).send(err.message)
    }
  }

  async authenticate(req, res) {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).send({ error: 'Dados insuficientes!' })
    }

    try {
      const authService = new this.AuthService(this.User)
      const user = await authService.authenticate(req.body)
  
      const token = this.AuthService.generateToken({
        name: user.name,
        email: user.email,
        password: user.password
        // role: user.role
      })

      user.password = undefined
  
      return res.send({ user, token: token })
    }
    catch (err) {
      return res.status(401).send({ error: 'Usuário não cadastrado!' })
    }
  }

  async recoveryPassword(req, res) {
    const email = req.body.email

    if (!email) {
      return res.status(400).send({ error: 'Dados insuficientes!' })
    }

    const user = await this.User.findOne({ email: email })

    if (user) {
      try {
        const params = { 
          name: user.name,
          username: user.email,
          tokenUrl: '7M[Q6pVN^7[$j."df%_;}p!So=)t<L'
        }

        sendmail.configSendMail('resetPassword', email, 'Recuperar Senha', params)
        return res.status(201).send({ message: 'Senha enviada com sucesso!'})
      } catch (error) {
        return res.status(201).send({ message: 'Erro ao enviar o email' }) 
      }
    } else {
      res.status(404).send({ error: 'Usuário NÃO registrado!'})
    }
  }
}

export default UsersController
