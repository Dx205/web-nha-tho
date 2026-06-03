document.addEventListener('DOMContentLoaded', () => {
    const poemGrid = document.getElementById('poem-grid');
    if (!poemGrid) return; 

    // Xác định đường dẫn an toàn
    const fetchPath = window.location.pathname.includes('/poems/') 
        ? '../data/tho.json' 
        : './data/tho.json';

    fetch(fetchPath)
        .then(response => response.json())
        .then(data => {
            const danhSachTho = data["danh-sach-tho"];
            poemGrid.innerHTML = '';

            danhSachTho.forEach(baiTho => {
                const theBaiTho = document.createElement('div');
                theBaiTho.className = "poem-card"; 
                
                // Xử lý nội dung thơ: Nối các dòng trong mảng lại bằng thẻ <br> để xuống dòng
                const noiDungThoHTML = baiTho["noi-dung"].join('<br>');
                
                theBaiTho.innerHTML = `
                    <h3 class="poem-title">${baiTho["tieu-de"]}</h3>
                    <p class="poem-date">Năm sáng tác: ${baiTho["nam-sang-tac"]}</p>
                    <p class="poem-desc">${baiTho["mo-ta-ngan"]}</p>
                    
                    <div class="poem-full-content" style="display: none; margin-top: 15px; padding-top: 15px; border-top: 1px dashed #ccc; font-style: italic; line-height: 1.8; color: #2c3e50;">
                        ${noiDungThoHTML}
                    </div>
                    
                    <a href="#" class="read-more-btn">Đọc tiếp &rarr;</a>
                `;
                
                // Lấy ra nút bấm và phần nội dung của chính thẻ bài thơ này
                const btnDocTiep = theBaiTho.querySelector('.read-more-btn');
                const phanNoiDung = theBaiTho.querySelector('.poem-full-content');
                const phanMoTa = theBaiTho.querySelector('.poem-desc');

                // Thêm sự kiện khi click vào nút "Đọc tiếp"
                btnDocTiep.addEventListener('click', (e) => {
                    e.preventDefault(); // Ngăn trình duyệt bị giật lên đầu trang khi bấm thẻ <a>

                    // Nếu thơ đang ẩn thì hiện ra, và ngược lại
                    if (phanNoiDung.style.display === 'none') {
                        phanNoiDung.style.display = 'block';
                        phanMoTa.style.display = 'none'; // Ẩn mô tả ngắn đi cho đỡ rối
                        btnDocTiep.innerHTML = '&larr; Thu gọn';
                        btnDocTiep.style.backgroundColor = '#e74c3c'; // Đổi màu nút cho sinh động
                        btnDocTiep.style.borderColor = '#e74c3c';
                        btnDocTiep.style.color = '#fff';
                    } else {
                        phanNoiDung.style.display = 'none';
                        phanMoTa.style.display = 'block'; // Hiện lại mô tả ngắn
                        btnDocTiep.innerHTML = 'Đọc tiếp &rarr;';
                        btnDocTiep.style.backgroundColor = ''; // Trả về màu gốc (CSS lo)
                        btnDocTiep.style.borderColor = '';
                        btnDocTiep.style.color = '';
                    }
                });

                poemGrid.appendChild(theBaiTho);
            });
        })
        .catch(error => console.error('Lỗi khi tải dữ liệu thơ:', error));
});