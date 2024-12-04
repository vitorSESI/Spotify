document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-button');
    const usernameInput = document.getElementById('login-username');
    const passwordInput = document.getElementById('login-password');

    if (loginButton) {
        loginButton.addEventListener('click', (e) => {
            e.preventDefault();

            const username = usernameInput.value;
            const password = passwordInput.value;

            if (username && password) {
                localStorage.setItem('username', username);
                window.location.href = 'main.html';
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        });
    }

    const artistsData = [
        { name: 'Henrique & Juliano', image: 'https://i.ibb.co/7z7CZ69/artista-ze-neto.jpg' },
        { name: 'Jorge & Matheus', image: 'https://i.ibb.co/9cCPwTF/artista-jorge-mateus.jpg' },
        { name: 'Zé Neto & Cristiano', image: 'https://i.ibb.co/2WfJ8tD/artista-jorge-mateus.jpg' },
        { name: 'Gustavo Lima', image: 'https://i.ibb.co/XJP8Djh/artista-gustavo-limma.jpg' },
        { name: 'Luan Santana', image: 'https://i.ibb.co/MSbmBzH/artista-luan-santana.jpg' },
        { name: 'Matheus & Kauan', image: 'https://i.ibb.co/3CmctgD/artista-mateus-kauan.jpg' }
    ];

    const albunsData = [
        { name: 'White Noise (Sleep & Relaxation Sounds)', artist: 'Sleep John', image: 'https://i.ibb.co/WBgGp5q/album-white-noise.jpg' },
        { name: 'O Céu Explica Tudo (Ao Vivo)', artist: 'Sleep John', image: 'https://i.ibb.co/BfbL8VL/album-ceu-explica.jpg' },
        { name: 'Nada Como Um Dia Após o Outro', artist: 'Racionais', image: 'https://i.ibb.co/T8QJJ1W/album-vida-loka.jpg' },
        { name: 'HIT HARD AND SOFT', artist: 'Billie Eilish', image: 'https://i.ibb.co/G3kXhXc/album-hit-me.jpg' },
        { name: 'CAJU', artist: 'Liniker', image: 'https://i.ibb.co/B3b0N7H/album-caju.jpg' },
        { name: 'Excândalo Íntimo', artist: 'Luísa Sonza', image: 'https://i.ibb.co/VMnCmTX/album-escandalo.jpg' }
    ];

    const loadData = () => {
        const artistGrid = document.querySelector('.artists-grid');
        const albumsGrid = document.querySelector('.albums-grid');

        artistsData.forEach(artist => {
            const artistCard = document.createElement('div');
            artistCard.classList.add('artist-card');

            artistCard.innerHTML = `
                <img src="${artist.image}" alt="${artist.name}">
                <h3>${artist.name}</h3>
                <p>Artista</p>
            `;
            artistGrid.appendChild(artistCard);
        });

        albunsData.forEach(album => {
            const albumCard = document.createElement('div');
            albumCard.classList.add('album-card');

            albumCard.innerHTML = `
                <img src="${album.image}" alt="${album.name}">
                <p>${album.name}</p>
                <p>${album.artist}</p>
            `;
            albumsGrid.appendChild(albumCard);
        });
    };

    const loadPlaylists = () => {
        const playlists = JSON.parse(localStorage.getItem('playlists')) || [];
        const playlistsContainer = document.getElementById('playlists-container');
        playlistsContainer.innerHTML = ''; 

        playlists.forEach(playlist => {
            const playlistElement = document.createElement('p');
            playlistElement.textContent = playlist;
            playlistsContainer.appendChild(playlistElement);
        });
    };

    const createPlaylistButton = document.getElementById('create-playlist-button');
    const playlistNameInput = document.getElementById('playlist-name');

    if (createPlaylistButton) {
        createPlaylistButton.addEventListener('click', (e) => {
            e.preventDefault();

            const playlistName = playlistNameInput.value;
            if (playlistName) {
                const playlists = JSON.parse(localStorage.getItem('playlists')) || [];
                playlists.push(playlistName);
                localStorage.setItem('playlists', JSON.stringify(playlists));

                playlistNameInput.value = ''; 
                loadPlaylists(); 
            } else {
                alert('Por favor, insira um nome para a playlist.');
            }
        });
    }


    if (window.location.pathname.includes('main.html')) {
        const loggedInUser = localStorage.getItem('username');
        if (!loggedInUser) {
            window.location.href = 'index.html';
        } else {
            console.log(`Bem-vindo de volta, ${loggedInUser}!`);
            loadData();
            loadPlaylists(); 
        }
    }
});
