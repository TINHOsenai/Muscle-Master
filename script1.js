function updateRemoveButtons() {
    const removeButtons = document.querySelectorAll('.muscle-row .btn-danger');
    const muscleRows = document.querySelectorAll('.muscle-row');

    removeButtons.forEach(button => {
        button.disabled = muscleRows.length <= 3;
    });
}

function addMuscle() {
    const musclesDiv = document.getElementById('muscles');
    const muscleRow = document.createElement('div');
    muscleRow.className = 'muscle-row';

    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.className = 'muscle form-control muscle-input';
    newInput.placeholder = 'Informe um músculo...';

    const removeButton = document.createElement('button');
    removeButton.className = 'btn btn-danger';
    removeButton.innerText = 'Excluir';
    removeButton.onclick = () => removeMuscle(removeButton);

    muscleRow.appendChild(newInput);
    muscleRow.appendChild(removeButton);
    musclesDiv.appendChild(muscleRow);

    updateRemoveButtons();
}

function removeMuscle(button) {
    const muscleRow = button.parentElement;
    muscleRow.remove();
    updateRemoveButtons();
}

async function submitForm() {
    const muscleInputs = document.getElementsByClassName('muscle');
    const musculos = [];

    for (let i = 0; i < muscleInputs.length; i++) {
        if (muscleInputs[i].value.trim()) {
            musculos.push(muscleInputs[i].value.trim());
        }
    }

    if (musculos.length < 1) {
        alert('Por favor, preencha pelo menos um campo!');
        return;
    }

    const data = { musculos };

    try {
        const response = await fetch('http://localhost:5000/treino', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        const responseDiv = document.getElementById('response');
        if (result && result.length > 0) {
            const treino = `${result.join('')}`;
            responseDiv.innerHTML = treino;
        } else {
            responseDiv.innerHTML = `<p>Erro: ${result.Erro}</p>`;
        }
        responseDiv.style.display = 'block';
    } catch (error) {
        const responseDiv = document.getElementById('response');
        responseDiv.innerHTML = `<p>Erro: ${error.message}</p>`;
        responseDiv.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', updateRemoveButtons);
