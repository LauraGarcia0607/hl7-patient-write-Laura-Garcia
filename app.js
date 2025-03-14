document.getElementById('patientForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const name = document.getElementById('name').value.trim();
    const familyName = document.getElementById('familyName').value.trim();
    const gender = document.getElementById('gender').value;
    const birthDate = document.getElementById('birthDate').value;
    const identifierSystem = document.getElementById('identifierSystem').value.trim();
    const identifierValue = document.getElementById('identifierValue').value.trim();
    const cellPhone = document.getElementById('cellPhone').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const postalCode = document.getElementById('postalCode').value.trim();

    // Validar que los campos obligatorios no estén vacíos
    if (!name || !familyName || !gender || !birthDate || !identifierSystem || !identifierValue) {
        alert("Por favor, complete todos los campos obligatorios.");
        return;
    }

    // Crear el objeto Patient en formato FHIR
    const patient = {
        resourceType: "Patient",
        name: [{
            use: "official",
            given: [name],
            family: familyName
        }],
        gender: gender,
        birthDate: birthDate,
        identifier: [{
            system: identifierSystem,
            value: identifierValue
        }],
        telecom: [
            cellPhone ? { system: "phone", value: cellPhone, use: "home" } : null,
            email ? { system: "email", value: email, use: "home" } : null
        ].filter(Boolean), // Elimina valores null
        address: [{
            use: "home",
            line: address ? [address] : [],
            city: city,
            postalCode: postalCode,
            country: "Colombia"
        }]
    };

    // Enviar los datos usando Fetch API
    fetch('https://hl7-fhir-ehr-laura-garcia.onrender.com/patient', {  // URL corregida
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(patient)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la API: ${response.status} - ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert(`Paciente creado exitosamente! ID: ${data._id}`);
        document.getElementById('patientForm').reset(); // Limpiar formulario
    })
    .catch((error) => {
        console.error('Error:', error);
        alert(`Hubo un error al crear el paciente: ${error.message}`);
    });
});
