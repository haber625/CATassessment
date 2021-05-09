let u_btn_1 = document.getElementsByClassName('u-btn-1')[0];
let u_official_terms = document.getElementById('u-official-terms');
let remind = document.getElementsByClassName('remind')[0];

u_btn_1.onclick = function () {
    if (u_official_terms.checked == true) {
        console.log(u_official_terms.checked);
    }
    else {
        remind.style.display = "block";
    }
}