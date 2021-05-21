const content = document.querySelector("#content");
const submit = document.querySelector("#submit");

window.addEventListener('load',()=> {
     getUsers();


});
submit.addEventListener('click',()=> {
   let fullname = document.querySelector('#fullname').value;
   let email = document.querySelector('#email').value;

   let formData = {fullname,email};
    
   fetch('http://localhost:5000/student/add', {
       method:'POST',
       body:JSON.stringify(formData),
       headers: {
           'Content-Type' : 'application/json'
       }
   });

});

function getUsers(){

    let html = "";

    fetch('http://localhost:5000/student').then(response => {
        console.log(response);
        return response.json();
    }).then(data => {
        console.log(data);
        data.forEach(element=> {
           html +=`<li>${element.fullname} ${element.email}<a href="" onClick="deleteStudent('${element._id}')"> Delete</a></li>`;
        });

        content.innerHTML = html;
    }).catch(error => {
        console.log(error);
    });
}
function deleteStudent(id){
    fetch('http://localhost:5000/student/' + id,{
        method:'DELETE'
    }).then(response=> response.text()).then(response=>console.log(response)).catch(error =>
        console.log(error));
}