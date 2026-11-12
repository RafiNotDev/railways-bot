const handler = m => m;

handler.before = function (m) {
    const user = global.db.data.users[m.sender];
    const levels = [
        { min: 0, max: 2, role: 'Taman Kanak Kanak' },
        { min: 2, max: 4, role: 'Sekolah Dasar Kelas 1' },
        { min: 4, max: 6, role: 'Sekolah Dasar Kelas 2' },
        { min: 6, max: 8, role: 'Sekolah Dasar Kelas 3' },
        { min: 8, max: 10, role: 'Sekolah Dasar Kelas 4' },
        { min: 10, max: 20, role: 'Sekolah Dasar Kelas 5' },
        { min: 20, max: 30, role: 'Sekolah Dasar Kelas 6' },
        { min: 30, max: 40, role: 'Sekolah Menengah Pertama Kelas 7' },
        { min: 40, max: 50, role: 'Sekolah Menengah Pertama Kelas 8' },
        { min: 50, max: 60, role: 'Sekolah Menengah Pertama Kelas 9' },
        { min: 60, max: 70, role: 'Sekolah Menengah Ke Atas Kelas 10' },
        { min: 70, max: 80, role: 'Sekolah Menengah Ke Atas Kelas 11' },
        { min: 80, max: 90, role: 'Sekolah Menengah Ke Atas Kelas 12' },
        { min: 90, max: 100, role: 'Kuliah S1 Jurusan Ilmu Teknologi' },
        { min: 100, max: 110, role: 'Kuliah S1 Jurusan Ilmu Kedokteran' },
        { min: 110, max: 120, role: 'Kuliah S1 Jurusan Ilmu Kehutanan' },
        { min: 120, max: 130, role: 'Kuliah S1 Jurusan Ilmu Kelautan' },
        { min: 130, max: 140, role: 'Kuliah S1 Jurusan Ilmu Kewibuan' },
        { min: 140, max: 150, role: 'Kuliah S1 Jurusan Ilmu Kultivasian' },
        { min: 150, max: 160, role: 'Kuliah S1 Jurusan Ilmu Sulapan' },
        { min: 160, max: 170, role: 'Kuliah S1 Jurusan Ilmu Hipnotisan' },
        { min: 170, max: 180, role: 'Kuliah S1 Jurusan Ilmu Pencopetan' },
        { min: 180, max: 190, role: 'Kuliah S1 Jurusan Ilmu Mastering' },
        { min: 190, max: 200, role: 'Kuliah S2 Jurusan Ilmu Teknologi' },
        { min: 200, max: 210, role: 'Kuliah S2 Jurusan Ilmu Kedokteran' },
        { min: 210, max: 220, role: 'Kuliah S2 Jurusan Ilmu Kehutanan' },
        { min: 220, max: 230, role: 'Kuliah S2 Jurusan Ilmu Kelautan' },
        { min: 230, max: 240, role: 'Kuliah S2 Jurusan Ilmu Kewibuan' },
        { min: 240, max: 250, role: 'Kuliah S2 Jurusan Ilmu Kultivasian' },
        { min: 250, max: 260, role: 'Kuliah S2 Jurusan Ilmu Sulapan' },
        { min: 260, max: 270, role: 'Kuliah S2 Jurusan Ilmu Hipnotisan' },
        { min: 270, max: 280, role: 'Kuliah S2 Jurusan Ilmu Pencopetan' },
        { min: 280, max: 290, role: 'Kuliah S2 Jurusan Ilmu Mastering' },
        { min: 290, max: 300, role: 'Kuliah S2 Jurusan Ilmu Pencabulan' },
        { min: 300, max: 310, role: 'Kuliah S2 Jurusan Ilmu Hukum' },
        { min: 310, max: 320, role: '1st Lt. Grade 1 ♢♢¹' },
        { min: 320, max: 330, role: '1st Lt. Grade 2 ♢♢²' },
        { min: 330, max: 340, role: '1st Lt. Grade 3 ♢♢³' },
        { min: 340, max: 350, role: '1st Lt. Grade 4 ♢♢⁴' },
        { min: 350, max: 360, role: '1st Lt. Grade 5 ♢♢⁵' },
        { min: 360, max: 370, role: 'Major Grade 1 ✷¹' },
        { min: 370, max: 380, role: 'Major Grade 2 ✷²' },
        { min: 380, max: 390, role: 'Major Grade 3 ✷³' },
        { min: 390, max: 400, role: 'Major Grade 4 ✷⁴' },
        { min: 400, max: 410, role: 'Major Grade 5 ✷⁵' },
        { min: 410, max: 420, role: 'Colonel Grade 1 ✷✷¹' },
        { min: 420, max: 430, role: 'Colonel Grade 2 ✷✷²' },
        { min: 430, max: 440, role: 'Colonel Grade 3 ✷✷³' },
        { min: 440, max: 450, role: 'Colonel Grade 4 ✷✷⁴' },
        { min: 450, max: 460, role: 'Colonel Grade 5 ✷✷⁵' },
        { min: 460, max: 470, role: 'Brigadier Early ✰' },
        { min: 470, max: 480, role: 'Brigadier Silver ✩' },
        { min: 480, max: 490, role: 'Brigadier Gold ✯' },
        { min: 490, max: 500, role: 'Brigadier Platinum ✬' },
        { min: 500, max: 600, role: 'Brigadier Diamond ✪' },
        { min: 600, max: 700, role: 'Legendary 忍' },
        { min: 700, max: 800, role: 'Legendary 忍忍' },
        { min: 800, max: 900, role: 'Legendary 忍忍忍' },
        { min: 900, max: 1000, role: 'Legendary 忍忍忍忍' },
        { min: 1000, max: Infinity, role: 'Master 숒 × Legendary 숒' }
    ];

    const userLevel = user.level;
    const userRole = levels.find(level => userLevel >= level.min && userLevel <= level.max).role;

    user.role = userRole;
    return true;
};

export default handler;
