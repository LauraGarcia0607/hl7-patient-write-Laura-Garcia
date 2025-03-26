document.getElementById('patientForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const familyName = document.getElementById('familyName').value.trim();
    const gender = document.getElementById('gender').value;
    const birthDate = document.getElementById('birthDate').value;
    const identifierValue = document.getElementById('identifierValue').value.trim();

    if (!name || !familyName || !gender || !birthDate || !identifierValue) {
        alert("Por favor, complete todos los campos obligatorios.");
        return;
    }

    const patient = {
        resourceType: "Patient",
        name: [{ use: "official", given: [name], family: familyName }],
        gender: gender,
        birthDate: birthDate,
        identifier: [{ system: "http://example.com/id", value: identifierValue }]
    };

    try {
        const response = await fetch('https://hl7-patient-write-laura-garcia-8518.onrender.com/patient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(patient)
        });

        if (!response.ok) {
            throw new Error(`Error en la API: ${response.status}`);
        }

        const data = await response.json();
        window.alert(`Paciente creado exitosamente! ID: ${data.id || data._id}`);
        document.getElementById('patientForm').reset();
    } catch (error) {
        window.alert("Error al crear paciente");
    }
});
