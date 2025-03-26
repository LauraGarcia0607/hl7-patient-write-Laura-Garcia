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

        const data = await response.json();
        const message = document.createElement('div');
        message.style.position = 'fixed';
        message.style.top = '20px';
        message.style.left = '50%';
        message.style.transform = 'translateX(-50%)';
        message.style.backgroundColor = 'green';
        message.style.color = 'white';
        message.style.padding = '10px';
        message.style.borderRadius = '5px';
        message.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
        message.innerText = `Paciente creado exitosamente! ID: ${data.id || data._id}`;
        document.body.appendChild(message);

        setTimeout(() => {
            message.remove();
        }, 5000);

        document.getElementById('patientForm').reset();
    } catch (error) {
        console.error("Error al crear paciente", error);
    }
});
