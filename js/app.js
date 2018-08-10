$(document).ready( () => {
    
    const products = (items) => {
        items.forEach ((item) => {
            let name = item.title;
            let image =  item.thumbnail;
            let price = item.price;
            let id = item.id;
            $('#elements').append(template(name, image, price));
        })
    }
    const template = (name, image, price) => {
        let t = `<figure  id= 'elements' class='products col s8 m4 l4 offset-s1 offset-m1 offset-l1'>
        <img src='${image}' />
        <figcaption>${name}</figcaption>
        <p>$${price}.00</p>
        <a class="waves-effect waves-light btn modal-trigger  offset-s6" id="button2" href="#modal1">Ver más</a>
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

    const printCall2 = (item) => {
        let name = item.name;
        let image = item.image;
        let price = item.price;
        let id = item.id;
        call2(id);
        $('#modal1').append(template2(name, image, price));
        console.log(printCall2);
    }
    $('#button2').click ((event) => {
        event.preventDefault();
        console.log('boton click');
        const call2 = (id) => {
        $.ajax({
            url:`https://api.mercadolibre.com/items/${id}`,         
            type: 'GET',
            datatype: 'json',
            crossDomain: true
        })
        .done ((response) => {
            console.log(response); 
            //printCall2(response.id);
        })
    } 

    });
    const template2 = (name,image,price) => {
        let q =`<div id= "modal1" class="modal-content">
                <h4>${name}</h4>
                <img src='${image}'/>
                <h5>${price}</h5>
                <div id="paypal-button"></div>
            </div>
            <div class="modal-footer">
                <a href="#!" class="modal-close waves-effect waves-green btn-flat">Cerrar</a>
            </div>`;
        return q;
    }
    // 
        $('.modal').modal();

        paypal.Button.render({
            env: 'sandbox',
            client: {
                sandbox: 'demo_sandbox_client_id'
            },
            payment: function (data, actions) {
                return actions.payment.create({
                    transactions: [{
                        amount: {
                            total: '0.01',
                            currency: 'USD'
                        }
                    }]
                });
            },
            onAuthorize: function (data, actions) {
                return actions.payment.execute()
                .then(function () {
                    window.alert('Thank you for your purchase!');
                });
            }
        }, '#paypal-button');
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