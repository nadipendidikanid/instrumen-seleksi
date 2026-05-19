// ============================================================
//  Instrumen Seleksi Tenaga Ahli Konstruksi – app.js
// ============================================================

// ─── DATA KOMPETENSI ────────────────────────────────────────
const KOMPETENSI = {
  struktur: [
    { id:'s1', label:'Analisis Struktur Beton Bertulang', bobot:3 },
    { id:'s2', label:'Desain Struktur Baja', bobot:3 },
    { id:'s3', label:'Analisis Gempa & Dinamika Struktur', bobot:3 },
    { id:'s4', label:'Struktur Jembatan & Jalan Layang', bobot:3 },
    { id:'s5', label:'Pemodelan SAP2000 / ETABS / STAAD', bobot:2 },
    { id:'s6', label:'Struktur Kayu & Komposit', bobot:2 },
    { id:'s7', label:'Evaluasi & Rehabilitasi Struktur Existing', bobot:2 },
    { id:'s8', label:'Konstruksi Prategang (Prestressed)', bobot:2 },
  ],
  geoteknik: [
    { id:'g1', label:'Penyelidikan Tanah & Interpretasi Data', bobot:3 },
    { id:'g2', label:'Desain Pondasi Dalam (Tiang Pancang / Bor)', bobot:3 },
    { id:'g3', label:'Stabilitas Lereng & Retaining Wall', bobot:3 },
    { id:'g4', label:'Perbaikan Tanah & Ground Improvement', bobot:2 },
    { id:'g5', label:'Instrumentasi Geoteknik', bobot:2 },
    { id:'g6', label:'Desain Pondasi Dangkal', bobot:2 },
  ],
  manpro: [
    { id:'m1', label:'Perencanaan & Penjadwalan Proyek (MS Project / Primavera)', bobot:3 },
    { id:'m2', label:'Estimasi Biaya & RAB', bobot:3 },
    { id:'m3', label:'Manajemen Risiko Konstruksi', bobot:3 },
    { id:'m4', label:'K3 Konstruksi & SMK3', bobot:3 },
    { id:'m5', label:'Pengawasan Mutu (QA/QC)', bobot:2 },
    { id:'m6', label:'Kontrak Konstruksi (FIDIC / SSUK)', bobot:2 },
    { id:'m7', label:'BIM (Building Information Modeling)', bobot:2 },
    { id:'m8', label:'Green Building & Sustainability', bobot:1 },
  ],
  sda: [
    { id:'w1', label:'Hidrologi & Analisis Banjir', bobot:3 },
    { id:'w2', label:'Desain Bendungan & Embung', bobot:3 },
    { id:'w3', label:'Jaringan Irigasi & Drainase', bobot:2 },
    { id:'w4', label:'Desain Jalan Raya & Geometrik', bobot:3 },
    { id:'w5', label:'Perkerasan Jalan (Flexible & Rigid)', bobot:2 },
    { id:'w6', label:'Rekayasa Lalu Lintas', bobot:2 },
  ],
  desain: [
    { id:'a1', label:'Perancangan Arsitektur Bangunan Gedung', bobot:3 },
    { id:'a2', label:'Gambar Kerja & Dokumentasi Arsitektur', bobot:3 },
    { id:'a3', label:'Desain Interior & Estetika Ruang', bobot:2 },
    { id:'a4', label:'Pemodelan 3D (SketchUp / Revit / AutoCAD)', bobot:2 },
    { id:'a5', label:'Rendering & Visualisasi Arsitektur', bobot:2 },
    { id:'a6', label:'Arsitektur Tropis & Vernakular', bobot:2 },
    { id:'a7', label:'Aksesibilitas & Universal Design', bobot:2 },
    { id:'a8', label:'Heritage & Konservasi Bangunan', bobot:1 },
  ],
  lanskap: [
    { id:'l1', label:'Desain Taman & Ruang Terbuka Hijau', bobot:3 },
    { id:'l2', label:'Perencanaan Kawasan Wisata', bobot:2 },
    { id:'l3', label:'Ekologi Lanskap & Keberlanjutan', bobot:2 },
    { id:'l4', label:'Desain Hardscape & Softscape', bobot:2 },
    { id:'l5', label:'Sistem Drainase Lanskap', bobot:2 },
  ],
  tataruang: [
    { id:'t1', label:'Perencanaan Tata Ruang Wilayah (RTRW)', bobot:3 },
    { id:'t2', label:'Rencana Detail Tata Ruang (RDTR)', bobot:3 },
    { id:'t3', label:'Analisis Kebutuhan Infrastruktur Kota', bobot:2 },
    { id:'t4', label:'GIS & Pemetaan Spasial', bobot:2 },
    { id:'t5', label:'Smart City & Teknologi Perkotaan', bobot:2 },
  ],
  teknobangunan: [
    { id:'tb1', label:'Sistem MEP (Mekanikal, Elektrikal, Plumbing)', bobot:2 },
    { id:'tb2', label:'Material Bangunan & Spesifikasi Teknis', bobot:2 },
    { id:'tb3', label:'Efisiensi Energi & Green Building', bobot:2 },
    { id:'tb4', label:'Sistem Proteksi Kebakaran', bobot:2 },
    { id:'tb5', label:'Akustik & Pencahayaan Bangunan', bobot:2 },
    { id:'tb6', label:'Facade Engineering', bobot:1 },
  ],
};

// ─── STATE ──────────────────────────────────────────────────
let uploadedFiles = [];
let sertifikatCount = 0;
let portofolioCount = 0;

// ─── INIT ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildKompetensiGrid('grid-struktur',       KOMPETENSI.struktur,       'sipil');
  buildKompetensiGrid('grid-geoteknik',      KOMPETENSI.geoteknik,      'sipil');
  buildKompetensiGrid('grid-manpro',         KOMPETENSI.manpro,         'sipil');
  buildKompetensiGrid('grid-sda',            KOMPETENSI.sda,            'sipil');
  buildKompetensiGrid('grid-desain',         KOMPETENSI.desain,         'arsitektur');
  buildKompetensiGrid('grid-lanskap',        KOMPETENSI.lanskap,        'arsitektur');
  buildKompetensiGrid('grid-tataruang',      KOMPETENSI.tataruang,      'arsitektur');
  buildKompetensiGrid('grid-teknobangunan',  KOMPETENSI.teknobangunan,  'arsitektur');
  addSertifikat();
  addPortofolio();
});

// ─── NAVIGATION ─────────────────────────────────────────────
function goTo(step) {
  for (let i = 1; i <= 5; i++) {
    document.getElementById('page-' + i).classList.add('hidden');
  }
  const target = document.getElementById('page-' + step);
  target.classList.remove('hidden');
  target.classList.remove('fade-in');
  void target.offsetWidth;
  target.classList.add('fade-in');
  updateStepIndicators(step);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateStepIndicators(active) {
  for (let i = 1; i <= 5; i++) {
    const el = document.getElementById('si-' + i);
    const lbl = document.getElementById('sl-' + i);
    if (i < active) {
      el.className = 'step-indicator done w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0';
      el.innerHTML = '✓';
      lbl.className = 'ml-2 text-sm font-medium text-green-600 whitespace-nowrap';
    } else if (i === active) {
      el.className = 'step-indicator active w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0';
      el.innerHTML = i;
      lbl.className = 'ml-2 text-sm font-medium text-primary-700 whitespace-nowrap';
    } else {
      el.className = 'step-indicator idle w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0';
      el.innerHTML = i;
      lbl.className = 'ml-2 text-sm font-medium text-slate-400 whitespace-nowrap';
    }
  }
}

// ─── TAB KOMPETENSI ─────────────────────────────────────────
function switchTab(tab) {
  const tabs = ['sipil', 'arsitektur'];
  tabs.forEach(t => {
    document.getElementById('kompetensi-' + t).classList.toggle('hidden', t !== tab);
    const btn = document.getElementById('tab-' + t);
    if (t === tab) {
      btn.classList.add('active');
      btn.classList.remove('border-slate-200', 'text-slate-600');
    } else {
      btn.classList.remove('active');
      btn.classList.add('border-slate-200', 'text-slate-600');
    }
  });
}

// ─── BUILD KOMPETENSI GRID ───────────────────────────────────
function buildKompetensiGrid(gridId, items, category) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  grid.innerHTML = items.map(item => `
    <div class="relative">
      <input type="checkbox" id="chk-${item.id}" class="comp-check hidden" data-bobot="${item.bobot}" data-category="${category}" />
      <label for="chk-${item.id}" class="flex items-start gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:border-primary-300 hover:bg-primary-50 transition text-sm">
        <span class="w-5 h-5 flex-shrink-0 border-2 border-slate-300 rounded-md flex items-center justify-center mt-0.5 check-box-visual">
          <svg class="w-3 h-3 text-primary-600 hidden check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
        </span>
        <span class="flex-1 leading-snug">${item.label}</span>
        <span class="text-xs text-slate-400 font-medium flex-shrink-0">${item.bobot}pt</span>
      </label>
    </div>
  `).join('');

  // Toggle check icon
  grid.querySelectorAll('.comp-check').forEach(chk => {
    chk.addEventListener('change', function() {
      const visual = this.nextElementSibling.querySelector('.check-box-visual');
      const icon   = visual.querySelector('.check-icon');
      if (this.checked) {
        visual.classList.add('border-primary-500', 'bg-primary-100');
        visual.classList.remove('border-slate-300');
        icon.classList.remove('hidden');
      } else {
        visual.classList.remove('border-primary-500', 'bg-primary-100');
        visual.classList.add('border-slate-300');
        icon.classList.add('hidden');
      }
    });
  });
}

// ─── FILE UPLOAD ─────────────────────────────────────────────
function handleDragOver(e) {
  e.preventDefault();
  document.getElementById('drop-zone').classList.add('dragover');
}
function handleDragLeave(e) {
  document.getElementById('drop-zone').classList.remove('dragover');
}
function handleDrop(e) {
  e.preventDefault();
  document.getElementById('drop-zone').classList.remove('dragover');
  handleFiles(e.dataTransfer.files);
}
function handleFiles(files) {
  Array.from(files).forEach(file => {
    if (file.size > 5 * 1024 * 1024) {
      alert(`File "${file.name}" melebihi batas 5MB.`);
      return;
    }
    uploadedFiles.push(file);
    renderFileList();
  });
}
function renderFileList() {
  const container = document.getElementById('file-list');
  container.innerHTML = uploadedFiles.map((f, i) => `
    <div class="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
      <div class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${f.type === 'application/pdf' ? 'bg-red-100' : 'bg-blue-100'}">
        <svg class="w-5 h-5 ${f.type === 'application/pdf' ? 'text-red-500' : 'text-blue-500'}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-semibold text-slate-700 truncate">${f.name}</p>
        <p class="text-xs text-slate-400">${(f.size / 1024).toFixed(1)} KB</p>
      </div>
      <span class="badge bg-green-100 text-green-700">✓ Terunggah</span>
      <button onclick="removeFile(${i})" class="text-slate-400 hover:text-red-500 transition ml-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
  `).join('');
}
function removeFile(i) {
  uploadedFiles.splice(i, 1);
  renderFileList();
}

// ─── SERTIFIKAT MANUAL ───────────────────────────────────────
function addSertifikat() {
  sertifikatCount++;
  const id = 'sert-' + sertifikatCount;
  const div = document.createElement('div');
  div.id = id;
  div.className = 'grid grid-cols-1 md:grid-cols-4 gap-3 mb-3 p-4 bg-slate-50 rounded-xl border border-slate-200 relative';
  div.innerHTML = `
    <div>
      <label class="block text-xs font-semibold text-slate-600 mb-1">Nama Sertifikat</label>
      <input type="text" placeholder="Contoh: SKK Ahli Madya" class="sert-nama w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
    </div>
    <div>
      <label class="block text-xs font-semibold text-slate-600 mb-1">Penerbit</label>
      <input type="text" placeholder="LPJK / BNSP / Lainnya" class="sert-penerbit w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
    </div>
    <div>
      <label class="block text-xs font-semibold text-slate-600 mb-1">Tingkat</label>
      <select class="sert-tingkat w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 bg-white">
        <option value="0">-- Pilih --</option>
        <option value="1">Operator / Teknisi</option>
        <option value="2">Ahli Muda</option>
        <option value="3">Ahli Madya</option>
        <option value="4">Ahli Utama</option>
        <option value="2">Internasional</option>
      </select>
    </div>
    <div>
      <label class="block text-xs font-semibold text-slate-600 mb-1">Tahun Terbit</label>
      <input type="number" min="1990" max="2030" placeholder="2023" class="sert-tahun w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
    </div>
    ${sertifikatCount > 1 ? `<button onclick="removeSertifikat('${id}')" class="absolute top-3 right-3 text-slate-400 hover:text-red-500 transition"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>` : ''}
  `;
  document.getElementById('sertifikat-list').appendChild(div);
}
function removeSertifikat(id) {
  document.getElementById(id).remove();
}

// ─── PORTOFOLIO ──────────────────────────────────────────────
function addPortofolio() {
  portofolioCount++;
  const id = 'porto-' + portofolioCount;
  const div = document.createElement('div');
  div.id = id;
  div.className = 'border border-slate-200 rounded-2xl p-5 bg-slate-50 relative';
  div.innerHTML = `
    <div class="flex items-center justify-between mb-4">
      <h4 class="text-sm font-bold text-slate-700 flex items-center gap-2">
        <span class="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">${portofolioCount}</span>
        Proyek #${portofolioCount}
      </h4>
      ${portofolioCount > 1 ? `<button onclick="removePortofolio('${id}')" class="text-slate-400 hover:text-red-500 transition text-xs flex items-center gap-1"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg> Hapus</button>` : ''}
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="md:col-span-2 lg:col-span-3">
        <label class="block text-xs font-semibold text-slate-600 mb-1">Nama Proyek <span class="text-red-400">*</span></label>
        <input type="text" placeholder="Contoh: Pembangunan Gedung Kantor 10 Lantai" class="porto-nama w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 bg-white" />
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-600 mb-1">Peran / Jabatan</label>
        <select class="porto-peran w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 bg-white">
          <option value="0">-- Pilih Peran --</option>
          <option value="1">Anggota Tim</option>
          <option value="2">Site Engineer</option>
          <option value="3">Supervisor / Pengawas</option>
          <option value="4">Project Manager</option>
          <option value="5">Konsultan Utama / Lead</option>
        </select>
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-600 mb-1">Jenis Proyek</label>
        <select class="porto-jenis w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 bg-white">
          <option value="1">Bangunan Gedung</option>
          <option value="2">Infrastruktur Jalan</option>
          <option value="2">Jembatan</option>
          <option value="2">Bendungan / SDA</option>
          <option value="1">Perumahan / Hunian</option>
          <option value="1">Kawasan Industri</option>
          <option value="3">Proyek Strategis Nasional</option>
          <option value="1">Renovasi / Rehabilitasi</option>
        </select>
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-600 mb-1">Nilai Proyek (Rp Miliar)</label>
        <input type="number" min="0" step="0.1" placeholder="Contoh: 25.5" class="porto-nilai w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 bg-white" />
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-600 mb-1">Tahun Mulai</label>
        <input type="number" min="1990" max="2030" placeholder="2020" class="porto-mulai w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 bg-white" />
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-600 mb-1">Tahun Selesai</label>
        <input type="number" min="1990" max="2030" placeholder="2022" class="porto-selesai w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 bg-white" />
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-600 mb-1">Lokasi</label>
        <input type="text" placeholder="Kota / Provinsi" class="porto-lokasi w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 bg-white" />
      </div>
      <div class="md:col-span-2 lg:col-span-3">
        <label class="block text-xs font-semibold text-slate-600 mb-1">Deskripsi Singkat</label>
        <textarea rows="2" placeholder="Uraikan peran dan tanggung jawab Anda dalam proyek ini..." class="porto-desk w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 bg-white resize-none"></textarea>
      </div>
    </div>
  `;
  document.getElementById('portofolio-list').appendChild(div);
}
function removePortofolio(id) {
  document.getElementById(id).remove();
}

// ─── API BASE URL ────────────────────────────────────────────
// - Railway: frontend & backend satu domain → gunakan '' (same origin)
// - Dev lokal: gunakan port 4000
const API_BASE = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ? `http://${window.location.hostname}:4000`
  : '';   // same origin di Railway / production

// ─── SCORING ENGINE ──────────────────────────────────────────
function calculateScore() {
  // ── 1. SKOR SERTIFIKAT (max 30) ──────────────────────────
  let sertScore = 0;
  const sertRows = document.querySelectorAll('#sertifikat-list > div');
  let validSerts = 0;
  sertRows.forEach(row => {
    const nama    = row.querySelector('.sert-nama')?.value?.trim() || '';
    const tingkat = parseInt(row.querySelector('.sert-tingkat')?.value || '0');
    if (nama && tingkat > 0) {
      validSerts++;
      sertScore += tingkat * 2; // Operator=2, Muda=4, Madya=6, Utama=8, Intl=4
    }
  });
  // Bonus file upload
  sertScore += uploadedFiles.length * 1;
  sertScore = Math.min(sertScore, 30);

  // ── 2. SKOR PORTOFOLIO (max 35) ──────────────────────────
  let portoScore = 0;
  const portoRows = document.querySelectorAll('#portofolio-list > div');
  let totalDuration = 0;
  let maxNilai = 0;
  portoRows.forEach(row => {
    const nama   = row.querySelector('.porto-nama')?.value?.trim() || '';
    const peran  = parseInt(row.querySelector('.porto-peran')?.value || '0');
    const jenis  = parseInt(row.querySelector('.porto-jenis')?.value || '1');
    const nilai  = parseFloat(row.querySelector('.porto-nilai')?.value || '0');
    const mulai  = parseInt(row.querySelector('.porto-mulai')?.value || '0');
    const selesai= parseInt(row.querySelector('.porto-selesai')?.value || '0');
    if (nama && peran > 0) {
      const durasi = (selesai > mulai) ? (selesai - mulai) : 1;
      totalDuration += durasi;
      portoScore += peran * jenis * 0.8;
      if (nilai > maxNilai) maxNilai = nilai;
    }
  });
  // Bonus durasi total
  if (totalDuration >= 10) portoScore += 8;
  else if (totalDuration >= 5) portoScore += 5;
  else if (totalDuration >= 2) portoScore += 2;
  // Bonus nilai proyek
  if (maxNilai >= 100) portoScore += 5;
  else if (maxNilai >= 50) portoScore += 3;
  else if (maxNilai >= 10) portoScore += 1;
  portoScore = Math.min(portoScore, 35);

  // ── 3. SKOR KOMPETENSI (max 35) ──────────────────────────
  let kompScore = 0;
  document.querySelectorAll('.comp-check:checked').forEach(chk => {
    kompScore += parseInt(chk.dataset.bobot || '1');
  });
  kompScore = Math.min(kompScore, 35);

  // ── 4. BONUS PENDIDIKAN ──────────────────────────────────
  const pend = document.getElementById('pendidikan').value;
  let pendBonus = 0;
  if (pend === 's3') pendBonus = 3;
  else if (pend === 's2') pendBonus = 2;
  else if (pend === 's1') pendBonus = 1;

  // ── 5. TOTAL ─────────────────────────────────────────────
  const total = Math.min(Math.round(sertScore + portoScore + kompScore + pendBonus), 100);

  // ── 6. RENDER HASIL ──────────────────────────────────────
  renderHasil(total, sertScore, portoScore, kompScore, validSerts, totalDuration);
  goTo(5);
}

function renderHasil(total, sertScore, portoScore, kompScore, validSerts, totalDuration) {
  // Verdict
  let verdict, verdictColor, verdictIcon, verdictSub;
  if (total >= 70) {
    verdict      = 'LAYAK';
    verdictColor = 'bg-gradient-to-br from-green-500 to-emerald-600 text-white';
    verdictIcon  = `<div class="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4"><svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div>`;
    verdictSub   = 'Tenaga ahli ini memenuhi syarat kelayakan dan dapat dipekerjakan pada proyek konstruksi.';
  } else if (total >= 50) {
    verdict      = 'PERLU EVALUASI';
    verdictColor = 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white';
    verdictIcon  = `<div class="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4"><svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg></div>`;
    verdictSub   = 'Tenaga ahli perlu melengkapi sertifikasi atau pengalaman sebelum penugasan penuh.';
  } else {
    verdict      = 'TIDAK LAYAK';
    verdictColor = 'bg-gradient-to-br from-red-500 to-rose-600 text-white';
    verdictIcon  = `<div class="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4"><svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div>`;
    verdictSub   = 'Tenaga ahli belum memenuhi persyaratan minimum. Diperlukan peningkatan kompetensi signifikan.';
  }

  document.getElementById('verdict-banner').className = `rounded-2xl p-6 mb-6 text-center shadow-lg ${verdictColor}`;
  document.getElementById('verdict-icon').innerHTML = verdictIcon;
  document.getElementById('verdict-icon').className = '';
  document.getElementById('verdict-title').textContent = verdict;
  document.getElementById('verdict-subtitle').textContent = verdictSub;

  // Score numbers
  document.getElementById('score-total').textContent      = total;
  document.getElementById('score-sertifikat').textContent = Math.round(sertScore);
  document.getElementById('score-portofolio').textContent = Math.round(portoScore);
  document.getElementById('score-kompetensi').textContent = Math.round(kompScore);

  // Bars
  setTimeout(() => {
    document.getElementById('bar-sert').style.width   = (sertScore  / 30 * 100) + '%';
    document.getElementById('bar-porto').style.width  = (portoScore / 35 * 100) + '%';
    document.getElementById('bar-komp').style.width   = (kompScore  / 35 * 100) + '%';
  }, 200);
  document.getElementById('bar-label-sert').textContent  = `${Math.round(sertScore)} / 30`;
  document.getElementById('bar-label-porto').textContent = `${Math.round(portoScore)} / 35`;
  document.getElementById('bar-label-komp').textContent  = `${Math.round(kompScore)} / 35`;
  document.getElementById('detail-sert').textContent  = `${validSerts} sertifikat valid terdeteksi + ${uploadedFiles.length} file terunggah`;
  document.getElementById('detail-porto').textContent = `Total durasi pengalaman: ±${totalDuration} tahun`;

  const checkedKomp = document.querySelectorAll('.comp-check:checked').length;
  document.getElementById('detail-komp').textContent = `${checkedKomp} kompetensi teknis terpilih`;

  // Rekomendasi
  const recs = [];
  if (sertScore < 10)  recs.push({ type:'warn', msg:'Lengkapi SKK minimal tingkat Ahli Muda dari LPJK/BNSP untuk meningkatkan skor sertifikasi.' });
  if (sertScore >= 20) recs.push({ type:'ok',   msg:'Sertifikasi sudah memadai. Pertahankan dengan pembaruan berkala.' });
  if (portoScore < 10) recs.push({ type:'warn', msg:'Perbanyak pengalaman proyek, terutama sebagai Supervisor atau Project Manager.' });
  if (totalDuration < 5) recs.push({ type:'warn', msg:'Akumulasi pengalaman kerja masih di bawah 5 tahun. Perlu penugasan lebih lanjut.' });
  if (kompScore < 10)  recs.push({ type:'warn', msg:'Tingkatkan penguasaan kompetensi teknis, khususnya pada bidang inti keahlian Anda.' });
  if (kompScore >= 25) recs.push({ type:'ok',   msg:'Kompetensi teknis sangat baik dan beragam.' });
  if (total >= 70)     recs.push({ type:'ok',   msg:'Tenaga ahli ini direkomendasikan untuk penugasan proyek sesuai bidang keahliannya.' });
  if (total < 50)      recs.push({ type:'err',  msg:'Disarankan mengikuti program pelatihan dan sertifikasi sebelum penugasan proyek.' });

  const recColors = { ok:'bg-green-50 border-green-200 text-green-800', warn:'bg-yellow-50 border-yellow-200 text-yellow-800', err:'bg-red-50 border-red-200 text-red-800' };
  const recIcons  = {
    ok:   `<svg class="w-4 h-4 flex-shrink-0 mt-0.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
    warn: `<svg class="w-4 h-4 flex-shrink-0 mt-0.5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`,
    err:  `<svg class="w-4 h-4 flex-shrink-0 mt-0.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  };
  document.getElementById('rekomendasi-list').innerHTML = recs.map(r =>
    `<div class="flex items-start gap-3 p-3 border rounded-xl ${recColors[r.type]}">${recIcons[r.type]}<p class="text-sm">${r.msg}</p></div>`
  ).join('');

  // Ringkasan
  const nama     = document.getElementById('nama').value      || '-';
  const nik      = document.getElementById('nik').value       || '-';
  const bidang   = document.getElementById('bidang').value    || '-';
  const jabatan  = document.getElementById('jabatan').value   || '-';
  const pend     = document.getElementById('pendidikan').value|| '-';
  const tahun    = document.getElementById('tahun_kerja').value|| '-';
  const institusi= document.getElementById('institusi').value || '-';

  const bidangLabel = { sipil:'Teknik Sipil', arsitektur:'Arsitektur', keduanya:'Sipil & Arsitektur' };
  const pendLabel   = { d3:'D3', s1:'S1 / D4', s2:'S2', s3:'S3' };

  document.getElementById('ringkasan-data').innerHTML = [
    ['Nama Lengkap', nama],
    ['NIK', nik],
    ['Bidang Keahlian', bidangLabel[bidang] || bidang],
    ['Jabatan', jabatan],
    ['Pendidikan', pendLabel[pend] || pend],
    ['Pengalaman Kerja', tahun + ' tahun'],
    ['Institusi', institusi],
    ['Tanggal Penilaian', new Date().toLocaleDateString('id-ID', { day:'2-digit', month:'long', year:'numeric' })],
  ].map(([k,v]) => `
    <div class="flex gap-2 py-2 border-b border-slate-100 last:border-0">
      <span class="text-slate-500 w-36 flex-shrink-0">${k}</span>
      <span class="font-semibold text-slate-800">${v}</span>
    </div>
  `).join('');

  // ─── Capture data untuk API save ────────────────────────
  const recTexts = [];
  if (sertScore < 10)  recTexts.push('Lengkapi SKK minimal tingkat Ahli Muda dari LPJK/BNSP.');
  if (sertScore >= 20) recTexts.push('Sertifikasi sudah memadai. Pertahankan dengan pembaruan berkala.');
  if (portoScore < 10) recTexts.push('Perbanyak pengalaman proyek sebagai Supervisor atau Project Manager.');
  if (kompScore < 10)  recTexts.push('Tingkatkan penguasaan kompetensi teknis pada bidang inti keahlian.');
  if (kompScore >= 25) recTexts.push('Kompetensi teknis sangat baik dan beragam.');
  if (total >= 70)     recTexts.push('Direkomendasikan untuk penugasan proyek sesuai bidang keahlian.');
  if (total < 50)      recTexts.push('Disarankan mengikuti program pelatihan sebelum penugasan proyek.');

  const sertifikatData = [];
  document.querySelectorAll('#sertifikat-list > div').forEach(row => {
    const n = row.querySelector('.sert-nama')?.value?.trim() || '';
    const t = row.querySelector('.sert-tingkat')?.value || '';
    const p = row.querySelector('.sert-penerbit')?.value?.trim() || '';
    const y = row.querySelector('.sert-tahun')?.value || '';
    if (n) sertifikatData.push({ nama: n, tingkat: t, penerbit: p, tahun: y });
  });

  const portofolioData = [];
  document.querySelectorAll('#portofolio-list > div').forEach(row => {
    const n  = row.querySelector('.porto-nama')?.value?.trim() || '';
    const pr = row.querySelector('.porto-peran')?.value || '';
    const j  = row.querySelector('.porto-jenis')?.value || '';
    const v  = row.querySelector('.porto-nilai')?.value || '';
    const m  = row.querySelector('.porto-mulai')?.value || '';
    const s  = row.querySelector('.porto-selesai')?.value || '';
    if (n) portofolioData.push({ nama: n, peran: pr, jenis: j, nilai: v, mulai: m, selesai: s });
  });

  const kompetensiSipil = [];
  const kompetensiArsi  = [];
  document.querySelectorAll('.comp-check:checked').forEach(chk => {
    const lbl = chk.nextElementSibling?.querySelector('span.flex-1')?.textContent?.trim() || '';
    if (chk.dataset.category === 'arsitektur') kompetensiArsi.push(lbl);
    else kompetensiSipil.push(lbl);
  });

  lastScoreData = {
    nama:             document.getElementById('nama').value       || '',
    nik:              document.getElementById('nik').value        || '',
    bidang:           document.getElementById('bidang').value     || '',
    jabatan:          document.getElementById('jabatan').value    || '',
    pendidikan:       document.getElementById('pendidikan').value || '',
    tahun_kerja:      document.getElementById('tahun_kerja').value|| '',
    institusi:        document.getElementById('institusi').value  || '',
    email:            document.getElementById('email').value      || '',
    skor_total:       total,
    skor_sertifikat:  Math.round(sertScore),
    skor_portofolio:  Math.round(portoScore),
    skor_kompetensi:  Math.round(kompScore),
    status_kelayakan: total >= 70 ? 'LAYAK' : total >= 50 ? 'PERLU EVALUASI' : 'TIDAK LAYAK',
    sertifikat:       sertifikatData,
    portofolio:       portofolioData,
    kompetensi:       { sipil: kompetensiSipil, arsitektur: kompetensiArsi },
    rekomendasi:      recTexts,
    tanggal_penilaian: new Date().toLocaleDateString('id-ID', { day:'2-digit', month:'long', year:'numeric' }),
  };
}

// ─── EXPORT WORD ─────────────────────────────────────────────
async function exportWord() {
  const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
          HeadingLevel, AlignmentType, BorderStyle, WidthType,
          ShadingType, VerticalAlign, TableLayoutType } = docx;

  // ── Collect data ──────────────────────────────────────────
  const nama      = document.getElementById('nama').value      || '-';
  const nik       = document.getElementById('nik').value       || '-';
  const bidang    = document.getElementById('bidang').value    || '-';
  const jabatan   = document.getElementById('jabatan').value   || '-';
  const pend      = document.getElementById('pendidikan').value|| '-';
  const tahun     = document.getElementById('tahun_kerja').value|| '-';
  const institusi = document.getElementById('institusi').value || '-';
  const email     = document.getElementById('email').value     || '-';
  const tglNow    = new Date().toLocaleDateString('id-ID', { day:'2-digit', month:'long', year:'numeric' });

  const bidangLabel = { sipil:'Teknik Sipil', arsitektur:'Arsitektur', keduanya:'Sipil & Arsitektur' };
  const pendLabel   = { d3:'D3', s1:'S1 / D4', s2:'S2', s3:'S3' };

  const sertTotal  = parseInt(document.getElementById('score-sertifikat').textContent) || 0;
  const portoTotal = parseInt(document.getElementById('score-portofolio').textContent) || 0;
  const kompTotal  = parseInt(document.getElementById('score-kompetensi').textContent) || 0;
  const grandTotal = parseInt(document.getElementById('score-total').textContent)      || 0;

  let verdictText = 'TIDAK LAYAK';
  if (grandTotal >= 70) verdictText = 'LAYAK';
  else if (grandTotal >= 50) verdictText = 'PERLU EVALUASI';

  // ── Sertifikat rows ───────────────────────────────────────
  const sertRows = [];
  document.querySelectorAll('#sertifikat-list > div').forEach((row, idx) => {
    const nama_s  = row.querySelector('.sert-nama')?.value?.trim()     || '-';
    const penerbit= row.querySelector('.sert-penerbit')?.value?.trim() || '-';
    const tingkatEl = row.querySelector('.sert-tingkat');
    const tingkatVal = tingkatEl ? tingkatEl.options[tingkatEl.selectedIndex]?.text : '-';
    const tahun_s = row.querySelector('.sert-tahun')?.value?.trim()    || '-';
    if (nama_s !== '-' && nama_s !== '') {
      sertRows.push([String(idx+1), nama_s, penerbit, tingkatVal, tahun_s]);
    }
  });

  // ── Portofolio rows ───────────────────────────────────────
  const portoRows = [];
  document.querySelectorAll('#portofolio-list > div').forEach((row, idx) => {
    const nama_p  = row.querySelector('.porto-nama')?.value?.trim()    || '-';
    const peranEl = row.querySelector('.porto-peran');
    const peranVal= peranEl ? peranEl.options[peranEl.selectedIndex]?.text : '-';
    const jenisEl = row.querySelector('.porto-jenis');
    const jenisVal= jenisEl ? jenisEl.options[jenisEl.selectedIndex]?.text : '-';
    const nilai_p = row.querySelector('.porto-nilai')?.value           || '-';
    const mulai_p = row.querySelector('.porto-mulai')?.value           || '-';
    const selesai_p= row.querySelector('.porto-selesai')?.value        || '-';
    const lokasi_p= row.querySelector('.porto-lokasi')?.value?.trim()  || '-';
    if (nama_p !== '-' && nama_p !== '') {
      portoRows.push([String(idx+1), nama_p, peranVal, jenisVal, nilai_p ? `Rp ${nilai_p} M` : '-', `${mulai_p} – ${selesai_p}`, lokasi_p]);
    }
  });

  // ── Checked competencies ──────────────────────────────────
  const kompChecked = { sipil:[], arsitektur:[] };
  document.querySelectorAll('.comp-check:checked').forEach(chk => {
    const lbl = chk.nextElementSibling?.querySelector('span.flex-1')?.textContent?.trim() || '';
    const cat = chk.dataset.category || 'sipil';
    if (lbl) kompChecked[cat].push(lbl);
  });

  // ── Recommendations ───────────────────────────────────────
  const recItems = [];
  document.querySelectorAll('#rekomendasi-list > div p').forEach(p => recItems.push(p.textContent.trim()));

  // ─────────────────────────────────────────────────────────
  // Helper builders
  // ─────────────────────────────────────────────────────────
  const DARK_BLUE  = '1E3A8A';
  const MED_BLUE   = '2563EB';
  const LIGHT_BLUE = 'DBEAFE';
  const GRAY_BG    = 'F1F5F9';
  const WHITE      = 'FFFFFF';

  const cellBorder = (color='CCCCCC') => ({
    top:    { style: BorderStyle.SINGLE, size:4, color },
    bottom: { style: BorderStyle.SINGLE, size:4, color },
    left:   { style: BorderStyle.SINGLE, size:4, color },
    right:  { style: BorderStyle.SINGLE, size:4, color },
  });

  const mkCell = (text, opts={}) => new TableCell({
    children: [new Paragraph({
      children: [new TextRun({
        text: String(text),
        bold:  opts.bold  || false,
        color: opts.color || '000000',
        size:  opts.size  || 20,
        font:  'Calibri',
      })],
      alignment: opts.align || AlignmentType.LEFT,
    })],
    shading: opts.shade ? { fill: opts.shade, type: ShadingType.CLEAR, color:'auto' } : undefined,
    verticalAlign: VerticalAlign.CENTER,
    margins: { top:80, bottom:80, left:120, right:120 },
    borders: cellBorder(opts.borderColor || 'CCCCCC'),
    columnSpan: opts.span || 1,
  });

  const sectionTitle = (text) => new Paragraph({
    children:[new TextRun({ text, bold:true, size:26, color: DARK_BLUE, font:'Calibri' })],
    spacing:{ before:320, after:120 },
    border:{ bottom:{ style:BorderStyle.SINGLE, size:6, color: MED_BLUE } },
  });

  const bodyPara = (text, opts={}) => new Paragraph({
    children:[new TextRun({ text, size:20, font:'Calibri', color: opts.color||'000000', bold: opts.bold||false })],
    spacing:{ before:60, after:60 },
    alignment: opts.align || AlignmentType.LEFT,
  });

  const spacer = () => new Paragraph({ children:[new TextRun('')], spacing:{before:80,after:80} });

  // ── KOP SURAT ─────────────────────────────────────────────
  const kopTable = new Table({
    width:{ size:100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    borders: {
      top:    { style:BorderStyle.SINGLE, size:8, color: DARK_BLUE },
      bottom: { style:BorderStyle.SINGLE, size:8, color: DARK_BLUE },
      left:   { style:BorderStyle.NONE },
      right:  { style:BorderStyle.NONE },
      insideH:{ style:BorderStyle.NONE },
      insideV:{ style:BorderStyle.NONE },
    },
    rows:[new TableRow({ children:[
      new TableCell({
        width:{ size:15, type:WidthType.PERCENTAGE },
        children:[new Paragraph({
          children:[new TextRun({ text:'🏗', size:64, font:'Segoe UI Emoji' })],
          alignment: AlignmentType.CENTER,
        })],
        verticalAlign: VerticalAlign.CENTER,
        margins:{ top:120, bottom:120, left:120, right:120 },
        borders: cellBorder('FFFFFF'),
      }),
      new TableCell({
        width:{ size:85, type:WidthType.PERCENTAGE },
        children:[
          new Paragraph({ children:[new TextRun({ text:'INSTRUMEN SELEKSI TENAGA AHLI KONSTRUKSI', bold:true, size:28, color: DARK_BLUE, font:'Calibri' })], alignment: AlignmentType.CENTER }),
          new Paragraph({ children:[new TextRun({ text:'Sistem Penilaian Kelayakan Berbasis Kompetensi & Pengalaman', size:20, color:'475569', font:'Calibri' })], alignment: AlignmentType.CENTER }),
          new Paragraph({ children:[new TextRun({ text:'Sesuai Standar LPJK / BNSP / Permen PUPR', size:18, color:'64748B', italics:true, font:'Calibri' })], alignment: AlignmentType.CENTER }),
        ],
        verticalAlign: VerticalAlign.CENTER,
        margins:{ top:120, bottom:120, left:120, right:120 },
        borders: cellBorder('FFFFFF'),
      }),
    ]})]
  });

  // ── DATA DIRI TABLE ───────────────────────────────────────
  const mkDataRow = (label, value) => new TableRow({ children:[
    mkCell(label, { bold:true, shade: GRAY_BG, size:20, borderColor:'CCCCCC' }),
    mkCell(value, { size:20, borderColor:'CCCCCC' }),
  ]});

  const dataDiriTable = new Table({
    width:{ size:100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    rows:[
      new TableRow({ children:[
        mkCell('INFORMASI TENAGA AHLI', { bold:true, shade: DARK_BLUE, color: WHITE, size:22, span:2, align: AlignmentType.CENTER, borderColor: DARK_BLUE }),
      ]}),
      mkDataRow('Nama Lengkap', nama),
      mkDataRow('NIK / No. KTP', nik),
      mkDataRow('Bidang Keahlian', bidangLabel[bidang] || bidang),
      mkDataRow('Jabatan / Posisi', jabatan),
      mkDataRow('Pendidikan Terakhir', pendLabel[pend] || pend),
      mkDataRow('Pengalaman Kerja', tahun + ' tahun'),
      mkDataRow('Institusi / Perusahaan', institusi),
      mkDataRow('Email', email),
      mkDataRow('Tanggal Penilaian', tglNow),
    ]
  });

  // ── SKOR TABLE ────────────────────────────────────────────
  const verdictColor = grandTotal >= 70 ? '16A34A' : grandTotal >= 50 ? 'D97706' : 'DC2626';

  const skorTable = new Table({
    width:{ size:100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    rows:[
      new TableRow({ children:[
        mkCell('KOMPONEN PENILAIAN', { bold:true, shade: DARK_BLUE, color: WHITE, size:22, align: AlignmentType.CENTER, borderColor: DARK_BLUE }),
        mkCell('SKOR DIPEROLEH', { bold:true, shade: DARK_BLUE, color: WHITE, size:22, align: AlignmentType.CENTER, borderColor: DARK_BLUE }),
        mkCell('BOBOT MAKSIMAL', { bold:true, shade: DARK_BLUE, color: WHITE, size:22, align: AlignmentType.CENTER, borderColor: DARK_BLUE }),
        mkCell('PERSENTASE', { bold:true, shade: DARK_BLUE, color: WHITE, size:22, align: AlignmentType.CENTER, borderColor: DARK_BLUE }),
      ]}),
      new TableRow({ children:[
        mkCell('Sertifikasi & SKK', { shade: GRAY_BG }),
        mkCell(String(sertTotal), { align: AlignmentType.CENTER }),
        mkCell('30', { align: AlignmentType.CENTER }),
        mkCell(Math.round(sertTotal/30*100)+'%', { align: AlignmentType.CENTER }),
      ]}),
      new TableRow({ children:[
        mkCell('Portofolio Proyek', { shade: GRAY_BG }),
        mkCell(String(portoTotal), { align: AlignmentType.CENTER }),
        mkCell('35', { align: AlignmentType.CENTER }),
        mkCell(Math.round(portoTotal/35*100)+'%', { align: AlignmentType.CENTER }),
      ]}),
      new TableRow({ children:[
        mkCell('Kompetensi Teknis', { shade: GRAY_BG }),
        mkCell(String(kompTotal), { align: AlignmentType.CENTER }),
        mkCell('35', { align: AlignmentType.CENTER }),
        mkCell(Math.round(kompTotal/35*100)+'%', { align: AlignmentType.CENTER }),
      ]}),
      new TableRow({ children:[
        mkCell('TOTAL SKOR', { bold:true, shade: LIGHT_BLUE }),
        mkCell(String(grandTotal), { bold:true, align: AlignmentType.CENTER, shade: LIGHT_BLUE }),
        mkCell('100', { bold:true, align: AlignmentType.CENTER, shade: LIGHT_BLUE }),
        mkCell(grandTotal+'%', { bold:true, align: AlignmentType.CENTER, shade: LIGHT_BLUE }),
      ]}),
      new TableRow({ children:[
        mkCell('STATUS KELAYAKAN', { bold:true, shade: GRAY_BG }),
        new TableCell({
          columnSpan:3,
          children:[new Paragraph({
            children:[new TextRun({ text: verdictText, bold:true, size:24, color: verdictColor, font:'Calibri' })],
            alignment: AlignmentType.CENTER,
          })],
          shading:{ fill: WHITE, type: ShadingType.CLEAR, color:'auto' },
          verticalAlign: VerticalAlign.CENTER,
          margins:{ top:80, bottom:80, left:120, right:120 },
          borders: cellBorder('CCCCCC'),
        }),
      ]}),
    ]
  });

  // ── SERTIFIKAT TABLE ──────────────────────────────────────
  const sertTableRows = [
    new TableRow({ children:[
      mkCell('No.', { bold:true, shade: MED_BLUE, color: WHITE, align: AlignmentType.CENTER, borderColor: MED_BLUE }),
      mkCell('Nama Sertifikat', { bold:true, shade: MED_BLUE, color: WHITE, borderColor: MED_BLUE }),
      mkCell('Penerbit', { bold:true, shade: MED_BLUE, color: WHITE, borderColor: MED_BLUE }),
      mkCell('Tingkat', { bold:true, shade: MED_BLUE, color: WHITE, borderColor: MED_BLUE }),
      mkCell('Tahun', { bold:true, shade: MED_BLUE, color: WHITE, align: AlignmentType.CENTER, borderColor: MED_BLUE }),
    ]}),
    ...(sertRows.length > 0
      ? sertRows.map((r,i) => new TableRow({ children:[
          mkCell(r[0], { align: AlignmentType.CENTER, shade: i%2===0 ? WHITE : GRAY_BG }),
          mkCell(r[1], { shade: i%2===0 ? WHITE : GRAY_BG }),
          mkCell(r[2], { shade: i%2===0 ? WHITE : GRAY_BG }),
          mkCell(r[3], { shade: i%2===0 ? WHITE : GRAY_BG }),
          mkCell(r[4], { align: AlignmentType.CENTER, shade: i%2===0 ? WHITE : GRAY_BG }),
        ]}))
      : [new TableRow({ children:[ new TableCell({ columnSpan:5, children:[bodyPara('Tidak ada data sertifikat.')], borders: cellBorder() }) ]})]
    )
  ];
  const sertTable = new Table({ width:{ size:100, type:WidthType.PERCENTAGE }, layout:TableLayoutType.FIXED, rows: sertTableRows });

  // ── PORTOFOLIO TABLE ──────────────────────────────────────
  const portoTableRows = [
    new TableRow({ children:[
      mkCell('No.', { bold:true, shade: '16A34A', color: WHITE, align: AlignmentType.CENTER, borderColor:'16A34A' }),
      mkCell('Nama Proyek', { bold:true, shade: '16A34A', color: WHITE, borderColor:'16A34A' }),
      mkCell('Peran', { bold:true, shade: '16A34A', color: WHITE, borderColor:'16A34A' }),
      mkCell('Jenis', { bold:true, shade: '16A34A', color: WHITE, borderColor:'16A34A' }),
      mkCell('Nilai', { bold:true, shade: '16A34A', color: WHITE, align: AlignmentType.CENTER, borderColor:'16A34A' }),
      mkCell('Periode', { bold:true, shade: '16A34A', color: WHITE, align: AlignmentType.CENTER, borderColor:'16A34A' }),
      mkCell('Lokasi', { bold:true, shade: '16A34A', color: WHITE, borderColor:'16A34A' }),
    ]}),
    ...(portoRows.length > 0
      ? portoRows.map((r,i) => new TableRow({ children:[
          mkCell(r[0], { align: AlignmentType.CENTER, shade: i%2===0 ? WHITE : GRAY_BG }),
          mkCell(r[1], { shade: i%2===0 ? WHITE : GRAY_BG }),
          mkCell(r[2], { shade: i%2===0 ? WHITE : GRAY_BG }),
          mkCell(r[3], { shade: i%2===0 ? WHITE : GRAY_BG }),
          mkCell(r[4], { align: AlignmentType.CENTER, shade: i%2===0 ? WHITE : GRAY_BG }),
          mkCell(r[5], { align: AlignmentType.CENTER, shade: i%2===0 ? WHITE : GRAY_BG }),
          mkCell(r[6], { shade: i%2===0 ? WHITE : GRAY_BG }),
        ]}))
      : [new TableRow({ children:[ new TableCell({ columnSpan:7, children:[bodyPara('Tidak ada data portofolio.')], borders: cellBorder() }) ]})]
    )
  ];
  const portoTable = new Table({ width:{ size:100, type:WidthType.PERCENTAGE }, layout:TableLayoutType.FIXED, rows: portoTableRows });

  // ── KOMPETENSI TABLES ─────────────────────────────────────
  const mkKompTable = (items, color) => {
    if (!items || items.length === 0) return null;
    const rows = [];
    for (let i = 0; i < items.length; i += 2) {
      rows.push(new TableRow({ children:[
        mkCell(String(i+1)+'. '+items[i], { shade: i%4===0||i%4===1 ? WHITE : GRAY_BG }),
        items[i+1]
          ? mkCell(String(i+2)+'. '+items[i+1], { shade: i%4===0||i%4===1 ? WHITE : GRAY_BG })
          : new TableCell({ children:[new Paragraph('')], borders: cellBorder(), shading:{ fill: WHITE, type: ShadingType.CLEAR, color:'auto' } }),
      ]}));
    }
    return new Table({ width:{ size:100, type:WidthType.PERCENTAGE }, layout:TableLayoutType.FIXED, rows });
  };

  // ── REKOMENDASI ───────────────────────────────────────────
  const recParas = recItems.length > 0
    ? recItems.map((r,i) => bodyPara(`${i+1}. ${r}`))
    : [bodyPara('Tidak ada rekomendasi.')];

  // ── SIGNATURE ─────────────────────────────────────────────
  const signTable = new Table({
    width:{ size:100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    borders: { top:{style:BorderStyle.NONE}, bottom:{style:BorderStyle.NONE}, left:{style:BorderStyle.NONE}, right:{style:BorderStyle.NONE}, insideH:{style:BorderStyle.NONE}, insideV:{style:BorderStyle.NONE} },
    rows:[
      new TableRow({ children:[
        new TableCell({ children:[
          bodyPara('Penilai / Assessor', { align: AlignmentType.CENTER }),
          spacer(), spacer(), spacer(),
          bodyPara('(________________________)', { align: AlignmentType.CENTER }),
          bodyPara('Nama & Tanda Tangan', { align: AlignmentType.CENTER }),
        ], borders: cellBorder('FFFFFF'), margins:{ top:80, bottom:80, left:120, right:120 } }),
        new TableCell({ children:[
          bodyPara('Mengetahui / Menyetujui', { align: AlignmentType.CENTER }),
          spacer(), spacer(), spacer(),
          bodyPara('(________________________)', { align: AlignmentType.CENTER }),
          bodyPara('Pimpinan Instansi', { align: AlignmentType.CENTER }),
        ], borders: cellBorder('FFFFFF'), margins:{ top:80, bottom:80, left:120, right:120 } }),
      ]})
    ]
  });

  // ─────────────────────────────────────────────────────────
  // BUILD DOCUMENT
  // ─────────────────────────────────────────────────────────
  const kompSipilTable  = mkKompTable(kompChecked.sipil,      MED_BLUE);
  const kompArsiTable   = mkKompTable(kompChecked.arsitektur, '7C3AED');

  const children = [
    // KOP
    kopTable,
    spacer(),
    // DATA DIRI
    sectionTitle('A. DATA DIRI TENAGA AHLI'),
    dataDiriTable,
    spacer(),
    // SERTIFIKAT
    sectionTitle('B. SERTIFIKASI & SKK'),
    sertTable,
    spacer(),
    // PORTOFOLIO
    sectionTitle('C. PORTOFOLIO PROYEK'),
    portoTable,
    spacer(),
    // KOMPETENSI
    sectionTitle('D. KOMPETENSI TEKNIS YANG DIKUASAI'),
  ];

  if (kompSipilTable) {
    children.push(bodyPara('Bidang Teknik Sipil:', { bold:true }));
    children.push(kompSipilTable);
    children.push(spacer());
  }
  if (kompArsiTable) {
    children.push(bodyPara('Bidang Arsitektur:', { bold:true }));
    children.push(kompArsiTable);
    children.push(spacer());
  }
  if (!kompSipilTable && !kompArsiTable) {
    children.push(bodyPara('Tidak ada kompetensi yang dipilih.'));
    children.push(spacer());
  }

  // SKOR
  children.push(sectionTitle('E. HASIL PENILAIAN & SKOR'));
  children.push(skorTable);
  children.push(spacer());

  // REKOMENDASI
  children.push(sectionTitle('F. REKOMENDASI'));
  recParas.forEach(p => children.push(p));
  children.push(spacer());

  // TTANDATANGAN
  children.push(sectionTitle('G. PENGESAHAN'));
  children.push(bodyPara(`Ditetapkan di: ____________________     Tanggal: ${tglNow}`));
  children.push(spacer());
  children.push(signTable);

  const doc = new Document({
    creator: 'Instrumen Seleksi Tenaga Ahli Konstruksi',
    title:   `Hasil Penilaian – ${nama}`,
    description: 'Dokumen penilaian kelayakan tenaga ahli konstruksi',
    styles:{
      default:{
        document:{ run:{ font:'Calibri', size:20 } }
      }
    },
    sections:[{
      properties:{
        page:{
          margin:{ top:1134, bottom:1134, left:1134, right:1134 },
        }
      },
      children
    }]
  });

  const blob = await Packer.toBlob(doc);
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `Penilaian_Tenaga_Ahli_${nama.replace(/\s+/g,'_')}_${new Date().toISOString().slice(0,10)}.docx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ─── RESET ───────────────────────────────────────────────────
function resetForm() {
  if (!confirm('Reset semua data dan mulai penilaian baru?')) return;
  document.getElementById('nama').value      = '';
  document.getElementById('nik').value       = '';
  document.getElementById('bidang').value    = '';
  document.getElementById('jabatan').value   = '';
  document.getElementById('pendidikan').value= '';
  document.getElementById('tahun_kerja').value='';
  document.getElementById('institusi').value = '';
  document.getElementById('email').value     = '';
  uploadedFiles = [];
  renderFileList();
  document.getElementById('sertifikat-list').innerHTML = '';
  sertifikatCount = 0;
  addSertifikat();
  document.getElementById('portofolio-list').innerHTML = '';
  portofolioCount = 0;
  addPortofolio();
  document.querySelectorAll('.comp-check').forEach(chk => {
    chk.checked = false;
    chk.dispatchEvent(new Event('change'));
  });
  goTo(1);
}

// ─── SAVE TO DATABASE & SEND EMAIL ──────────────────────────
let lastScoreData = null;

async function savePenilaian() {
  const emailInput = document.getElementById('email-kirim');
  const email = emailInput ? emailInput.value.trim() : (document.getElementById('email')?.value?.trim() || '');

  if (!lastScoreData) {
    alert('Hitung skor terlebih dahulu sebelum menyimpan.');
    return;
  }
  if (!email || !email.includes('@')) {
    alert('Masukkan alamat email yang valid untuk mengirim hasil penilaian.');
    if (emailInput) emailInput.focus();
    return;
  }

  const payload = { ...lastScoreData, email };

  const saveBtn = document.getElementById('btn-simpan');
  if (saveBtn) { saveBtn.disabled = true; saveBtn.textContent = 'Menyimpan...'; }

  try {
    const res = await fetch(`${API_BASE}/api/simpan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (res.ok && data.success) {
      showSaveSuccess(email, data.emailPreview);
    } else {
      alert('Gagal menyimpan: ' + (data.error || 'Server error'));
    }
  } catch (err) {
    // If backend not reachable (static deployment), show offline notice
    console.warn('Backend tidak tersedia:', err);
    alert('ℹ️ Mode offline: data tidak dapat disimpan ke server.\nGunakan tombol Export Word untuk menyimpan hasil secara lokal.');
  } finally {
    if (saveBtn) { saveBtn.disabled = false; saveBtn.textContent = '💾 Simpan & Kirim Email'; }
  }
}

function showSaveSuccess(email, previewUrl) {
  const container = document.getElementById('save-status');
  if (!container) return;
  container.innerHTML = `
    <div class="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800">
      <div class="flex items-center gap-2 font-semibold mb-1">
        <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        Data berhasil disimpan!
      </div>
      <p class="text-sm">Hasil penilaian telah dikirim ke <strong>${email}</strong>.</p>
      ${previewUrl ? `<a href="${previewUrl}" target="_blank" class="text-xs text-green-700 underline mt-1 block">Lihat preview email (test) →</a>` : ''}
    </div>
  `;
}
