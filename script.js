// Fungsi untuk memeriksa status login
function isUserLoggedIn() {
    return localStorage.getItem('userLoggedIn') === 'true'; // Cek status login menggunakan localStorage
}

// Fungsi untuk menampilkan notifikasi login
function showLoginNotification() {
    const notification = document.getElementById('login-notification');
    
    if (notification) {
        notification.style.display = 'block'; // Tampilkan notifikasi

        // Tambahkan animasi fade-in
        notification.classList.add('fade-in');

        // Sembunyikan notifikasi setelah 3 detik dan arahkan ke halaman login
        setTimeout(() => {
            notification.style.display = 'none';
            window.location.href = 'login.html'; // Redirect ke halaman login
        }, 3000); // Waktu 3 detik sebelum redirect
    }
}

// Fungsi untuk menampilkan notifikasi pembayaran berhasil
function showSuccessNotification() {
    const notification = document.getElementById('notification');
    
    if (notification) {
        notification.style.display = 'block'; // Tampilkan notifikasi

        // Sembunyikan notifikasi setelah 5 detik
        setTimeout(() => {
            notification.style.display = 'none';
        }, 5000); // Waktu 5 detik sebelum menghilang
    }
}

// Cek status login saat halaman dimuat
document.addEventListener('DOMContentLoaded', function () {
    // Periksa apakah pengguna sudah login
    if (!isUserLoggedIn()) {
        showLoginNotification(); // Jika belum login, tampilkan notifikasi dan redirect
    }

    // Deteksi halaman untuk mengatur fungsi yang sesuai
    const isDepositPage = window.location.pathname.includes('deposit.html');
    const isIndexPage = window.location.pathname.includes('index.html');

    // Logika untuk halaman deposit.html
    if (isDepositPage) {
        // Validasi deposit minimal
        const depositAmount = document.getElementById('deposit-amount');
        const totalAmountField = document.getElementById('total-amount');
        const depositForm = document.getElementById('deposit-form');

        depositAmount.addEventListener('input', function () {
            const amount = parseInt(this.value);

            // Validasi jumlah deposit minimal Rp 5000
            if (amount >= 5000) {
                totalAmountField.value = `Rp ${amount.toLocaleString('id-ID')}`;
            } else {
                totalAmountField.value = '';
            }
        });

        // Validasi form deposit dan kirimkan data ke server
        depositForm.addEventListener('submit', async function (event) {
            event.preventDefault(); // Mencegah form terkirim

            const depositAmount = document.getElementById('deposit-amount').value;
            const paymentProof = document.getElementById('payment-proof').files[0];

            if (!depositAmount || !paymentProof) {
                alert('Harap isi semua data dengan benar!');
                return;
            }

            // Kirimkan data ke server melalui API (pastikan endpoint API tersedia)
            try {
                const formData = new FormData(depositForm);
                const response = await fetch('/api/deposit', {
                    method: 'POST',
                    body: formData,
                });

                const result = await response.json();
                if (result.success) {
                    // Tampilkan notifikasi pembayaran berhasil
                    showSuccessNotification();
                } else {
                    alert('Terjadi kesalahan. Silakan coba lagi.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Terjadi kesalahan. Silakan coba lagi.');
            }
        });
    }

    // Logika untuk halaman index.html (Pembelian)
    if (isIndexPage) {
        // Event listener untuk perubahan harga saat memilih aplikasi
        const appSelection = document.getElementById('app-selection');
        if (appSelection) {
            appSelection.addEventListener('change', function () {
                const selectedOption = this.options[this.selectedIndex];
                const price = selectedOption.getAttribute('data-price');

                // Format harga dengan pemisah ribuan
                const formattedPrice = parseInt(price).toLocaleString('id-ID');
                document.getElementById('price').textContent = `Rp ${formattedPrice}`;
            });
        }

        // Event listener untuk form pembelian
        const purchaseForm = document.getElementById('purchase-form');
        if (purchaseForm) {
            purchaseForm.addEventListener('submit', function (event) {
                event.preventDefault(); // Mencegah form terkirim

                // Periksa status login sebelum memproses pembelian
                if (!isUserLoggedIn()) {
                    showLoginNotification(); // Tampilkan notifikasi jika belum login
                    return;
                }

                // Logika pembelian jika sudah login
                alert('Pembelian berhasil!');
            });
        }
    }
});
