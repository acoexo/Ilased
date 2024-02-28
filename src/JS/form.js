import CookieManager from './CookieManager.js';
const formulario = document.getElementById('contactForm');
const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
let cm = new CookieManager();
cm.getCookieName()
    .then(storedName => {
        const userInputElement = document.getElementById('user');
        if (storedName) {
            userInputElement.value = storedName;
            cm.setName(storedName);
        }
    })
    .catch(error => {
        console.error('Error al obtener el nombre de la cookie:', error);
    });


const expresiones = {
    user: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
};

const campos = {
    user: false,
    email: false,
    msg: false
};

const validarFormulario = (e) => {
    const { name, value } = e.target;
    switch (name) {
        case "user":
            validarCampo(expresiones.user, value, 'user');
            break;
        case "email":
            validarCampo(expresiones.email, value, 'email');
            break;
        case "msg":
            validarTextArea();
            contador();
            break;
    }
};

const validarCampo = (expresion, valor, campo) => {
    const grupo = document.getElementById(`grupo__${campo}`);
    const icono = document.querySelector(`#grupo__${campo} i`);
    const errorElement = document.querySelector(`#grupo__${campo} .formulario__input-error`);
    
    const esCampoValido = expresion.test(valor) && (campo !== 'email' || tieneDominioValido(valor));

    grupo.classList.toggle('formulario__grupo-incorrecto', !esCampoValido);
    grupo.classList.toggle('formulario__grupo-correcto', esCampoValido);
    
    icono.classList.toggle('fa-check-circle', esCampoValido);
    icono.classList.toggle('fa-times-circle', !esCampoValido);

    if (!esCampoValido) {
        errorElement.innerHTML = campo === 'email' && !valor.includes('@')
            ? 'El correo electrónico debe contener el símbolo @'
            : campo === 'email' && !tieneDominioValido(valor)
                ? 'El correo electrónico debe tener un dominio válido'
                : 'El nombre no puede contener numeros  ni caracteres especiales';

        errorElement.classList.add('formulario__input-error-activo');
        setTimeout(() => {
            errorElement.classList.remove('formulario__input-error-activo');
        }, 2000);

        campos[campo] = false;
    } else {
        errorElement.classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    }
};

const tieneDominioValido = (correo) => {
    const partes = correo.split('@');
    return partes.length === 2 && partes[1].includes('.') && !partes[1].endsWith('.');
};

const maxCaracteresMensaje = 150;
const validarTextArea = () => {
    const grupoMsg = document.getElementById('grupo__msg');
    const msgInput = document.getElementById('msg');
    if (!grupoMsg || !msgInput) {
        return;
    }
    let msg = msgInput.value;
    if (msg.length > maxCaracteresMensaje) {
        msg = msg.substring(0, maxCaracteresMensaje);
        msgInput.value = msg;
    }
    const errorElement = grupoMsg.querySelector('.formulario__input-error');
    if (msg.length < 20 || msg.length > maxCaracteresMensaje) {
        errorElement.innerHTML = `El mensaje debe tener entre 20 y ${maxCaracteresMensaje} caracteres`;
        errorElement.classList.add('formulario__input-error-activo');
        setTimeout(() => {
            errorElement.classList.remove('formulario__input-error-activo');
        }, 2000);
        campos['msg'] = false;
    } else {
        errorElement.classList.remove('formulario__input-error-activo');
        campos['msg'] = true;
    }
};

const contador = () => {
    const msgInput = document.getElementById('msg');
    const contadorCaracteres = document.getElementById('contadorCaracteres');
    const longitudTexto = msgInput.value.length;
    contadorCaracteres.textContent = `${longitudTexto}/${maxCaracteresMensaje}`;
    contadorCaracteres.classList.toggle('excede-limite', longitudTexto > maxCaracteresMensaje);
};

inputs.forEach((input) => {
    input.addEventListener('input', validarFormulario);
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    if (campos.user && campos.email && campos.msg) {
        formulario.reset();
        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
        }, 5000);
        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario__grupo-correcto');
        });
    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
        }, 5000);
    }
});
const reloadBtn= document.getElementById('reiniciar');
reloadBtn.addEventListener('click', function(){
	location.reload();
});
