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


// Array.from(checkBox).forEach(function(element) {
//   element.addEventListener('click', function(){
//     const artistName = this.parentNode.parentNode.childNodes[1].innerText
//     const msg = this.parentNode.parentNode.childNodes[3].innerText
//   //  dataset (data attribute) and heart is the variable already set
//   // comparing it to true so it can be boolean
//     const heartIcon = this.dataset.heart === "true"

//     // if(this.dataset.heart){
//     //   heartIcon = true
//     // } else {
//     //   heartIcon = false
//     // }
    
//     fetch('favorites', {
//       method: 'put',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({
//         'artistName': artistName,
//         'msg': msg,
//         'heart': heartIcon
//       })
//     })
//     .then(response => {
//       if (response.ok) return response.json()
//     })
//     .then(data => {
//       console.log(data)
//       window.location.reload(true)
//     })
//   });
// });


Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const jobListing = this.parentNode.parentNode.childNodes[3].innerText
        const connect = this.parentNode.parentNode.childNodes[5].innerText
        const msg = this.parentNode.parentNode.childNodes[7].innerText

        fetch('messages', {
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
