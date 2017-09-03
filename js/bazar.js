$(document).ready(function(){
    // produtos selecionados
    var selectedProducts = [];

    // lista de produtos
    var products = [
        {name: "Camisa Masculina Vermelho Vinho", price: 15.9, selected: false, category: "clothes", img: "img/p1.jpg"},
        {name: "Vestido Feminino Azul Escuro", price: 24.5, selected: false, category: "clothes", img: "img/p4.jpg"},
        {name: "Sapato Feminino Preto", price: 17, selected: false, category: "footwear", img: "img/p21.jpg"},
        {name: "Centro de Mesa Decorativo", price: 5.25, selected: false, category: "decoration", img: "img/p10.jpg"},
        {name: "Poltrona Simples", price: 30, selected: false, category: "decoration", img: "img/p7.jpg"},
        {name: "Calça Jeans Masculina", price: 19.9, selected: false, category: "clothes", img: "img/p18.jpg"},
        {name: "Sapato Feminino Vinho", price: 12.69, selected: false, category: "footwear", img: "img/p24.jpg"},
        {name: "Camisa Masculina Branca", price: 23.90, selected: false, category: "clothes", img: "img/p15.jpg"},
        {name: "Baú Artesanal", price: 10.2, selected: false, category: "decoration", img: "img/p13.jpg"},
        {name: "Tênis Trilha Masculino", price: 15.8, selected: false, category: "footwear", img: "img/p22.jpg"},
        {name: "Camisa Masculina Azul", price: 17.7, selected: false, category: "clothes", img: "img/p0.jpg"},
        {name: "Calça Jeans Feminina", price: 20.1, selected: false, category: "clothes", img: "img/p20.jpg"},
        {name: "Abacaxi de Vidro", price: 16.1, selected: false, category: "decoration", img: "img/p5.jpg"},
        {name: "Vestido Feminino Amarelo", price: 17.75, selected: false, category: "clothes", img: "img/p2.jpg"},
        {name: "Conjunto de Pratos de Cerâmica", price: 9, selected: false, category: "decoration", img: "img/p12.jpg"},
        {name: "Camisa Jeans Feminina", price: 22.2, selected: false, category: "clothes", img: "img/p16.jpg"},
        {name: "Camisa Feminina Azul", price: 17.4, selected: false, category: "clothes", img: "img/p17.jpg"},
        {name: "Objeto Decorativo", price: 7.95, selected: false, category: "decoration", img: "img/p6.jpg"},
        {name: "Poltrona Rotativa", price: 34.15, selected: false, category: "decoration", img: "img/p14.jpg"},
        {name: "Sapato Social Masculino", price: 20.3, selected: false, category: "footwear", img: "img/p23.jpg"},
        {name: "Elefante Colorido", price: 12.9, selected: false, category: "decoration", img: "img/p11.jpg"},
        {name: "Fruteira Centro de Mesa", price: 7.5, selected: false, category: "decoration", img: "img/p8.jpg"},
        {name: "Vestido Feminino Azul Escuro", price: 19.9, selected: false, category: "clothes", img: "img/p3.jpg"},
        {name: "Calça Jeans Feminina", price: 14.45, selected: false, category: "clothes", img: "img/p19.jpg"}
    ];

    // adicionar produtos na lista
    products.forEach(function(product, index) {
        $("#products-list").append(
            "<div class='col-sm-6 col-md-3 product-square product-" + product.category + "'>" +
                "<div class='panel panel-primary product-card' data-product='" + JSON.stringify(product) + "'>" +
                    "<div class='badge product-price'>" + currency(product.price) + "</div>" +
                    "<div class='panel-body'>" +
                        "<img src='" + product.img + "' class='product-image img-responsive' alt='" + product.name + "'>" +
                    "</div>" +
                    "<div class='panel-footer text-center'>" +
                        "<p>" + product.name + "</p>" +
                        "<button class='btn-add-product btn btn-primary btn-block'>" +
                            "<i class='fa fa-cart-plus'></i>" +
                            "<span> Adicionar</span>" +
                        "</button>" +
                    "</div>" +
                "</div>" +
            "</div>"
        );
    });


    // ao clicar adicionar ao carrinho
    $("#products-section").on("click", ".btn-add-product", function(){
        var $button = $(this);
        var $product = $button.closest(".product-card");
        var product = $product.data("product");

        // verificar se produto ja foi selecionado
        if(product.selected) {
            // remover produto
            var index = selectedProducts.indexOf(product);
            selectedProducts.splice(index, 1);
            $product.removeClass("selected");
            $product.removeClass("panel-success");
            $button.removeClass("btn-warning")
                .find("span").text(" Adicionar");
        } else {
            // adicionar produto
            selectedProducts.push(product);
            $product.addClass("panel-success");
            $button.addClass("btn-warning")
                .find("span").text(" Remover");
        }

        // mudar valor de selecao do produto
        product.selected = !product.selected;

        // atualizar qtd carrinho
        $("#cart-length").text(selectedProducts.length);
    })

    
    // ao clicar categoria da coluna lateral
    $(".list-group-item").on("click", function(){
        var category = $(this).data("category");
        $(".list-group-item").removeClass("selected");
        $(this).addClass("selected");
        if(category === "all") {
            $(".product-square").removeClass("hidden");
        } else {
            $(".product-square").addClass("hidden");
            $(".product-" + category).removeClass("hidden");
        }

    });


    // ao clicar em meu carrinho
    $(".open-modal").on("click", function() {
        // listar os produtos selecionados no modal
        $(".modal-body").empty();
        var total = 0;
        selectedProducts.forEach(function(product, index) {
            total += product.price;
            $(".modal-body").append(
                "<div class='row'>" +
                    "<div class='col-xs-9'>" + product.name + "</div>" +
                    "<div class='col-xs-3'>" + currency(product.price) + "</div>" +
                "</div>"
            );
        });
        $(".modal-body").append(
            "<div class='row'>" +
                "<div class='col-xs-9 text-right'>Total</div>" +
                "<div class='col-xs-3'>" + currency(total) + "</div>" +
            "</div>"
        );
    });


    // funcao para formatar preco
    function currency(value){
        return "R$ " + value.toFixed(2).replace(".", ",");
    }
});