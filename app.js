<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario de Pacientes</title>
    <style>
        body { font-family: Arial, sans-serif; }
        #message { margin-top: 10px; padding: 10px; display: none; border-radius: 5px; }
        .success { background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
        .error { background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
    </style>
</head>
<body>
    <form id="patientForm">
        <label for="name">Nombre:</label>
        <input type="text" id="name" required><br>

        <label for="familyName">Apellido:</label>
        <input type="text" id="familyName" required><br>

        <label for="gender">Género:</label>
        <select id="gender" required>
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
        </select><br>

        <label for="birthDate">Fecha de Nacimiento:</label>
        <input type="date" id="birthDate" required><br>

        <label for="identifierSystem">Sistema de Identificación:</label>
        <input type="text" id="identifierSystem" required><br>

        <label for="identifierValue">Número de Identificación:</label>
        <input type="text" id="identifierValue" required><br>

        <label for="cellPhone">Teléfono:</label>
        <input type="tel" id="cellPhone"><br>

        <label for="email">Correo Electrónico:</label>
        <input type="email" id="email"><br>

        <label for="address">Dirección:</label>
        <input type="text" id="address"><br>

        <label for="city">Ciudad:</label>
        <input type="text" id="city"><br>

        <label for="postalCode">Código Postal:</label>
        <input type="text" id="postalCode"><br>

        <button type="submit">Crear Paciente</button>
    </form>

    <div id="message"></div>

    <script>
        document.getElementById('patientForm').addEventListener('submit', async function (event) {
            event.preventDefault();

            const messageDiv = document.getElementById('message');
            messageDiv.style.display = "none";

            const url = 'https://hl7-fhir-ehr-laura-garcia.onrender.com/patient'; 

            const patient = {
                resourceType: "Patient",
                name: [{
                    use: "official",
                    given: [document.getElementById('name').value.trim()],
                    family: document.getElementById('familyName').value.trim()
                }],
                gender: document.getElementById('gender').value,
                birthDate: document.getElementById('birthDate').value,
                identifier: [{
                    system: document.getElementById('identifierSystem').value.trim(),
                    value: document.getElementById('identifierValue').value.trim()
                }],
                telecom: [
                    document.getElementById('cellPhone').value.trim() ? { system: "phone", value: document.getElementById('cellPhone').value.trim(), use: "home" } : null,
                    document.getElementById('email').value.trim() ? { system: "email", value: document.getElementById('email').value.trim(), use: "home" } : null
                ].filter(Boolean),
                address: [{
                    use: "home",
                    line: document.getElementById('address').value.trim() ? [document.getElementById('address').value.trim()] : [],
                    city: document.getElementById('city').value.trim(),
                    postalCode: document.getElementById('postalCode').value.trim(),
                    country: "Colombia"
                }]
            };

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(patient)
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Error ${response.status}: ${errorText}`);
                }

                const data = await response.json();
                messageDiv.textContent = `✅ Paciente creado exitosamente! ID: ${data.id}`;
                messageDiv.className = "success";
                messageDiv.style.display = "block";
                document.getElementById('patientForm').reset();
            } catch (error) {
                console.error('Error:', error);
                messageDiv.textContent = `❌ Hubo un error al crear el paciente: ${error.message}`;
                messageDiv.className = "error";
                messageDiv.style.display = "block";
            }
        });
    </script>
</body>
</html>
