// JS ĐĂNG KÝ, ĐĂNG NHẬP
//Hiện khung đăng ký
var khungdangky = document.forms;
var nutDangkyDangnhap = document.getElementsByClassName('tieude__thanhnavbar-item')
function hienkhungdangky(){
    khungdangky[1].classList.add('openform2')
}
nutDangkyDangnhap[4].addEventListener('click',hienkhungdangky)
//Hiện khung đăng nhập
function hienkhungdangnhap(){
    khungdangky[0].classList.add('openform1')
}
nutDangkyDangnhap[5].addEventListener('click',hienkhungdangnhap)
// Trong đăng nhập hiện đăng ký trong đăng ký hiện đăng nhập
var nut = document.getElementsByClassName('auth-form__tieude-dangnhap')
function hienthidangky (){
    khungdangky[0].classList.remove('openform1')
    khungdangky[1].classList.add('openform2')
}
function hienthidangnhap (){
    khungdangky[0].classList.add('openform1')
    khungdangky[1].classList.remove('openform2')
}
nut[0].addEventListener('click',hienthidangky)
nut[1].addEventListener('click',hienthidangnhap)
var tatbanglophu = document.getElementsByClassName('modal__lopphu')
function tat (){
    khungdangky[1].classList.remove('openform2')
    khungdangky[0].classList.remove('openform1')
}
tatbanglophu[0].addEventListener('click',tat)
tatbanglophu[1].addEventListener('click',tat)
// Xong phần hiển thị đăng kí đăng nhập
// Định nghĩa rules
function Validator(opitions){
    function validate (inputElement, rule){
        var erroElement = inputElement.parentElement.querySelector('.form-message')
        var erroMessage = rule.test(inputElement.value)
        if (erroMessage){
            erroElement.innerText = erroMessage
            }
        else {
            erroElement.innerText = ''
        }
        return !erroMessage
    }
    var formElement = document.querySelector(opitions.form)

    if (formElement){
        formElement.onsubmit = function (e){
            e.preventDefault();

            var isFormValid = true;

            opitions.rules.forEach(function(rule){
                var inputElement = formElement.querySelector(rule.selector)
                var isValid = validate (inputElement, rule)
                if (!isValid){
                    isFormValid = false
                }
            })          
            if (isFormValid){
                if (typeof opitions.onSubmit === 'function'){
                    var enableInputs = formElement.querySelectorAll('[name]')
                    var fomrmValues = Array.from(enableInputs).reduce(function(values, input){
                        return (values[input.name] = input.value) && values
                    }, {})
                    opitions.onSubmit(fomrmValues)
                }     
            }
            }
        }
       opitions.rules.forEach(function(rule){
        var inputElement = formElement.querySelector(rule.selector)
        if (inputElement){
            // Xử lý khi blur ra khỏi ô input
            inputElement.onblur = function(){
                validate(inputElement,rule)
                }
            }
            // Xử lý khi nhập vào ô input
            inputElement.oninput = function (){
                var erroElement = inputElement.parentElement.querySelector('.form-message')
                var erroMessage = rule.test(inputElement.value)
                erroElement.innerText = ''
            }
        })
    }

Validator.isPhone = function(selector){
    return {
        selector: selector,
        test: function(value){
            return value.trim() ? undefined : '! Vui lòng nhập trường này'
        }
    }
} 

Validator.isPassword = function(selector, min){ 
    return {
        selector: selector,
        test: function(value){
            return value.length >=min ? undefined : `! Vui lòng nhập mật khẩu tối thiểu ${min} ký tự`
        }
    }
}
Validator.isnhaplaiPassword = function (selector, nhaplaimatkhau){
    return {
        selector: selector,
        test: function(value){
            return value === nhaplaimatkhau() ? undefined: 'Gía trị nhập vào không chính xác'
        }
    }
}
Validator ({
    form: '.form1',
    rules: [
        Validator.isPhone ('.auth-form__tieude-nhapthongtin__sdt'),
        Validator.isPassword ('.auth-form__tieude-nhapthongtin__matkhau',8),
    ] ,
    onSubmit: function (data){
        console.log(data)
    }
})
Validator ({
    form: '.form2',
    rules: [
        Validator.isPhone ('.auth-form__tieude-nhapthongtin__sdt'),
        Validator.isPassword ('.auth-form__tieude-nhapthongtin__matkhau',8),
        Validator.isnhaplaiPassword('.auth-form__tieude-nhapthongtin__nhaplaimatkhau', nhaplaimatkhau = function(){
            return document.querySelector('.form2 .auth-form__tieude-nhapthongtin__matkhau').value
        }),
        
    ] ,
    onSubmit: function (data){
        console.log(data)
    }
    
})