const get_url='https://text-translator2.p.rapidapi.com/getLanguages';
let translateFrom=document.querySelector('#translateFrom')
let translateTo=document.querySelector('#translateTo')
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b4444ff329mshc073181333238cep115507jsn36b44ba70186',
		'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
	}
};
let source_language='es';
let target_language='en';
fetch(get_url,options)
.then(res=>res.json())
.then(obj=>{
    let lenguajes=obj.data.languages
    lenguajes.forEach(element=>{
        translateFrom.innerHTML+=`<option value="${element.code}">${element.name}</option>`
        translateTo.innerHTML+=`<option value="${element.code}">${element.name}</option>`
    })
    translateFrom.addEventListener('click',()=>{
        source_language= translateFrom.value; 
    })
    translateTo.addEventListener('click',()=>{
        target_language=translateTo.value;
    })
})

.catch(error=>error)

let translateBtn=document.querySelector('#translate')
translateBtn.addEventListener('click',()=>{
    let inputTranslate=document.querySelector('#input')
    let textToTranslate=inputTranslate.value;

    const encodedParams = new URLSearchParams();
    encodedParams.append("source_language", source_language);
    encodedParams.append("target_language", target_language);
    encodedParams.append("text", textToTranslate);

    const options = {
	  method: 'POST',
	  headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': 'b4444ff329mshc073181333238cep115507jsn36b44ba70186',
		'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
	    },
	   body: encodedParams
    };

const translateTo=document.querySelector('#output')

     fetch('https://text-translator2.p.rapidapi.com/translate', options)
	    .then(response => response.json())
	    .then(response => translateTo.value=response.data.translatedText)
	    .catch(err => console.error(err));
})
