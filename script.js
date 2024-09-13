const hiraganaLetters = ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ', 'さ', 'し', 'す', 'せ', 'そ', 'た', 'ち', 'つ', 'て', 'と', 'な', 'に', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ', 'ま', 'み', 'む', 'め', 'も', 'や', 'ゆ', 'よ', 'ら', 'り', 'る', 'れ', 'ろ', 'わ', 'を', 'ん'];
const katakanaLetters = ['ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ', 'サ', 'シ', 'ス', 'セ', 'ソ', 'タ', 'チ', 'ツ', 'テ', 'ト', 'ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'ヒ', 'フ', 'ヘ', 'ホ', 'マ', 'ミ', 'ム', 'メ', 'モ', 'ヤ', 'ユ', 'ヨ', 'ラ', 'リ', 'ル', 'レ', 'ロ', 'ワ', 'ヲ', 'ン'];

const romajiMap = {
    'あ': 'a',
    'い': 'i',
    'う': 'u',
    'え': 'e',
    'お': 'o',
    'か': 'ka',
    'き': 'ki',
    'く': 'ku',
    'け': 'ke',
    'こ': 'ko',
    'さ': 'sa',
    'し': 'shi',
    'す': 'su',
    'せ': 'se',
    'そ': 'so',
    'た': 'ta',
    'ち': 'chi',
    'つ': 'tsu',
    'て': 'te',
    'と': 'to',
    'な': 'na',
    'に': 'ni',
    'ぬ': 'nu',
    'ね': 'ne',
    'の': 'no',
    'は': 'ha',
    'ひ': 'hi',
    'ふ': 'fu',
    'へ': 'he',
    'ほ': 'ho',
    'ま': 'ma',
    'み': 'mi',
    'む': 'mu',
    'め': 'me',
    'も': 'mo',
    'や': 'ya',
    'ゆ': 'yu',
    'よ': 'yo',
    'ら': 'ra',
    'り': 'ri',
    'る': 'ru',
    'れ': 're',
    'ろ': 'ro',
    'わ': 'wa',
    'を': 'wo',
    'ん': 'n',
    'ア': 'a',
    'イ': 'i',
    'ウ': 'u',
    'エ': 'e',
    'オ': 'o',
    'カ': 'ka',
    'キ': 'ki',
    'ク': 'ku',
    'ケ': 'ke',
    'コ': 'ko',
    'サ': 'sa',
    'シ': 'shi',
    'ス': 'su',
    'セ': 'se',
    'ソ': 'so',
    'タ': 'ta',
    'チ': 'chi',
    'ツ': 'tsu',
    'テ': 'te',
    'ト': 'to',
    'ナ': 'na',
    'ニ': 'ni',
    'ヌ': 'nu',
    'ネ': 'ne',
    'ノ': 'no',
    'ハ': 'ha',
    'ヒ': 'hi',
    'フ': 'fu',
    'ヘ': 'he',
    'ホ': 'ho',
    'マ': 'ma',
    'ミ': 'mi',
    'ム': 'mu',
    'メ': 'me',
    'モ': 'mo',
    'ヤ': 'ya',
    'ユ': 'yu',
    'ヨ': 'yo',
    'ラ': 'ra',
    'リ': 'ri',
    'ル': 'ru',
    'レ': 're',
    'ロ': 'ro',
    'ワ': 'wa',
    'ヲ': 'wo',
    'ン': 'n'
};

let currentLetter = '';
let isComposing = false;
let isKatakana = false;
let isAudioEnabled = true;
let currentAudio = null;

function getRandomLetter() {
    const letters = isKatakana ? katakanaLetters : hiraganaLetters;
    const randomIndex = Math.floor(Math.random() * letters.length);
    return letters[randomIndex];
}

function updateLetter() {
    const letterElement = document.getElementById('hiraganaLetter');
    letterElement.style.opacity = '0';
    letterElement.style.transform = 'scale(0)';
    setTimeout(() => {
        currentLetter = getRandomLetter();
        letterElement.innerText = currentLetter;
        letterElement.style.opacity = '1';
        letterElement.style.transform = 'scale(1)';
        playAudio();
    }, 500);
}

function playAudio() {
    if (isAudioEnabled) {
        const audio = new Audio(`audio/${romajiMap[currentLetter]}.mp3`);
        currentAudio = audio;
        audio.play();
    }
}

function toggleAudio() {
    isAudioEnabled = !isAudioEnabled;
    document.getElementById('toggleAudioButton').innerText = isAudioEnabled ? 'Disable Audio' : 'Enable Audio';
}

document.getElementById('startButton').addEventListener('click', function () {
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('switchButton').style.display = 'block';
    document.getElementById('toggleAudioButton').style.display = 'block';
    const modalSquare = document.getElementById('modalSquare');
    const hiddenInput = document.getElementById('hiddenInput');
    modalSquare.classList.add('show');
    hiddenInput.classList.add('show');
    updateLetter();
    hiddenInput.focus();
});

document.getElementById('switchButton').addEventListener('click', function () {
    isKatakana = !isKatakana;
    document.getElementById('switchButton').innerText = isKatakana ? 'Switch to Hiragana' : 'Switch to Katakana';
    updateLetter();
});

document.getElementById('toggleAudioButton').addEventListener('click', toggleAudio);

function checkInput() {
    const inputValue = document.getElementById('hiddenInput').value.trim();
    const letterElement = document.getElementById('hiraganaLetter');
    const modalSquare = document.getElementById('modalSquare');

    if (inputValue === currentLetter) {
        updateLetter();
        document.getElementById('hiddenInput').value = '';
    } else if (inputValue !== '') {
        modalSquare.classList.add('shake');
        modalSquare.classList.add('red-tint');
        setTimeout(() => {
            modalSquare.classList.remove('shake');
            modalSquare.classList.remove('red-tint');
        }, 500);
        document.getElementById('hiddenInput').value = '';
        if (isAudioEnabled && currentAudio) {
            currentAudio.currentTime = 0;
            currentAudio.play();
        }
    }
}

// document.getElementById('hiddenInput').addEventListener('input', function () {
//     if (!isComposing) {
//         // Handle input
//     }
// });

document.getElementById('hiddenInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        checkInput();
    }
});

document.getElementById('hiddenInput').addEventListener('compositionstart', function () {
    isComposing = true;
});

document.getElementById('hiddenInput').addEventListener('compositionend', function () {
    isComposing = false;
    checkInput();
});

window.addEventListener('click', function (event) {
    const inputElement = document.getElementById('hiddenInput');
    if (event.target !== inputElement && !inputElement.contains(event.target)) {
        inputElement.focus(); // Keep input focus to continue receiving input
    }
});