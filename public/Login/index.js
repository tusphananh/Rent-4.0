const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

async function signUp(e){
	e.preventDefault();
	const name = document.querySelector('#sign-up-name')
	const phone = document.querySelector('#sign-up-phone')
	const password = document.querySelector('#sign-up-password')

	const data = {
		name: name.value, 
		phone: phone.value,
		password: password.value
	}
	const result = await fetch('/api/signup',{
		method: 'POST',
		headers:{
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).then(response => response.json()).then(result => {
		const error = document.querySelector('#sign-up-error')
		const success = document.querySelector('#sign-up-success')
		if(result.status === 'error'){
			error.innerHTML = result.error
			error.style.display = 'initial'
			success.style.display = 'none'
		}
		else{
			error.innerHTML = ''
			error.style.display = 'none'
			success.style.display = 'initial'
		
			signInButton.click()
		}
	})
}

async function signIn(e){
	e.preventDefault();
	const phone = document.querySelector('#sign-in-phone')
	const password = document.querySelector('#sign-in-password')
	console.log('sign in')

	const data = {
		phone: phone.value,
		password: password.value
	}
	const result = await fetch('/api/signin',{
		method: 'POST',
		headers:{
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).then(response => response.json()).then(result => {
		const error = document.querySelector('#sign-in-error')
		const success = document.querySelector('#sign-in-success')
		if(result.status === 'error'){
			error.innerHTML = result.error
			error.style.display = 'initial'
			success.style.display = 'none'
		}
		else{	
			error.innerHTML = ''
			error.style.display = 'none'	
			success.style.display = 'initial'

			user = result.user
			console.log(user)
			location.replace(`http://localhost:3000/search`)
		}
	})
}

