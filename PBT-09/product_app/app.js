const products = [
    {
        id:1,
        name:"Hoa Hàn Quốc",
        price:350000,
        category:"HQ",
        image:"https://hoayeuthuong.com/hinh-hoa-chinh/hoa-chuc-mung/16060_shine-on-me.jpg",
        rating:4.8,
        inStock:true
    },
    {
        id:2,
        name:"Hoa Hồng Trắng",
        price:320000,
        category:"rose",
        image:"https://hoayeuthuong.com/hinh-hoa-chinh/hoa-chuc-mung/4041_doa-hoa-diu-dang.jpg",
        rating:4.5,
        inStock:true
    },
    {
        id:3,
        name:"Hoa sinh nhật",
        price:280000,
        category:"birthday",
        image:"https://hoayeuthuong.com/hinh-hoa-chinh/hoa-chuc-mung/3653_trai-tim-diu-dang.jpg",
        rating:4.7,
        inStock:true
    },
    {
        id:4,
        name:"Cẩm tú cầu",
        price:450000,
        category:"flower",
        image:"https://hoayeuthuong.com/hinh-hoa-chinh/bo-hoa-tuoi/15296_cam-tu-cau-va-em.jpg",
        rating:4.9,
        inStock:true
    },
    {
        id:5,
        name:"Hoa Hồng Vàng",
        price:500000,
        category:"rose",
        image:"https://hoayeuthuong.com/hinh-hoa-chinh/hoa-chuc-mung/14647_cheers.jpg",
        rating:4.6,
        inStock:true
    },
    {
        id:6,
        name:"Hoa kiểu Hàn",
        price:550000,
        category:"HQ",
        image:"https://hoayeuthuong.com/hinh-hoa-chinh/bo-hoa-tuoi/2453_garden-style.jpg",
        rating:4.8,
        inStock:true
    },
];

let currentProducts = [...products];
let cartCount = 0;

createLayout();
renderProducts(currentProducts);

function createLayout(){

    const body = document.body;

    const header = document.createElement("div");
    header.className = "header";

    const title = document.createElement("h1");
    title.textContent = "🌸 Flower Shop";

    const right = document.createElement("div");

    const darkBtn = document.createElement("button");
    darkBtn.textContent = "🌙 Dark Mode";

    darkBtn.addEventListener("click",()=>{
        document.body.classList.toggle("dark-mode");
    });

    const cart = document.createElement("div");
    cart.className = "cart";
    cart.innerHTML = "🛒";

    const badge = document.createElement("span");
    badge.className = "badge";
    badge.id = "badge";
    badge.textContent = "0";

    cart.appendChild(badge);

    right.appendChild(darkBtn);
    right.appendChild(cart);

    header.append(title,right);

    body.appendChild(header);

    const controls = document.createElement("div");
    controls.className = "controls";

    const search = document.createElement("input");
    search.placeholder = "Tìm hoa...";

    search.addEventListener("input",(e)=>{
        searchProducts(e.target.value);
    });

    const sort = document.createElement("select");

    sort.innerHTML = `
        <option value="">Sắp xếp</option>
        <option value="priceAsc">Giá tăng</option>
        <option value="priceDesc">Giá giảm</option>
        <option value="name">Tên A-Z</option>
        <option value="rating">Đánh giá cao nhất</option>
    `;

    sort.addEventListener("change",(e)=>{
        sortProducts(e.target.value);
    });

    controls.append(search,sort);

    body.appendChild(controls);

    const categories = document.createElement("div");
    categories.className = "categories";

    const list = [
        "all",
        "HQ",
        "rose",
        "birthday",
        "flower"
    ];

    list.forEach(cat=>{
        const btn = document.createElement("button");
        btn.textContent = cat.toUpperCase();
        btn.addEventListener("click",()=>{
            filterByCategory(cat);
        });
        categories.appendChild(btn);
    });

    body.appendChild(categories);

    const container = document.createElement("div");
    container.className = "product-container";
    container.id = "products";
    body.appendChild(container);
}

function renderProducts(data){

    const container = document.getElementById("products");
    container.innerHTML = "";
    data.forEach(product=>{
        const card = document.createElement("div");
        card.className = "card";
        card.addEventListener("click",()=>{
            showModal(product);
        });

        const img = document.createElement("img");
        img.src = product.image;

        const name = document.createElement("h3");
        name.textContent = product.name;

        const price = document.createElement("p");
        price.className = "price";
        price.textContent =
            product.price.toLocaleString("vi-VN")+" đ";

        const rating = document.createElement("p");
        rating.className = "rating";
        rating.textContent = "⭐ "+product.rating;

        const btn = document.createElement("button");
        btn.textContent = "Thêm giỏ";

        btn.addEventListener("click",(e)=>{
            e.stopPropagation();
            cartCount++;
            document.getElementById("badge").textContent =
                cartCount;
        });

        card.append(
            img,
            name,
            price,
            rating,
            btn
        );

        container.appendChild(card);
    });
}

function filterByCategory(category){
    if(category === "all"){
        currentProducts = [...products];
    }else{
        currentProducts =
            products.filter(
                p => p.category === category
            );
    }

    renderProducts(currentProducts);
}

function searchProducts(keyword){
    const result = products.filter(product=>
        product.name
            .toLowerCase()
            .includes(keyword.toLowerCase())
    );
    currentProducts = result;
    renderProducts(result);
}

function sortProducts(type){
    let sorted = [...currentProducts];
    switch(type){
        case "priceAsc":
            sorted.sort((a,b)=>a.price-b.price);
            break;
        case "priceDesc":
            sorted.sort((a,b)=>b.price-a.price);
            break;
        case "name":
            sorted.sort((a,b)=>
                a.name.localeCompare(b.name)
            );
            break;
        case "rating":
            sorted.sort((a,b)=>
                b.rating-a.rating
            );
            break;
    }
    renderProducts(sorted);
}

function showModal(product){
    const modal = document.createElement("div");
    modal.className = "modal";
    const content = document.createElement("div");
    content.className = "modal-content";
    content.innerHTML = `
        <span class="close">&times;</span>
        <img src="${product.image}">
        <h2>${product.name}</h2>
        <p>Giá:
            ${product.price.toLocaleString("vi-VN")} đ
        </p>
        <p>Đánh giá: ⭐ ${product.rating}</p>
        <p>
            ${product.inStock ? "Còn hàng" : "Hết hàng"}
        </p>
    `;
    modal.appendChild(content);
    document.body.appendChild(modal);
    content
        .querySelector(".close")
        .addEventListener("click",()=>{
            modal.remove();
        });

    modal.addEventListener("click",(e)=>{
        if(e.target === modal){
            modal.remove();
        }
    });
}