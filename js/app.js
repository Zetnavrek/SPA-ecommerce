$(document).ready( () => {
    
    const products = (items) => {
        items.forEach ((item) => {
            let name = item.title;
            let image =  item.thumbnail;
            let price = item.price;
            $('#elements').append(template(name, image, price));
        })
    }
    const template = (name, image, price) => {
        let t = `<figure id= 'elements' class='products col s8 m4 l4 offset-s1 offset-m1 offset-l1 '>
        <img src='${image}' />
        <figcaption>${name}</figcaption>
        <p>$${price}.00</p>
        </figure>`;
        return t;
    }
    $('.category').click((event) => {
        event.preventDefault();
        specificCategory(event.target.id);
    })
    const specificCategory = (selected) => {
        $.ajax({
            url:'https://api.mercadolibre.com/sites/MLM/search?q=' + selected,         
            type: 'GET',
            datatype: 'json',
            crossDomain: true
        })
        .done ((response) => {
            console.log(response); 
            products(response.results);
        })
    } 
    //const seeItems = (items) => {
    //     $('#search').click ( (event) => {
    //         console.log('boton clickeado');
    //         event.preventDefault();
    //         const item = $('search-item').val();
    //         console.log(item);
    //         callItems(item);
    //     })
    // const callItems = (item) => {
    // $.ajax({
    //     url:`https://api.mercadolibre.com/sites/MLM/search?q=${item}`,         
    //     type: 'GET',
    //     datatype: 'json',
    //     crossDomain: true
    // })
    // .done ((response) => {
    //     console.log(response); 
    // })
    // }
});



/*fetch('https://api.mercadolibre.com/items/')
.then((response) => {
    return response.json();
    console.log (response);
    .then 
});
.catch((error) => {
    console.log(JSDON.stringify(error));
});*/