var checkBox = document.getElementsByClassName("fa-square");
var trash = document.getElementsByClassName("fa-trash-o");

Array.from(checkBox).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const jobListing = this.parentNode.parentNode.childNodes[3].innerText
        const connect = this.parentNode.parentNode.childNodes[5].innerText
        const msg = this.parentNode.parentNode.childNodes[7].innerText
        const checkBoxIcon = this.dataset.checkbox === "true"
      
        console.log(this.dataset)
        fetch('messages', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'jobListing': jobListing,
            'connect': connect,
            'msg': msg,
            'checkBox': checkBoxIcon
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

function edit(id){
  let messageText = prompt("Edit Your Message!")
 

  fetch('editMsg', {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      '_id': id,
      'msg': messageText
    })
  }).then(function (response) {
    window.location.reload()
  })


}




Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[7].innerText
 

        fetch('delete', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
