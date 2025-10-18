var nameInput = document.getElementById("nameInput")

var urlInput = document.getElementById("urlInput")

var addBtn = document.getElementById("SubmitBtn")
var element = ""
var regex = {
    nameInput: {
        value: /^[A-Z][a-z]{2,}$/,
        isvalid: false
    },
    urlInput: {
        value: /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/,
        isvalid: false
    },
}


var bookData = []

if (localStorage.getItem("dataLest") !== null) {
    bookData = JSON.parse(localStorage.getItem("dataLest"))
    displayBookData(bookData)

}

//add button

function addData() {

    var data = {
        name: nameInput.value,
        url: urlInput.value,


    }
    if (regex.nameInput.isvalid && regex.urlInput.isvalid) {
        bookData.push(data)
        localStorage.setItem("dataLest", JSON.stringify(bookData))
        console.log(bookData);
        displayBookData()
        clearForm()

    }
    else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
    }




}
 

function displayBookData() {

    cartona = ''

    for (var i = 0; i < bookData.length; i++) {

        cartona += `
                 <tr>
             <td>${i + 1}</td>
            
             <td>${bookData[i].name}</td>
             <td><a class="color fw-medium" href="${bookData[i].url}" target="_blank"> <i class="fa-solid fa-eye pe-4"></i>Visit</a></td>

              <td> <button onclick ="deleteBookData(${i})"class="btn btn-danger"> <i class="fa-solid fa-trash"></i>Delete</button></td>
                </tr>


`

    }

    document.getElementById("myBody").innerHTML = cartona
}

// delete
function deleteBookData(index) {

    bookData.splice(index, 1)
    displayBookData()
    localStorage.setItem("dataLest", JSON.stringify(bookData))
}

//clear form

function clearForm() {
    nameInput.value = ''
    urlInput.value = ''

    nameInput.classList.remove("is-valid")
    nameInput.classList.remove("is-invalid")

    urlInput.classList.remove("is-valid")
    urlInput.classList.remove("is-invalid")

}
//validat


function validatform(element) {
    elmmentInput = element
    if (regex[element.id].value.test(element.value)) {
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
        regex[element.id].isvalid = true
    }
    else {
        element.classList.add("is-invalid")
        element.classList.remove("is-valid")
        regex[element.id].isvalid = false
    }
    if (element.value == "") {
        element.classList.remove("is-invalid")
        element.classList.remove("is-valid")
    }
    tooggleBtn()
}


function tooggleBtn() {
    if (regex.nameInput.isvalid &&
        regex.urlInput.isvalid) {
        SubmitBtn.disabled = false
    }


    else {
        SubmitBtn.disabled = true
    }
}




