let bookModal;

document.addEventListener('DOMContentLoaded', function() {
    bookModal = new bootstrap.Modal(document.getElementById('bookModal'));
    loadBooks();
});

// 도서 목록 불러오기
async function loadBooks() {
    try {
        const response = await fetch('/api/books');
        const books = await response.json();

        const tbody = document.querySelector('#bookTable tbody');
        tbody.innerHTML = '';

        books.forEach(book => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.description || ''}</td>
                <td>${book.chulpan}</td>
                <td>${book.publisher}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="editBook(${book.id})">수정</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteBook(${book.id})">삭제</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('도서 목록을 불러오는데 실패했습니다:', error);
        alert('도서 목록을 불러오는데 실패했습니다.');
    }
}

// 모달을 통한 도서 추가
function showAddBookModal() {
    document.getElementById('modalTitle').textContent = '도서 추가';
    document.getElementById('bookForm').reset();
    document.getElementById('bookId').value = '';
    bookModal.show();
}

// 도서 수정
async function editBook(id) {
    try {
        const response = await fetch(`/api/books/${id}`);
        const book = await response.json();

        document.getElementById('modalTitle').textContent = '도서 수정';
        document.getElementById('bookId').value = book.id;
        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('description').value = book.description || '';
        document.getElementById('chulpan').value = book.chulpan;
        document.getElementById('publisher').value= book.publisher;

        bookModal.show();
    } catch (error) {
        console.error('도서 정보를 불러오는데 실패했습니다:', error);
        alert('도서 정보를 불러오는데 실패했습니다.');
    }
}

// 도서 저장 (추가 / 수정)
async function saveBook() {
    const id = document.getElementById('bookId').value;
    const book = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        description: document.getElementById('description').value,
        chulpan: parseInt( document.getElementById('chulpan').value),
        publisher: document.getElementById('publisher').value
    };

    try {
        const url = id ? `/api/books/${id}` : '/api/books';
        const method = id ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book)
        });

        if (!response.ok) {
            throw new Error('저장에 실패했습니다.');
        }

        bookModal.hide();
        loadBooks();
        alert('저장되었습니다.');
    } catch (error) {
        console.error('도서 저장에 실패했습니다:', error);
        alert('도서 저장에 실패했습니다.');
    }
}

// 도서 삭제
async function deleteBook(id) {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
        const response = await fetch(`/api/books/${id}`, { method: 'DELETE' });

        if (!response.ok) {
            throw new Error('삭제에 실패했습니다.');
        }

        loadBooks();
        alert('삭제되었습니다.');
    } catch (error) {
        console.error('도서 삭제에 실패했습니다:', error);
        alert('도서 삭제에 실패했습니다.');
    }
}
