var array = JSON.parse(localStorage.getItem("datosUsuario"));
document.getElementById('title').style.color=array['colorFuente'];
document.getElementById('all').style.backgroundColor=array['colorFondo'];
