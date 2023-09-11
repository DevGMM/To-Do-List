const LocalStorageKey = 'to-do-list-gn'

function NewTask() {

    let input = document.getElementById('input-new-task')
    input.style.border = ''

    if (!input.value) {
        input.style.border = '1px solid red'
        alert('Digite algo para inserir em sua lista.')
    } else if (IfExistsNT()) {
        alert('Já existe uma task com essa descrição')
    } else {

        //Utilizando o JSON para pegar a mémoria local
        let values = JSON.parse(localStorage.getItem(LocalStorageKey) || "[]")

        values.push({
            name: input.value
        })

        //usando a documentação localStorage e a função .setItem para incrementar ou atualizar
        localStorage.setItem(LocalStorageKey, JSON.stringify(values))
        ShowValues()
    }

    input.value = ''
}

function ShowValues() {

    let values = JSON.parse(localStorage.getItem(LocalStorageKey) || "[]")
    let list = document.getElementById('to-do-list')

    list.innerHTML = ''
    for (let i = 0; i < values.length; i++) {
        list.innerHTML += `<li>${values[i]['name']}<button class='btn-check' onclick='removeItem("${values[i]['name']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/></svg></button></li>`
    }

}

function removeItem(data) {

    let values = JSON.parse(localStorage.getItem(LocalStorageKey) || "[]")
    let index = values.findIndex(x => x.name == data)

    values.splice(index, 1)

    localStorage.setItem(LocalStorageKey, JSON.stringify(values))
    ShowValues()

}

function IfExistsNT() {

    let values = JSON.parse(localStorage.getItem(LocalStorageKey) || "[]")
    let inputValue = document.getElementById('input-new-task').value
    let exists = values.find(x => x.name == inputValue)

    return !exists ? false : true
}