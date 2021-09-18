
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const errorPara = document.querySelector('#para1');
const successPara = document.querySelector('#para2');
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value
    errorPara.textContent = "Loading...";
    successPara.textContent = "";
    fetch(`http://localhost:5050/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                errorPara.textContent = data.error
                successPara.textContent = ""
            }else{
                errorPara.textContent = ""
                successPara.textContent = data.location
                successPara.textContent = data.forecast
            }
        })
})

})