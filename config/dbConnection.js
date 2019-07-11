const ip = require("ip");

const URL = (ip.address().slice(0, 3) == "192") ? "mongodb://localhost/SistemaPCO" : "mongodb://SitemaPCO:password@localhost:27017/SistemaPCO";
console.log("Conexão com o mongodb feito com sucesso")
console.log(ip.address());
module.exports = URL;