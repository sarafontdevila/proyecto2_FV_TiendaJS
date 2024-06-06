const products = [
  {
    name: 'Batman',
    price: 60,
    stars: 4,
    reviews: 250,
    seller: 'Amazon',
    image: './assets/batman.png'
  },
  {
    name: 'Supergirl',
    price: 70,
    stars: 4,
    reviews: 250,
    seller: 'DisfrazUnique',
    image: './assets/supergirl.png'
  },
  {
    name: 'Hulk',
    price: 25,
    stars: 5,
    reviews: 250,
    seller: 'Dresssing',
    image: './assets/hulk.png'
  },
  {
    name: 'Wonderwoman',
    price: 85,
    stars: 3,
    reviews: 250,
    seller: 'PlayFun',
    image: './assets/wonderwoman.png'
  },
  {
    name: 'Spiderman',
    price: 90,
    stars: 4,
    reviews: 250,
    seller: 'Amazon',
    image: './assets/spiderman.png'
  },
  {
    name: 'Black Panther',
    price: 289,
    stars: 4,
    reviews: 250,
    seller: 'DisfrazUnique',
    image: './assets/blackpanther.png'
  },
  {
    name: 'Black Widow',
    price: 68,
    stars: 5,
    reviews: 250,
    seller: 'PlayFun',
    image: './assets/blackwidow.png'
  },
  {
    name: 'Capitan America-Boy',
    price: 70,
    stars: 5,
    reviews: 250,
    seller: 'Amazon',
    image: './assets/captainamerica.png'
  },
  {
    name: 'Catwoman',
    price: 95,
    stars: 4,
    reviews: 250,
    seller: 'PlayFun',
    image: './assets/catwoman.png'
  }
]

let SELLERS = []
let SELLER = ''
let PRICE = 0
let STARS = 0

const searchInput = document.getElementById('searchInput')
const notFound = document.getElementById('notFound')

const filter = () => {
  const filtered = products.filter(
    (product) =>
      (SELLER === '' || SELLER === product.seller) &&
      (PRICE === 0 || PRICE >= product.price) &&
      (STARS === 0 || STARS <= product.stars)
  )
  printProducts(filtered)
}

const fillNames = (products) => {
  SELLERS.splice(0)
  for (const product of products) {
    if (!SELLERS.includes(product.seller)) {
      SELLERS.push(product.seller)
    }
  }
}
fillNames(products)

window.onload = () => {
  fillNames(products)
  createSelectSellers()
  createPriceFilter()
  createClearFilter()
}

const createSelectSellers = () => {
  const divFilterSeller = document.querySelector('#filters')

  const selectSeller = document.createElement('select')
  selectSeller.classList.add('flex-container')

  const optionEmpty = document.createElement('option')
  optionEmpty.value = ''
  optionEmpty.textContent = 'Sellers'
  selectSeller.appendChild(optionEmpty)

  for (const seller of SELLERS) {
    const option = document.createElement('option')
    option.value = seller
    option.textContent = seller

    selectSeller.appendChild(option)
  }
  divFilterSeller.appendChild(selectSeller)

  selectSeller.addEventListener('change', (event) => {
    SELLER = event.target.value
    filter()
  })
}
const filterByPrice = () => {
  const maxPrice = parseFloat(document.getElementById('priceFilter').value)
  PRICE = maxPrice
  filter()
}

const createPriceFilter = () => {
  const divFilters = document.querySelector('#filters')
  const divFilter = document.createElement('div')
  divFilter.classList.add('flex-container')

  const inputPrice = document.createElement('input')
  inputPrice.type = 'number'
  inputPrice.id = 'priceFilter'
  inputPrice.placeholder = 'Max Price'

  const searchButton = document.createElement('button')
  searchButton.id = 'searchButton'
  searchButton.textContent = 'Search Price'

  divFilter.appendChild(inputPrice)
  divFilter.appendChild(searchButton)

  divFilters.appendChild(divFilter)

  searchButton.addEventListener('click', () => {
    const maxPrice = parseFloat(inputPrice.value)
    PRICE = maxPrice
    filterByPrice(maxPrice)
  })
}

const createClearFilter = () => {
  const divClearFilters = document.querySelector('#filters')
  const divClearFilter = document.createElement('div')
  divClearFilter.classList.add('flex-container')

  const clearButton = document.createElement('button')
  clearButton.id = 'clearButton'
  clearButton.textContent = 'Clear Filter'

  divClearFilter.appendChild(clearButton)
  divClearFilters.appendChild(divClearFilter)

  clearButton.addEventListener('click', () => {
    SELLER = ''
    PRICE = 0
    document.getElementById('priceFilter').value = ''

    const selectSeller = document.querySelector('select')
    selectSeller.SelectedIndex = 0
    selectSeller.value = ''
    printProducts(products)
  })
}
const handleSearch = () => {
  const searchTerm = searchInput.value.toLowerCase()
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().startsWith(searchTerm)
  )
  printProducts(filteredProducts)
}

const printProducts = (array) => {
  const divProducts = document.querySelector('#Products')
  divProducts.innerHTML = ''
  if (array.length === 0) {
    notFound.style.display = 'block'
    const sampleProducts = products.slice(0, 2)
    for (const product of sampleProducts) {
      const divProduct = document.createElement('img')
      divProduct.src = product.image
      divProducts.append(divProduct)
    }
  } else {
    notFound.style.display = 'none'

    for (const product of array) {
      const divProduct = document.createElement('div')
      const divImg = document.createElement('div')
      const image = document.createElement('img')
      const name = document.createElement('h3')
      const price = document.createElement('p')
      const reviews = document.createElement('p')
      const seller = document.createElement('p')
      const divStars = document.createElement('div')

      for (let i = 1; i <= 5; i++) {
        const star = document.createElement('div')
        star.className = 'star'
        if (i <= product.stars) {
          star.classList.add('full')
        }
        divStars.appendChild(star)
      }

      divProduct.className = 'flex-container'
      divImg.classList.add('imgCont')
      divStars.classList.add('stars')
      divStars.classList.add('flex-container')
      image.src = product.image
      name.textContent = product.name
      price.textContent = product.price + ' EUR'
      reviews.textContent = product.reviews + ' Reviews'
      seller.textContent = product.seller + ' Seller'
      divImg.style.backgroundColor = 'var(--dx-special-color-7)'

      divProduct.appendChild(divImg)
      divImg.appendChild(image)
      divProduct.appendChild(name)
      divProduct.appendChild(price)
      divProduct.appendChild(reviews)
      divProduct.appendChild(seller)
      divProduct.appendChild(divStars)
      divProducts.appendChild(divProduct)
    }
  }
}

printProducts(products)
searchInput.addEventListener('input', handleSearch)
