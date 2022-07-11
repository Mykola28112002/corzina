
const productsBtn = document.querySelectorAll('.corzina-btn');
const cartProductsList = document.querySelector('.list__js');
const cart = document.querySelector('.cart');
const cartQuantity = document.querySelector('.cart__quantity');
const fullPrice = document.querySelector('.fullprice');
const cartBox = document.querySelector('.box__js');
const cartProducts = document.querySelectorAll('.list__js');
let price = 0;




const randomId = () => {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const priceWithoutSpaces = (str) => {
	return str.replace(/\s/g, '');
};

const normalPrice = (str) => {
	return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

const plusFullPrice = (currentPrice) => {
	return price += Math.round(currentPrice) + 1 ;
};

const minusFullPrice = (currentPrice) => {
	return price -= Math.round(currentPrice) + 1;
};
const printFullPrice = () => {
	fullPrice.textContent = `${normalPrice(price)} zl`;
};
const printQuantity = () => {
	let productsList = cartProductsList.children;
	let productsListLength = productsList.length;
	cartQuantity.textContent = productsListLength;
	productsListLength === 0 ? cartQuantity.classList.add('un-active-qvontiti') : cartQuantity.classList.remove('un-active-qvontiti');

};

	


const generateCartProduct = (img, title, price, id) => {
	return `
		
        <li class="cart__item product" data-id="${id}">
			<div class="cart__box">
				<img class="image-switch__img img" src ="${img}" alt="" width="130">
				<div>
				    <h2 class="cart-item__title">${title}</h2>
					<span class="cart-product__price">${normalPrice(price)}</span>
				</div>
				<button  type="button" class="corzina-btn__close">
					<svg class="btn__close-svg">
						<use class="icon-cross" href="images/symbol-defs.svg#icon-close"></use>
					</svg>
				</button>
			</div>
		</li>
	`;
};


printQuantity();

const deleteProducts = (productParent) => {
	
	let id = productParent.dataset.id;
	
	document.querySelector(`.item-js[data-id="${id}"]`).querySelector('.corzina-btn').disabled = false;
	let currentPrice = parseInt(priceWithoutSpaces(productParent.querySelector('.cart-product__price').textContent));
	
	minusFullPrice(currentPrice);
	printFullPrice();
	productParent.remove();

	sessionStorageHost();


	printQuantity();
	
};

productsBtn.forEach(el => {
	el.closest('.product').setAttribute('data-id', randomId());
    
	el.addEventListener('click', (e) => {
		let self = e.currentTarget;
		let parent = self.closest('.product');
		let id = parent.dataset.id;
		let img = parent.querySelector('.img').getAttribute('src');
		let title = parent.querySelector('.title').textContent;
		let priceString = priceWithoutSpaces(parent.querySelector('.menu__price').textContent);
		let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector('.menu__price').textContent));
		
		plusFullPrice(priceNumber);

		printFullPrice();

		cartProductsList.insertAdjacentHTML('afterbegin', generateCartProduct(img, title, priceString, id));
		

		self.disabled = true;
		sessionStorageHost();


		printQuantity();

     
	});
});

cartProductsList.addEventListener('click', (e) => {
	deleteProducts(e.target.closest('.product'))
});
const sessionStorageHost = () => { 
	const li = cartProductsList.outerHTML
	sessionStorage.setItem("cartProductsList", JSON.stringify(li))
};


let savedSettings = sessionStorage.getItem("cartProductsList")
let	parsedSettings = JSON.parse(savedSettings);
cartProductsList.insertAdjacentHTML("beforeend", parsedSettings);
printQuantity();
