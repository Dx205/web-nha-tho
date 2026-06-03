document.addEventListener('DOMContentLoaded', () => {
    // Lấy các phần tử cần thiết
    const modal = document.getElementById("image-modal");
    if (!modal) return; // Nếu không ở trang thư viện ảnh thì bỏ qua

    const modalImg = document.getElementById("expanded-img");
    const captionText = document.getElementById("image-caption");
    const closeBtn = document.querySelector(".close-modal");
    
    // Lấy tất cả các ảnh trong lưới
    const images = document.querySelectorAll(".gallery-img");

    // Gắn sự kiện click cho từng ảnh nhỏ
    images.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = "block"; // Hiện khung nền đen
            modalImg.src = this.src;       // Copy nguồn ảnh nhỏ sang ảnh to
            captionText.innerHTML = this.alt; // Lấy dòng chú thích (alt)
        });
    });

    // Khi click vào dấu X thì đóng ảnh
    closeBtn.addEventListener('click', () => {
        modal.style.display = "none";
    });

    // Bấm ra ngoài khoảng đen cũng đóng ảnh cho tiện
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});