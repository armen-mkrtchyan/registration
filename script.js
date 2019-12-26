let _ = $;
let newData = [];

setRequest();

function setRequest() {
    _.ajax({
        type: 'get',
        url: 'users.json',
        dataType: 'json',
        success: createTable
    });
}

function createTable(data) {
    let users = data.users;
    if (!users.length) {
        return console.log("empty data");
    }

    let elementOfTab = document.getElementById('users');

    let table = document.getElementById('my-table');
    if (table) {
        let notUsed = newData.filter((item) => item.isUsed === false);
        if (notUsed.length === 0) {
            return;
        } else {
            // taza ban ka qcelu
            let trInput = document.createElement('tr');
            for (let i = 0; i < notUsed.length; i++) {
                let obj = notUsed[i];
                trInput.id = obj.id;
                for (let key in obj) {
                    if (key !== "isUsed" && key !== "id") {
                        let td = document.createElement('td');
                        td.innerHTML = obj[key];
                        trInput.addEventListener('click', function () {
                            let index = newData.findIndex(dt => dt.id === obj.id);
                            newData.splice(index, 1);
                            (document.getElementById(obj.id)).remove();
                        });

                        trInput.appendChild(td);
                    }
                }
                obj["isUsed"] = true;
                table.appendChild(trInput);
            }
            return
        }
    } else {
        table = document.createElement('table');
        table.id = "my-table";
    }

    let firstElement = users[0];

    // ["name", "dateOfBirth" ...]
    let headSections = Object.keys(firstElement).filter(i => i !== 'id');

    // create head
    let trForHead = document.createElement('tr');
    for (let h = 0; h < headSections.length; h++) {
        let th = document.createElement('th');
        th.innerHTML = headSections[h];
        trForHead.appendChild(th);
        table.appendChild(trForHead);
    }

    for (let i = 0; i < users.length; i++) {
        let tr = document.createElement('tr');

        for (let j = 0; j < headSections.length; j++) {
            let td = document.createElement('td');
            td.innerHTML = users[i][headSections[j]];
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    elementOfTab.appendChild(table);
}

function createRow() {
    let elements = document.getElementsByTagName('input');

    let obj = {isUsed: false, id: Math.random() * 1051296};
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].type === "radio") {
            if (elements[i].checked) {
                obj["gender"] = elements[i].value;
                elements[i].checked = false;
            }
        } else {
            obj[elements[i].name] = elements[i].value;
        }
        elements[i].value = "";
    }

    newData.push(obj);
}