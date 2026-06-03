document.addEventListener('DOMContentLoaded', () => {
    // 1. Logic xử lý trang Tiểu Sử
    const timelineWrapper = document.getElementById('timeline-wrapper');
    
    // Chỉ chạy đoạn code này nếu đang ở trang tieu-su.html
    if (timelineWrapper) {
        fetch('./data/tieu-su.json')
            .then(response => response.json())
            .then(data => {
                // Đổ dữ liệu phần giới thiệu chung
                document.getElementById('bio-name').innerText = data["gioi-thieu"]["ho-ten"] + ` (${data["gioi-thieu"]["but-danh"]})`;
                document.getElementById('bio-years').innerText = data["gioi-thieu"]["cuoc-doi"];
                document.getElementById('bio-summary').innerText = data["gioi-thieu"]["tom-tat"];

                // Đổ dữ liệu chuỗi thời gian (Timeline)
                timelineWrapper.innerHTML = ''; // Xóa dữ liệu mẫu rỗng
                
                data["timeline"].forEach(item => {
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'timeline-item';
                    
                    itemDiv.innerHTML = `
                        <p class="timeline-year">${item["nam"]}</p>
                        <h3 class="timeline-title">${item["tieu-de"]}</h3>
                        <p class="timeline-content">${item["noi-dung"]}</p>
                    `;
                    
                    timelineWrapper.appendChild(itemDiv);
                });
            })
            .catch(error => console.error('Lỗi khi tải dữ liệu tiểu sử:', error));
    }

    // Bạn có thể viết thêm logic đổi màu active cho navbar hoặc các tính năng chung khác ở dưới này...
});