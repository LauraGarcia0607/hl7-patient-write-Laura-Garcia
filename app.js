<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro de Pacientes</title>
</head>
<body>
    <h2>Registro de Paciente</h2>
    <form id="patientForm">
        <label for="name">Nombre:</label>
        <input type="text" id="name" required><br>
        
        <label for="familyName">Apellido:</label>
        <input type="text" id="familyName" required><br>
        
        <label for="gender">Género:</label>
        <select id="gender" required>
            <option value="">Seleccione...</option>
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
            <option value="other">Otro</option>
        </select><br>
        
        <label for="birthDate">Fecha de Nacimiento:</label>
        <input type="date" id="birthDate" required><br>
        
        <label for="identifierValue">Identificador:</label>
        <input type="text" id="identifierValue" required><br>
        
        <button type="submit">Registrar</button>
    </form>

    <script>
        document.getElementById('patientForm').addEventListener('submit', async function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value.trim();
            const familyName = document.getElementById('familyName').value.trim();
            const gender = document.getElementById('gender').value;
            const birthDate = document.getElementById('birthDate').value;
            const identifierValue = document.getElementById('identifierValue').value.trim();

            if (!name ||