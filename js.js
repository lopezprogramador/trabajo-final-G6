document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.letrero');
    const navegacion = document.querySelector('.navegacion');
    const imagenes = document.querySelectorAll('img');
    const btnTodos = document.querySelector('.todos');
    const btnEnsaladas = document.querySelector('.ensaladas');
    const btnPasta = document.querySelector('.pasta');
    const btnPizza = document.querySelector('.pizza');
    const btnPostres = document.querySelector('.postres');
    const contenedorPlatillos = document.querySelector('.platillos');

    // Eventos principales
    menu.addEventListener('click', abrirMenu);
    btnTodos.addEventListener('click', () => mostrarPlatillos(ensaladas, pastas, pizzas, postres, platillosArreglo));
    btnEnsaladas.addEventListener('click', () => mostrarPlatillos(ensaladas, [], [], [], platillosArreglo));
    btnPasta.addEventListener('click', () => mostrarPlatillos([], pastas, [], [], platillosArreglo));
    btnPizza.addEventListener('click', () => mostrarPlatillos([], [], pizzas, [], platillosArreglo));
    btnPostres.addEventListener('click', () => mostrarPlatillos([], [], [], postres, platillosArreglo));

    // Observador para cargar imágenes al hacer scroll
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const imagen = entry.target;
                imagen.src = imagen.dataset.src;
                observer.unobserve(imagen);
            }
        });
    });

    imagenes.forEach(imagen => {
        observer.observe(imagen);
    });

    // Función para abrir el menú
    function abrirMenu() {
        navegacion.classList.remove('ocultar');
        crearBotonCerrar();
    }

    // Función para crear y manejar el botón de cerrar
    function crearBotonCerrar() {
        const btnCerrar = document.createElement('p');
        btnCerrar.textContent = 'x';
        btnCerrar.classList.add('btn-cerrar');
        navegacion.appendChild(btnCerrar);

        const overlay = document.createElement('div');
        overlay.classList.add('pantalla-completa');
        document.body.appendChild(overlay);

        btnCerrar.addEventListener('click', cerrarMenu);
        overlay.addEventListener('click', cerrarMenu);

        function cerrarMenu() {
            navegacion.classList.add('ocultar');
            btnCerrar.remove();
            overlay.remove();
        }
    }

    // Función para filtrar y mostrar platillos
    function mostrarPlatillos(ensaladas, pastas, pizzas, postres, todos) {
        limpiarHtml(contenedorPlatillos);
        const filtros = [ensaladas, pastas, pizzas, postres].filter(arr => arr.length > 0).flat();
        if (filtros.length === 0) {
            todos.forEach(platillo => contenedorPlatillos.appendChild(platillo));
        } else {
            filtros.forEach(platillo => contenedorPlatillos.appendChild(platillo));
        }
    }

    // Función para limpiar el contenido del contenedor
    function limpiarHtml(contenedor) {
        contenedor.innerHTML = '';
    }

    // Validación del formulario de registro
    document.getElementById('registerForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar envío del formulario para validación

        const nombre = document.getElementById('nombre').value.trim();
        const apellido = document.getElementById('apellido').value.trim();
        const dni = document.getElementById('dni').value.trim();
        const email = document.getElementById('email').value.trim();

        if (validateForm(nombre, apellido, dni, email)) {
            alert('Datos ingresados con éxito');
        } else {
            alert('Datos incorrectos, por favor revise los datos ingresados');
        }
    });

    // Función para validar el formulario
    function validateForm(nombre, apellido, dni, email) {
        const dniPattern = /^\d+$/; // Solo dígitos
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Patrón para email

        if (nombre === '' || apellido === '') {
            return false;
        }
        if (!dniPattern.test(dni)) {
            return false;
        }
        if (!emailPattern.test(email)) {
            return false;
        }

        return true;
    }
});
