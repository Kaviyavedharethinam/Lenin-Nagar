// Toggle menu
const toggleButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav ul');
const navLinks = document.querySelectorAll('nav ul li a');

toggleButton.addEventListener('click', () => {
  nav.classList.toggle('show');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('show');
  });
});

// Enquiry popup
const enquiryBtn = document.querySelector('.enquire-btn');
const enquiryPopup = document.getElementById('enquiryPopup');
const enquiryCloseBtn = document.querySelector('.close-btn');

enquiryBtn.addEventListener('click', (e) => {
  e.preventDefault();
  enquiryPopup.style.display = 'flex';
});

enquiryCloseBtn.addEventListener('click', () => {
  enquiryPopup.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === enquiryPopup) {
    enquiryPopup.style.display = 'none';
  }
});

// WhatsApp toggle
const whatsappBtn = document.getElementById("whatsappBtn");
const whatsappPopup = document.getElementById("whatsappPopup");

whatsappBtn.addEventListener("click", () => {
  whatsappPopup.style.display = whatsappPopup.style.display === "flex" ? "none" : "flex";
  callPopup.style.display = "none";
});

// Call toggle
const callBtn = document.getElementById("callBtn");
const callPopup = document.getElementById("callPopup");

callBtn.addEventListener("click", () => {
  callPopup.style.display = callPopup.style.display === "flex" ? "none" : "flex";
  whatsappPopup.style.display = "none";
});

// Close both popups when clicking outside
document.addEventListener("click", (event) => {
  if (
    !whatsappBtn.contains(event.target) &&
    !whatsappPopup.contains(event.target) &&
    !callBtn.contains(event.target) &&
    !callPopup.contains(event.target)
  ) {
    whatsappPopup.style.display = "none";
    callPopup.style.display = "none";
  }
});
//floor plan
const modal = document.getElementById("imgModal");
const floorPlanImg = document.getElementById("floorPlanImg");
const modalImg = document.getElementById("modalImg");
const modalCloseBtn = document.getElementById("closeBtn");

// Open modal
floorPlanImg.onclick = function () {
  modal.classList.add("active");
  modalImg.src = this.src;
}

// Close modal
modalCloseBtn.onclick = function () {
  modal.classList.remove("active");
}

modal.onclick = function (e) {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
}

// 🔍 Zoom on click inside modal
let zoomed = false;
modalImg.onclick = function () {
  if (!zoomed) {
    this.style.transform = "scale(2)";
    this.style.cursor = "zoom-out";
    zoomed = true;
  } else {
    this.style.transform = "scale(1)";
    this.style.cursor = "zoom-in";
    zoomed = false;
  }
}
const cards = document.querySelector('.cards');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const cardWidth = 350 + 15; // card width + gap (match your CSS)
let currentPosition = 0;

// total cards & visible cards
const totalCards = document.querySelectorAll('.card').length;
const visibleCards = 1; // you want 3 visible in 900px
const maxScroll = -(cardWidth * (totalCards - visibleCards));

// auto slide timer
let autoSlide = setInterval(nextSlide, 3000); // every 3s

// next slide
function nextSlide() {
  if (currentPosition > maxScroll) {
    currentPosition -= cardWidth;
  } else {
    currentPosition = 0; // reset to start
  }
  cards.style.transform = `translateX(${currentPosition}px)`;
}

// prev slide
function prevSlide() {
  if (currentPosition < 0) {
    currentPosition += cardWidth;
  } else {
    currentPosition = maxScroll; // go to last
  }
  cards.style.transform = `translateX(${currentPosition}px)`;
}

// button clicks
nextBtn.addEventListener('click', () => {
  stopAutoSlide();
  nextSlide();
});

prevBtn.addEventListener('click', () => {
  stopAutoSlide();
  prevSlide();
});

// stop auto slide when user interacts
function stopAutoSlide() {
  clearInterval(autoSlide);
}

// also stop when user clicks any card
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', stopAutoSlide);
});

// optional: stop when mouse enters, resume when leaves
document.querySelector('.slider-wrapper').addEventListener('mouseenter', stopAutoSlide);
document.querySelector('.slider-wrapper').addEventListener('mouseleave', () => {
  autoSlide = setInterval(nextSlide, 3000);
});
// form to google sheets
document.getElementById("myForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // Replace with your Web App URL
  const scriptURL = "https://script.google.com/macros/s/AKfycbwsRHXJiiDqL9p3P4f2BOK9IcH2s7_e7COEgqNNwKumf7lJNVkrjtD3YbZ2H072ZtuGMw/exec";

  let data = {
    name: e.target.name.value,
    email: e.target.email.value,
    phone: e.target.phone.value,
    message: e.target.message.value
  };

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(res => res.text())
  .then(response => {
    alert("✅ Form submitted successfully!");
    document.getElementById("myForm").reset();
  })
  .catch(error => {
    alert("❌ Error: " + error.message);
  });
});

function calculateEMI(){


let amount =
Number(document.getElementById("amount").value);


let down =
Number(document.getElementById("down").value);


let rate =
Number(document.getElementById("rate").value);


let years =
Number(document.getElementById("years").value);



let loanAmount = amount - down;


let monthlyRate = rate / 12 / 100;


let months = years * 12;



let emi =
(loanAmount * monthlyRate *
Math.pow(1 + monthlyRate, months))
/
(Math.pow(1 + monthlyRate, months)-1);



document.getElementById("result").innerHTML =

"Monthly EMI : ₹ " + 
Math.round(emi).toLocaleString("en-IN");


}


