function validar(token, dispositivo, ip){
  let data = [];
  let codigo = "0";
  let mensaje = "Proceso correcto";
  let estado = true;
  let respuesta = {data, codigo, estado, mensaje}

  if(token == undefined){
    codigo = "-100";
    mensaje = "Token incorrecto";
    estado = false;
  }

  if(dispositivo == undefined){
    codigo = "-100";
    mensaje = "dispositivo incorrecto";
    estado = false;
  }

  if(ip == undefined){
    codigo = "-100";
    mensaje = "IP incorrecto";
    estado = false;
  }

  respuesta = {data, codigo, estado, mensaje}
  return (respuesta); 
}

module.exports = {
  validar
}