document.getElementById('deposit-amount').addEventListener('input', function() {
    const amount = parseInt(this.value);
    const totalAmountField = document.getElementById('total-amount');
    
    // Pastikan jumlah deposit minimal 5000
    if (amount >= 5000) {
        totalAmountField.value = `Rp ${amount.toLocaleString('id-ID')}`;
    } else {
        totalAmountField.value = '';
    }
});

document.getElementById('deposit-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah form untuk mengirim secara default

    // Simulasikan pengiriman bukti pembayaran
    const paymentProof = document.getElementById('payment-proof').files[0];
    if (paymentProof) {
        // Jika file pembayaran ada, tampilkan notifikasi
        document.getElementById('notification').style.display = 'block';
        setTimeout(function() {
            // Sembunyikan notifikasi setelah 5 detik
            document.getElementById('notification').style.display = 'none';
        }, 5000);
    }
});