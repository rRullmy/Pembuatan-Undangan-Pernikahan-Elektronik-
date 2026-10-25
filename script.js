const KONFIGURASI = {
    namaTamuDefault: "Tamu Undangan"
};

let daftarUcapan = [
    { nama: "Rifqi", kehadiran: "Hadir", pesan: "Selamat menempuh hidup baru!" },
    { nama: "Budi", kehadiran: "Hadir", pesan: "Semoga sakinah, mawaddah, warahmah." }
];

const cover = document.getElementById("cover");
const btnBuka = document.getElementById("btnBuka");
const namaTamu = document.getElementById("namaTamu");
const inputNamaTamu = document.getElementById("inputNamaTamu");
const btnMusik = document.getElementById("btnMusik");
const musik = document.getElementById("musik");
const wadahUcapan = document.getElementById("daftarUcapan");

btnBuka.addEventListener("click", () => {
    let nama = inputNamaTamu.value;

    if (nama === "") {
        nama = KONFIGURASI.namaTamuDefault;
    } else {
        document.getElementById("nama").value = nama;
    }

    namaTamu.textContent = nama;
    cover.classList.add("terbuka");
    document.body.style.overflow = "auto";
    putarMusik();
});

document.body.style.overflow = "hidden";

function putarMusik() {
    musik.play()
        .then(() => btnMusik.classList.add("main"))
        .catch(() => console.warn("Musik tidak dapat diputar (cek file sound.mp3)."));
}

btnMusik.addEventListener("click", () => {
    if (musik.paused) {
        putarMusik();
    } else {
        musik.pause();
        btnMusik.classList.remove("main");
    }
});

function aman(teks) {
    return teks
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function tampilkanUcapan() {
    let html = "";

    daftarUcapan.forEach((item) => {
        html += `
            <div class="ucapan">
                <strong>${aman(item.nama)}</strong>
                <small>(${item.kehadiran})</small>
                <p>${aman(item.pesan)}</p>
            </div>`;
    });

    wadahUcapan.innerHTML = html;
}

tampilkanUcapan();

function validasiForm() {
    const inputNama = document.getElementById("nama");
    const inputPesan = document.getElementById("pesan");
    const jumlah = parseInt(document.getElementById("jumlah").value, 10);
    const kehadiran = document.getElementById("kehadiran").value;

    const nama = inputNama.value;
    const pesan = inputPesan.value;

    inputNama.classList.remove("salah");
    inputPesan.classList.remove("salah");

    if (nama === "") {
        alert("Nama wajib diisi!");
        inputNama.classList.add("salah");
        return false; 
    }

    if (jumlah < 1 || jumlah > 5) {
        alert("Jumlah tamu harus antara 1 sampai 5.");
        return false;
    }

    if (pesan === "") {
        alert("Ucapan wajib diisi!");
        inputPesan.classList.add("salah");
        return false;
    }

    daftarUcapan.push({ nama: nama, kehadiran: kehadiran, pesan: pesan });
    tampilkanUcapan();

    alert(`Terima kasih, ${nama}! Konfirmasi Anda sudah tercatat.`);

    inputNama.value = "";
    inputPesan.value = "";
    document.getElementById("jumlah").value = 1;
    document.getElementById("acaraPilihan").value = "Akad & Resepsi";
    document.getElementById("kehadiran").value = "Hadir";
    return false;
}