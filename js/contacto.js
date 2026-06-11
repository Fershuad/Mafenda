document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("maContactSimpleForm");

    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const asunto = document.getElementById("asunto").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();

        const numero = "5215519106686";

        const texto =
            `Hola, quiero información sobre una figura personalizada.\n\n` +
            `Nombre: ${nombre}\n` +
            `Correo: ${correo}\n` +
            `Asunto: ${asunto}\n` +
            `Mensaje: ${mensaje}`;

        const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

        window.open(url, "_blank");
    });
});