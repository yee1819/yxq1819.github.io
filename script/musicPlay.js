document.addEventListener('DOMContentLoaded', function () {
    const audioPlayer = document.getElementById('audioPlayer');
    const playlist = document.getElementById('playlist');
    let currentSongIndex = 0;

    // 从 JSON 文件中加载歌曲信息
    fetch('./json/songs.json')
        .then(response => response.json())
        .then(data => {
            var ans = 0;
            // 构建音乐列表
            data.forEach((song, index) => {
                
                const listItem = document.createElement('li');
                listItem.textContent = song.title + "     \t" + song.time;
                listItem.setAttribute('data-src', song.src);
                listItem.classList.add('song');
                if(ans==0){
                    listItem.classList.add('current-song');
                    ans=ans+1;
                }
                listItem.addEventListener('click', function () {
                    audioPlayer.src = this.getAttribute('data-src');
                    currentSongIndex = index;
                    updateCurrentSong();
                    audioPlayer.play();

                    var backgroundElement = document.querySelector('.background');
                    var musicImgElement = document.querySelector('.music_img img');
                    backgroundElement.style.backgroundImage = "url('"+song.img+"')";
                    musicImgElement.src = ""+song.img;

                });
                playlist.appendChild(listItem);
            });
        });

    // 更新当前歌曲样式
    function updateCurrentSong() {
        const songs = document.querySelectorAll('.song');
        songs.forEach((song, index) => {
            if (index === currentSongIndex) {
                song.classList.add('current-song');
            } else {
                song.classList.remove('current-song');
            }
        });
    }

    // 监听音乐播放完成事件，自动切换到下一首歌曲
    audioPlayer.addEventListener('ended', function () {
        const songs = document.querySelectorAll('.song');
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        audioPlayer.src = songs[currentSongIndex].getAttribute('data-src');
        updateCurrentSong();
        audioPlayer.play();
    });
});