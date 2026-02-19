// script.js

// Menu mobile
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav ul');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}

// Smooth scroll pour les ancres (si nécessaire)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animation au scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255,255,255,0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.backgroundColor = '#fff';
        header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    }
});

// ===== MODAL DE PAIEMENT =====
function openPaymentModal(propertyName, pricePerNight) {
    document.getElementById('modalPropertyName').textContent = propertyName;
    document.getElementById('pricePerNight').textContent = pricePerNight;
    document.getElementById('paymentModal').style.display = 'block';
    calculateTotal();
}

function closePaymentModal() {
    document.getElementById('paymentModal').style.display = 'none';
    document.getElementById('paymentForm').style.display = 'block';
    document.getElementById('whatsappConfirmation').style.display = 'none';
}

// Calcul automatique du prix total
document.getElementById('checkin')?.addEventListener('change', calculateTotal);
document.getElementById('checkout')?.addEventListener('change', calculateTotal);

function calculateTotal() {
    const checkin = document.getElementById('checkin')?.value;
    const checkout = document.getElementById('checkout')?.value;
    const pricePerNight = parseInt(document.getElementById('pricePerNight')?.textContent || '0');

    if (checkin && checkout && checkout > checkin) {
        const nights = Math.ceil((new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24));
        document.getElementById('numberOfNights').textContent = nights;
        document.getElementById('totalPrice').textContent = nights * pricePerNight;
    }
}

// Soumission du formulaire
function handlePaymentSubmit(event) {
    event.preventDefault();

    const propertyName = document.getElementById('modalPropertyName').textContent;
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const guests = document.getElementById('guests').value;
    const totalPrice = document.getElementById('totalPrice').textContent;
    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value || 'orange';

    // Message WhatsApp avec le bon numéro
    const message = `*NOUVELLE RÉSERVATION*
    
🏠 *Propriété:* ${propertyName}
📅 *Arrivée:* ${checkin}
📅 *Départ:* ${checkout}
👥 *Personnes:* ${guests}
💰 *Total:* ${totalPrice} FCFA
💳 *Paiement:* ${paymentMethod.toUpperCase()}`;

    // Redirection WhatsApp avec le numéro corrigé
    window.open(`https://wa.me/2250710076550?text=${encodeURIComponent(message)}`, '_blank');

    // Afficher confirmation
    document.getElementById('paymentForm').style.display = 'none';
    document.getElementById('whatsappConfirmation').style.display = 'block';

    // Fermer après 3 secondes
    setTimeout(closePaymentModal, 3000);
}

// Fermer le modal en cliquant dehors
window.onclick = function (event) {
    const modal = document.getElementById('paymentModal');
    if (event.target == modal) {
        closePaymentModal();
    }
}