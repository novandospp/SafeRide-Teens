// ==========================================
// 1. JAM DIGITAL REAL-TIME (PENGINGAT WAKTU)
// ==========================================
function updateClock() {
    const clockElement = document.getElementById('real-time-clock');
    if (!clockElement) return;

    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock();


// ==========================================
// 2. INTERAKTIVITAS PRE-RIDE CHECKLIST
// ==========================================
const checkboxes = document.querySelectorAll('.ride-check');
const checklistStatus = document.getElementById('checklist-status');

function updateChecklistStatus() {
    const total = checkboxes.length;
    const checkedCount = document.querySelectorAll('.ride-check:checked').length;

    if (checkedCount === total) {
        checklistStatus.textContent = "🎉 Mantap! Semua perlengkapan aman. Kamu siap berangkat!";
        checklistStatus.classList.add('ready');
    } else {
        checklistStatus.textContent = `Status: ${checkedCount} dari ${total} perlengkapan sudah dicek.`;
        checklistStatus.classList.remove('ready');
    }
}

checkboxes.forEach(box => {
    box.addEventListener('change', updateChecklistStatus);
});


// ==========================================
// 3. FILTER KATEGORI GALERI RAMBU LALU LINTAS
// ==========================================
const filterButtons = document.querySelectorAll('.filter-btn');
const signCards = document.querySelectorAll('.sign-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Hapus kelas 'active' dari semua tombol, lalu pasang ke tombol yang diklik
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        signCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (filterValue === 'all' || filterValue === cardCategory) {
                card.classList.remove('hide');
            } else {
                card.classList.add('hide');
            }
        });
    });
});


// ==========================================
// 4. KUIS INTERAKTIF UJI PEMAHAMAN
// ==========================================
const quizData = [
    {
        question: "1. Rambu lalu lintas dengan warna dasar kuning dan simbol hitam berfungsi sebagai...",
        options: [
            "Rambu Larangan",
            "Rambu Peringatan bahaya/kondisi jalan",
            "Rambu Petunjuk arah kota",
            "Rambu Perintah wajib"
        ],
        answer: 1
    },
    {
        question: "2. Apa arti rambu huruf 'S' yang dicoret dengan garis merah?",
        options: [
            "Dilarang Parkir",
            "Dilarang Salip",
            "Dilarang Berhenti / Stop sama sekali",
            "Jalan Satu Arah"
        ],
        answer: 2
    },
    {
        question: "3. Di mana posisi berhenti yang benar saat lampu merah menyala di persimpangan?",
        options: [
            "Di atas zebra cross agar cepat jalan",
            "Di belakang garis putih (stop line)",
            "Menyerobot ke jalur sebelah kanan",
            "Berhenti tepat di tengah persimpangan"
        ],
        answer: 1
    },
    {
        question: "4. Dari arah mana kamu wajib menyalip kendaraan lain di jalan raya?",
        options: [
            "Dari sebelah kiri agar lebih dekat trotoar",
            "Dari sebelah kanan dengan memberi sinyal lampu sein",
            "Dari arah mana saja yang penting muat",
            "Tidak perlu memberi sinyal apa pun"
        ],
        answer: 1
    },
    {
        question: "5. Nomor panggilan darurat Kepolisian yang bisa dihubungi saat terjadi keadaan darurat adalah...",
        options: [
            "110",
            "119",
            "14045",
            "123"
        ],
        answer: 0
    }
];

let currentQuizIndex = 0;
let score = 0;

const questionEl = document.getElementById('quiz-question');
const optionsEl = document.getElementById('quiz-options');
const nextBtn = document.getElementById('next-quiz-btn');
const resultEl = document.getElementById('quiz-result');

function loadQuiz() {
    nextBtn.classList.add('hidden');
    optionsEl.innerHTML = '';

    const currentData = quizData[currentQuizIndex];
    questionEl.textContent = currentData.question;

    currentData.options.forEach((optionText, index) => {
        const button = document.createElement('button');
        button.textContent = optionText;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectAnswer(index, button));
        optionsEl.appendChild(button);
    });
}

function selectAnswer(selectedIndex, selectedButton) {
    const correctIndex = quizData[currentQuizIndex].answer;
    const allOptionButtons = optionsEl.querySelectorAll('.option-btn');

    // Kunci semua tombol pilihan setelah user menjawab
    allOptionButtons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === correctIndex) {
            btn.classList.add('correct');
        }
    });

    if (selectedIndex === correctIndex) {
        score++;
    } else {
        selectedButton.classList.add('wrong');
    }

    nextBtn.classList.remove('hidden');
}

nextBtn.addEventListener('click', () => {
    currentQuizIndex++;
    if (currentQuizIndex < quizData.length) {
        loadQuiz();
    } else {
        showQuizResult();
    }
});

function showQuizResult() {
    questionEl.classList.add('hidden');
    optionsEl.classList.add('hidden');
    nextBtn.classList.add('hidden');

    resultEl.classList.remove('hidden');
    const finalScore = Math.round((score / quizData.length) * 100);
    
    let message = "";
    if (finalScore >= 80) {
        message = `Luar Biasa! Skor kamu ${finalScore}/100 (${score} dari ${quizData.length} benar). Kamu sudah paham aturan keselamatan berkendara! 🚦`;
    } else {
        message = `Skor kamu ${finalScore}/100 (${score} dari ${quizData.length} benar). Yuk baca lagi galeri rambu di atas agar makin paham! 📖`;
    }

    resultEl.innerHTML = `
        <p>${message}</p>
        <button onclick="restartQuiz()" class="btn-primary" style="margin-top: 15px;">Ulangi Kuis</button>
    `;
}

function restartQuiz() {
    currentQuizIndex = 0;
    score = 0;
    questionEl.classList.remove('hidden');
    optionsEl.classList.remove('hidden');
    resultEl.classList.add('hidden');
    loadQuiz();
}

// Mulai kuis pertama kali saat halaman dimuat
loadQuiz();
