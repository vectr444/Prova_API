const cors = require('cors')
const express = require('express');
const server = express();

let usuarios = []
let produtos = []

server.use(express.json())
server.use(cors())

server.get('/',(req, res) => {
  res.json({ mensagem: 'localhost:3000'})
});

/*********************ENDPOINTS USUARIOS********************* */ 
server.get('/users', (req, res) => {
  res.json(usuarios);
});

server.get('/users/:id', (req, res) => {
  const id = req.params.id;
  let idExiste = usuarios.find(idUsr => idUsr.id == id)

  if(idExiste == null){
    return res.status(404).json({ mensagem: 'Usuário não encontrado' });
  }
  res.json(idExiste);
});

server.post('/users', (req, res) => {
  const nome = req.body.name;
  const cpf = req.body.cpf;
  const email = req.body.email;

  if (nome != null ){
    if (nome.length < 3){
      return res.status(404).json({ mensagem: 'Nome deve conter no mínimo 3 caracteres' });
    }
    if (nome.length > 150){
      return res.status(404).json({ mensagem: 'Nome deve conter no máximo 150 caracteres' });
    }
  }
  else {
    return res.status(404).json({ mensagem: 'Nome não informado' });
  }

  if (cpf != null ){
    if (cpf.length < 11 || cpf.length > 11){
      return res.status(404).json({ mensagem: 'Cpf deve conter 11 caracteres' });
    }
    if (isNaN(Number(cpf))){
      return res.status(404).json({ mensagem: 'Cpf deve conter apenas números' });
    }
  }
  else {
    return res.status(404).json({ mensagem: 'Cpf não informado' });
  }
  
  if (email != null ){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let emailValido = regex.test(email);

    if(!emailValido){
      return res.status(404).json({ mensagem: 'Email inválido' });
    }
    if (email < 3){
      return res.status(404).json({ mensagem: 'Email deve conter no mínimo 3 caracteres' });
    }
    if (email.length > 100){
      return res.status(404).json({ mensagem: 'Nome deve conter no máximo 100 caracteres' });
    }
  }
  else {
    return res.status(404).json({ mensagem: 'Email não informado' });
  }

  let id = 0
  if(usuarios.length > 0){
    id = usuarios.reduce((max, user) => {
      return (user.id > max.id) ? user : max;
    })
  }

  const novoUsuario = {
    id: id == 0 ? 1 : id.id + 1,
    name: nome,
    cpf: cpf,
    email: email
  }

  usuarios.push(novoUsuario)
  return res.json({message: "Usuário cadastrado com sucesso"})
 
});

server.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const nome = req.body.name;
  const cpf = req.body.cpf;
  const email = req.body.email;

  let idExiste = usuarios.find(idUsr => idUsr.id == id)

  if(idExiste == null){
    return res.status(404).json({ mensagem: 'Usuário não encontrado' });
  }

  if (nome != null ){
    if (nome.length < 3){
      return res.status(404).json({ mensagem: 'Nome deve conter no mínimo 3 caracteres' });
    }
    if (nome.length > 150){
      return res.status(404).json({ mensagem: 'Nome deve conter no máximo 150 caracteres' });
    }
  }
  else {
    return res.status(404).json({ mensagem: 'Nome não informado' });
  }

  if (cpf != null ){
    if (cpf.length < 11 || cpf.length > 11){
      return res.status(404).json({ mensagem: 'Cpf deve conter 11 caracteres' });
    }
    if (isNaN(Number(cpf))){
      return res.status(404).json({ mensagem: 'Cpf deve conter apenas números' });
    }
  }
  else {
    return res.status(404).json({ mensagem: 'Cpf não informado' });
  }
  
  if (email != null ){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let emailValido = regex.test(email);

    if(!emailValido){
      return res.status(404).json({ mensagem: 'Email inválido' });
    }
    if (email < 3){
      return res.status(404).json({ mensagem: 'Email deve conter no mínimo 3 caracteres' });
    }
    if (email.length > 100){
      return res.status(404).json({ mensagem: 'Nome deve conter no máximo 100 caracteres' });
    }
  }
  else {
    return res.status(404).json({ mensagem: 'Email não informado' });
  }

  usuarios = usuarios.map(idEditar => {
    if (idEditar.id == id) {
        return { ...idEditar, name: nome, cpf: cpf, email:  email };
    }
    return idEditar;
  });
  return res.json({message: "Usuário atualizado com sucesso" })
});

server.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  let idExiste = usuarios.find(idUsr => idUsr.id == id)

  if(idExiste == null){
    return res.status(404).json({ mensagem: 'Usuário não encontrado' });
  }

  usuarios = usuarios.filter(idUsr => idUsr.id != id)
  res.json({message: "Usuário removido com sucesso"});
});

/*********************ENDPOINTS PRODUTOS********************* */ 

server.get('/products', (req, res) => {
  res.json(produtos);
});

server.get('/products/:id', (req, res) => {
  const id = req.params.id;
  let idExiste = produtos.find(idUsr => idUsr.id == id)

  if(idExiste == null){
    return res.status(404).json({ mensagem: 'Produto não encontrado' });
  }
  res.json(idExiste);
});

server.post('/products', (req, res) => {
  const nome = req.body.name;
  const preco = req.body.price;

  if (nome != null ){
    if (nome.length < 3){
      return res.status(404).json({ mensagem: 'Nome deve conter no mínimo 3 caracteres' });
    }
    if (nome.length > 100){
      return res.status(404).json({ mensagem: 'Nome deve conter no máximo 100 caracteres' });
    }
  }
  else {
    return res.status(404).json({ mensagem: 'Nome não informado' });
  }

  if (preco != null ){
    if (preco <= 0){
      return res.status(404).json({ mensagem: 'Preço deve ser maior que 0' });
    }
    if (isNaN(Number(preco))){
      return res.status(404).json({ mensagem: 'Preço deve ser um número' });
    }
  }
  else {
    return res.status(404).json({ mensagem: 'Preço não informado' });
  }

  let id = 0
  if(produtos.length > 0){
    id = produtos.reduce((max, prod) => {
      return (prod.id > max.id) ? prod : max;
    })
  }

  const novoProduto = {
    id: id == 0 ? 1 : id.id + 1,
    name: nome,
    price: preco
  }

  produtos.push(novoProduto)
  return res.json({message: "Produto cadastrado com sucesso"})
});

server.put('/products/:id', (req, res) => {
  const id = req.params.id;
  const nome = req.body.name;
  const preco = req.body.price;

  let idExiste = produtos.find(idProd => idProd.id == id)

  if(idExiste == null){
    return res.status(404).json({ mensagem: 'Produto não encontrado' });
  }

  if (nome != null ){
    if (nome.length < 3){
      return res.status(404).json({ mensagem: 'Nome deve conter no mínimo 3 caracteres' });
    }
    if (nome.length > 150){
      return res.status(404).json({ mensagem: 'Nome deve conter no máximo 150 caracteres' });
    }
  }
  else {
    return res.status(404).json({ mensagem: 'Nome não informado' });
  }

  if (preco != null ){
    if (preco <= 0){
      return res.status(404).json({ mensagem: 'Preço deve ser maior que 0' });
    }
    if (isNaN(Number(preco))){
      return res.status(404).json({ mensagem: 'Preço deve ser um número' });
    }
  }
  else {
    return res.status(404).json({ mensagem: 'Preço não informado' });
  }

  produtos = produtos.map(idEditar => {
    if (idEditar.id == id) {
        return { ...idEditar, name: nome, price: preco };
    }
    return idEditar;
  });
  return res.json({message: "Produto atualizado com sucesso" })
});

server.delete('/products/:id', (req, res) => {
  const id = req.params.id;
  let idExiste = produtos.find(idProd => idProd.id == id)

  if(idExiste == null){
    return res.status(404).json({ mensagem: 'Produto não encontrado' });
  }

  produtos = produtos.filter(idProd => idProd.id != id)
  res.json({message: "Produto removido com sucesso"});
});

server.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})