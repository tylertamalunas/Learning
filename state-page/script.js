function validateForm() {
    var email1 = document.getElementById('email1').value;
    var email2 = document.getElementById('email2').value;

    if (email1 == email2) {
        return true;
    }
    else{
        alert("Emails do not match");
        return false;
    }
}