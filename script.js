const toggle = document.querySelector('.nav__toggle')
const menu = document.querySelector('.nav__menu')

toggle.addEventListener('click', () => {
  menu.classList.toggle('active')
})

const courses = [
  {
    id:"c1",
    title: "SPSS Pemula hingga Mahir 🔥",
    hours: 50,
    lessons: 130,
    description: "Belajar Olah Data SPSS di VIP Learning Class (VLC) 7.1 Educativa: Mastering Statistical Analysis with SPSS (Studi Kasus Analisis Regresi)",
    rating: 4.5,
    reviews: "1.4k",
    price: "25.000",
    oldPrice: "250.000",
    badge: "Popular",
    image: "assets/images/card_image_1.png"
  },
  {
    id:"c2",
    title: "SmartPLS & AMOS: SEM & PLS Masterclass",
    hours: 80,
    lessons: 180,
    description: "Belajar AMOS & SmartPLS di VIP Learning Class (VLC) 6.0: Ahli Metode SEM-PLS dengan Software AMOS & SmartPLS! Dijamin langsung bisa karena belajar dari ahlinya!",
    rating: 4.5,
    reviews: "1.4k",
    price: "35.000",
    badge: "Popular",
    image: "assets/images/card_image_2.png"
  },
  {
    id:"c3",
    title: "NVivo for Beginners + Olah Data Kualitatif dengan AI",
    hours: 50,
    lessons: 130,
    description: "Belajar Kualitatif dan AI di VIP Learning Class (VLC) - Olah Data Kualitatif Jadi Cepat dan Mudah dengan NVIVO dan AI dalam 2 kali Pelatihan!",
    rating: 4.5,
    reviews: "1.4k",
    price: "150.000",
    oldPrice: "450.000",
    badge: "New",
    image: "assets/images/card_image_3.png"
  }
];

const grid = document.getElementById("coursesGrid");

grid.innerHTML = courses.map(c => `
  <article class="course-card" data-id="${c.id}">
    <div class="course-media">
      <img src="${c.image}" alt="">
      ${c.badge ? `<span class="badge ${c.badge === "New" ? "new" : ""}">${c.badge}</span>` : ""}
    </div>
    <div class="course-body">
      <div class="course-meta">
        <span>${c.hours} hours</span>
        <span>${c.lessons} lessons</span>
      </div>
      <h3>${c.title}</h3>
      <p class="description">${c.description}</p>
      <div class="course-rating">
        <span class="stars">★★★★★</span>
        <span>${c.rating} (${c.reviews} Ulasan)</span>
      </div>
      <div class="course-price">
        <span class="price">Rp${c.price}</span>
        ${c.oldPrice ? `<span class="old">Rp${c.oldPrice}</span>` : ""}
      </div>
    </div>
    <div class="card-actions">
      <button class="icon-btn wishlist" aria-label="Add to wishlist">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="2">
          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>
        </svg>
      </button>

      <button class="icon-btn cart" aria-label="Add to cart">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="2">
          <circle cx="9" cy="20" r="1"/>
          <circle cx="17" cy="20" r="1"/>
          <path d="M3 3h2l2.4 12.5a2 2 0 0 0 2 1.5h7.6a2 2 0 0 0 2-1.6L21 7H6"/>
        </svg>
      </button>
    </div>
  </article>
`).join("");

document.addEventListener("click", e => {

  const wishBtn = e.target.closest(".wishlist");
  const cartBtn = e.target.closest(".cart");

  if (wishBtn) {
    const id = wishBtn.closest(".course-card").dataset.id;
    const navWish = document.getElementById("wishlistBtn");
    flyIconToTarget(wishBtn, navWish);

    const i = wishlist.indexOf(id);
    if (i > -1) wishlist.splice(i,1);
    else wishlist.push(id);

    localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
    wishBtn.classList.toggle("active");
    updateBadge();
  }

  if (cartBtn) {
    const card = cartBtn.closest(".course-card");
    const navCart = document.getElementById("cartBtn");
    const id = card.dataset.id;
    flyIconToTarget(cartBtn, navCart);
    console.log(navCart);

    cart.push(id);
    localStorage.setItem(cartKey, JSON.stringify(cart));
    updateBadge();
  }

});

const wishlistKey = "wishlist";
const cartKey = "cart";

const wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];
const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

const wishlistCount = document.getElementById("wishlistCount");
const cartCount = document.getElementById("cartCount");

function updateBadge() {
  wishlistCount.textContent = wishlist.length;
  cartCount.textContent = cart.length;
}

updateBadge();

function flyIconToTarget(sourceBtn, targetBtn) {
  const srcRect = sourceBtn.getBoundingClientRect();
  const tgtRect = targetBtn.getBoundingClientRect();

  const icon = sourceBtn.querySelector('svg');
  const clone = icon.cloneNode(true);
  clone.classList.add("fly-item");
  document.body.appendChild(clone);

  clone.style.left = srcRect.left + "px";
  clone.style.top = srcRect.top + "px";
  clone.style.width = srcRect.width + "px";
  clone.style.height = srcRect.height + "px";
  clone.style.color = "var(--color-secondary)";

  requestAnimationFrame(() => {
    const dx = (tgtRect.left + tgtRect.width / 2) - (srcRect.left + srcRect.width / 2);
    const dy = (tgtRect.top + tgtRect.height / 2) - (srcRect.top + srcRect.height / 2);

    clone.style.transform = `translate(${dx}px, ${dy}px) scale(.6)`;
    clone.style.opacity = "0";
  });

  setTimeout(() => clone.remove(), 700);
}

document.querySelectorAll(".course-card").forEach(card => {
  const id = card.dataset.id;
  if (wishlist.includes(id)) {
    card.querySelector(".wishlist")?.classList.add("active");
  }
});

const modal = document.getElementById("promoModal");
const openBtn = document.getElementById("openPromo");
const closeBtn = document.getElementById("modalClose");

function openModal() {
  modal.classList.add("show");
  modal.setAttribute("aria-hidden","false");
}

function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden","true");
}

openBtn?.addEventListener("click", openModal);
closeBtn?.addEventListener("click", closeModal);

modal.addEventListener("click", e => {
  if (e.target.classList.contains("modal-overlay")) closeModal();
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

window.addEventListener("load", () => {
  setTimeout(openModal, 600);
});