document.addEventListener('DOMContentLoaded',function (){

    const form = document.getElementById('mainForm');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const password = document.getElementById('password');
    const message = document.getElementById('message');

    form.addEventListener('submit', function (e){
        e.preventDefault();
        if(checkInputs()){
            showModal();
        }
    });

    name.addEventListener('input', () =>{
        validateField(name, name.value.trim() !== '', 'İsim yok');
    });

    email.addEventListener('input', () =>{
        validateField(email, isEmail(email.value.trim()),  'Email yok');
    });

    phone.addEventListener('input', () =>{
        validateField(phone, isPhone(phone.value.trim()),  'Telefon yok');
    });

    password.addEventListener('input', () =>{
        validateField(password, password.value.trim().length >=8, 'Şifre yok');
    });

    message.addEventListener('input', () =>{
        validateField(message, message.value.trim() !== '', 'Mesaj yok');
    });

    function checkInputs() {
        let isValid = true;
        validateField(name, name.value.trim() !== '', 'Ad boş olamaz');
        validateField(email, isEmail(email.value.trim()), 'Geçerli bir e-posta değil');
        validateField(phone, isPhone(phone.value.trim()), 'Geçerli bir telefon numarası değil');
        validateField(password, password.value.trim().length >= 8, 'Şifre en az 8 karakter olmalıdır');
        validateField(message, message.value.trim() !== '', 'Mesaj boş olamaz');

        document.querySelectorAll('.form-control').forEach((control) => {
            if (control.classList.contains('error')) {
                isValid = false;
            }
        });

        return isValid;
    }

    function validateField(input, condition, errorMessage) {
        if (condition) {
            setSuccsess(input);
        }else {
            setError(input, errorMessage);
        }
    }

    function setError(input, message){
        const formControl = input.parentElement;
        const icon = formControl.querySelector('.icon');
        formControl.className= 'form-control error'
        icon.className = 'icon fas fa-times-circle';
        input.placeholder = message;
    }

    function setSuccsess(input){
        const formControl = input.parentElement;
        const icon = formControl.querySelector('.icon');
        formControl.className = 'form-control success';
        icon.className = 'icon fas fa-check-circle';
    }

    function isEmail(email) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
    }

    function isPhone(phone) {
        return /^\+?(\d.*){3,}$/.test(phone);
    }

    function showModal() {
        const modal = document.getElementById('successModal');
        modal.style.display = 'block';

        const closeBtn = document.querySelector('.close-button');
        closeBtn.onclick = function () {
            modal.style.display = 'none';
        };

        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    }

});