document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem('visited')){
        window.location = "a.html"
        //console.log("carrier page");
    }
});
function checkInputLength() {
    let userInput = document.getElementById("userInput").value;
    let pattern = /^amzcs\d{6}[a-zA-Z]\d{2}$/;

    if (!localStorage.getItem('visited')){
        localStorage.setItem('visited', 'true');
        if (pattern.test(userInput) && userInput.length === 14) {
            swal({
                position: 'center',
                icon: 'success',
                title: 'You item is out for Delivery',
                showConfirmButton: false,
                timer: 3000
            })
            
          }else{
            Swal.fire({
                icon: 'error',
                title: 'Sorry',
                text: 'Enter the Valid Reference ID',
                })
            }
    }else{
        Swal.fire({
            icon: 'error',
            text: 'Internal Server error',
            Timer:3000
            })
          }
    }
   
  