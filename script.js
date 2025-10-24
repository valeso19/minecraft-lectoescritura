// Variables globales
let currentLevel = 1;
let currentActivity = 0;
let xp = 0;
let minerals = 0;
let unlockedAvatars = ['steve'];
let selectedAvatar = 'steve';
let progress = { level1: 0, level2: 0, level3: 0, level4: 0, level5: 0 };
let correctAnswers = 0;
let totalActivities = 5;

// Cargar progreso al iniciar
document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    setupEventListeners();
});

// Configurar event listeners
function setupEventListeners() {
    document.getElementById('start-btn').addEventListener('click', startGame);
    document.getElementById('progress-btn').addEventListener('click', showProgress);
    document.getElementById('profile-btn').addEventListener('click', showProfile);
    document.getElementById('repeat-btn').addEventListener('click', repeatLevel);
    document.getElementById('speak-btn').addEventListener('click', speakActivity);
    document.getElementById('home-btn').addEventListener('click', goHome);
    document.getElementById('back-btn').addEventListener('click', backToGame);
    document.getElementById('profile-back-btn').addEventListener('click', backToGame);
    
    // Selección de avatares
    document.querySelectorAll('.avatar').forEach(avatar => {
        avatar.addEventListener('click', function() {
            document.querySelectorAll('.avatar').forEach(a => a.classList.remove('selected'));
            this.classList.add('selected');
            selectedAvatar = this.dataset.avatar;
        });
    });
}

// Cargar progreso desde LocalStorage
function loadProgress() {
    const saved = localStorage.getItem('minecraftLiteracyProgress');
    if (saved) {
        const data = JSON.parse(saved);
        xp = data.xp || 0;
        minerals = data.minerals || 0;
        unlockedAvatars = data.unlockedAvatars || ['steve'];
        selectedAvatar = data.selectedAvatar || 'steve';
        progress = data.progress || progress;
        currentLevel = data.currentLevel || 1;
    }
    updateStats();
}

// Guardar progreso
function saveProgress() {
    localStorage.setItem('minecraftLiteracyProgress', JSON.stringify({
        xp, minerals, unlockedAvatars, selectedAvatar, progress, currentLevel
    }));
}

// Actualizar estadísticas
function updateStats() {
    document.getElementById('xp-display').textContent = xp;
    document.getElementById('minerals-display').textContent = minerals;
}

// Iniciar juego
function startGame() {
    currentLevel = parseInt(document.getElementById('level-select').value);
    currentActivity = 0;
    correctAnswers = 0;
    document.getElementById('start-screen').classList.remove('active');
    document.getElementById('game-screen').classList.add('active');
    updateLevelInfo();
    loadActivity();
}

// Actualizar información del nivel
function updateLevelInfo() {
    const levelTitles = {
        1: 'Nivel 1: Sonidos y Letras',
        2: 'Nivel 2: Formación de Sílabas',
        3: 'Nivel 3: Palabras Completas',
        4: 'Nivel 4: Oraciones Cortas',
        5: 'Nivel 5: Textos Narrativos'
    };
    document.getElementById('level-title').textContent = levelTitles[currentLevel];
    document.getElementById('activity-number').textContent = `Actividad ${currentActivity + 1} de ${totalActivities}`;
}

// Cargar actividad
function loadActivity() {
    const activities = getActivities(currentLevel);
    if (currentActivity >= activities.length) {
        finishLevel();
        return;
    }
    const activity = activities[currentActivity];
    document.getElementById('activity').innerHTML = activity.html;
    document.getElementById('feedback').innerHTML = '';
    activity.init();
    updateLevelInfo();
}

// Obtener actividades por nivel
function getActivities(level) {
    switch (level) {
        case 1:
            return [
                {
                    html: '<h2>¿Con qué letra empieza "CASA"?</h2><button data-answer="c">C</button><button data-answer="p">P</button><button data-answer="m">M</button>',
                    init: () => {
                        document.querySelectorAll('button[data-answer]').forEach(btn => {
                            btn.addEventListener('click', () => checkAnswer(btn.dataset.answer === 'c'));
                        });
                    }
                },
                {
                    html: '<h2>¿Con qué letra empieza "PERRO"?</h2><button data-answer="p">P</button><button data-answer="t">T</button><button data-answer="r">R</button>',
                    init: () => {
                        document.querySelectorAll('button[data-answer]').forEach(btn => {
                            btn.addEventListener('click', () => checkAnswer(btn.dataset.answer === 'p'));
                        });
                    }
                },
                {
                    html: '<h2>¿Con qué letra empieza "MESA"?</h2><button data-answer="m">M</button><button data-answer="n">N</button><button data-answer="s">S</button>',
                    init: () => {
                        document.querySelectorAll('button[data-answer]').forEach(btn => {
                            btn.addEventListener('click', () => checkAnswer(btn.dataset.answer === 'm'));
                        });
                    }
                },
                {
                    html: '<h2>¿Con qué letra empieza "GATO"?</h2><button data-answer="g">G</button><button data-answer="c">C</button><button data-answer="j">J</button>',
                    init: () => {
                        document.querySelectorAll('button[data-answer]').forEach(btn => {
                            btn.addEventListener('click', () => checkAnswer(btn.dataset.answer === 'g'));
                        });
                    }
                },
                {
                    html: '<h2>¿Con qué letra empieza "LUNA"?</h2><button data-answer="l">L</button><button data-answer="n">N</button><button data-answer="u">U</button>',
                    init: () => {
                        document.querySelectorAll('button[data-answer]').forEach(btn => {
                            btn.addEventListener('click', () => checkAnswer(btn.dataset.answer === 'l'));
                        });
                    }
                }
            ];
        case 2:
            return [
                {
                    html: '<h2>¿Qué palabra se forma con "CA" + "SA"?</h2><button data-answer="casa">CASA</button><button data-answer="cama">CAMA</button>',
                    init: () => {
                        document.querySelectorAll('button[data-answer]').forEach(btn => {
                            btn.addEventListener('click', () => checkAnswer(btn.dataset.answer === 'casa'));
                        });
                    }
                },
                {
                    html: '<h2>¿Qué palabra se forma con "PE" + "RRO"?</h2><button data-answer="perro">PERRO</button><button data-answer="pero">PERO</button>',
                    init: () => {
                        document.querySelectorAll('button[data-answer]').forEach(btn => {
                            btn.addEventListener('click', () => checkAnswer(btn.dataset.answer === 'perro'));
                        });
                    }
                },
                {
                    html: '<h2>¿Qué palabra se forma con "SO" + "L"?</h2><button data-answer="sol">SOL</button><button data-answer="sal">SAL</button>',
                    init: () => {
                        document.querySelectorAll('button[data-answer]').forEach(btn => {
                            btn.addEventListener('click', () => checkAnswer(btn.dataset.answer === 'sol'));
                        });
                    }
                },
                {
                    html: '<h2>¿Qué palabra se forma con "PA" + "TO"?</h2><button data-answer="pato">PATO</button><button data-answer="pata">PATA</button>',
                    init: () => {
                        document.querySelectorAll('button[data-answer]').forEach(btn => {
                            btn.addEventListener('click', () => checkAnswer(btn.dataset.answer === 'pato'));
                        });
                    }
                },
                {
                    html: '<h2>¿Qué palabra se forma con "MA" + "NO"?</h2><button data-answer="mano">MANO</button><button data-answer="mono">MONO</button>',
                    init: () => {
                        document.querySelectorAll('button[data-answer]').forEach(btn => {
                            btn.addEventListener('click', () => checkAnswer(btn.dataset.answer === 'mano'));
                        });
                    }
                }
            ];
        case 3:
            return [
                {
                    html: '<h2>Lee: "GATO"</h2><p>¿Qué imagen corresponde?</p><img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0d6200af-ecc4-4a16-b59c-2ab40ebe6b85.png" alt="Ilustración de un gato naranja sentado con cola enrollada y orejas puntiagudas"><button data-answer="true">Esta imagen</button>',
                    init: () => {
                        document.querySelector('button').addEventListener('click', () => checkAnswer(true));
                    }
                },
                {
                    html: '<h2>Lee: "ÁRBOL"</h2><p>¿Qué imagen corresponde?</p><img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/6865e5ab-4829-4435-a71d-f67ef443e7f7.png" alt="Dibujo de un árbol verde con tronco marrón y copa frondosa"><button data-answer="true">Esta imagen</button>',
                    init: () => {
                        document.querySelector('button').addEventListener('click', () => checkAnswer(true));
                    }
                },
                {
                    html: '<h2>Lee: "FLOR"</h2><p>¿Qué imagen corresponde?</p><img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/72b41741-0b50-4b53-85f1-f74c11b98e91.png" alt="Imagen de una flor roja con pétalos abiertos y tallo verde con hojas"><button data-answer="true">Esta imagen</button>',
                    init: () => {
                        document.querySelector('button').addEventListener('click', () => checkAnswer(true));
                    }
                },
                {
                    html: '<h2>Lee: "LIBRO"</h2><p>¿Qué imagen corresponde?</p><img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4ec9c908-8dad-4208-a64f-152b2ea934ee.png" alt="Representación de un libro abierto con páginas blancas y cubierta azul"><button data-answer="true">Esta imagen</button>',
                    init: () => {
                        document.querySelector('button').addEventListener('click', () => checkAnswer(true));
                    }
                },
                {
                    html: '<h2>Lee: "ESTRELLA"</h2><p>¿Qué imagen corresponde?</p><img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/45d30089-fd51-45e0-8ed6-48ad3dce3150.png" alt="Dibujo de una estrella amarilla brillante de cinco puntas sobre fondo oscuro"><button data-answer="true">Esta imagen</button>',
                    init: () => {
                        document.querySelector('button').addEventListener('click', () => checkAnswer(true));
                    }
                }
            ];
        case 4:
            return [
                {
                    html: '<h2>Lee: "El gato come"</h2><p>¿Quién come?</p><button data-answer="gato">El gato</button><button data-answer="perro">El perro</button>',
                    init: () => {
                        document.querySelectorAll('button[data-answer]').forEach(btn => {
                            btn.addEventListener('click', () => checkAnswer(btn.dataset.answer === 'gato'));
                        });
                    }
                },
                {
                    html: '<h2>Lee: "La niña juega"</h2><p>¿Qué hace la niña?</p><button data-answer="juega">Juega</button><button data-answer="corre">Corre</button>',
                    init: () => {
                        document.querySelectorAll('button[data-answer]').forEach(btn => {
                            btn.addEventListener('click', () => checkAnswer(btn.dataset.answer === 'juega'));
                        });
                    }
                },
                {
                    html: '<h2>Lee: "El sol brilla"</h2><p>¿Qué hace el sol?</p><button data-answer="brilla">Brilla</button><button data-answer="duerme">Duerme</button>',
                    init: () => {
                        document.querySelectorAll('button[data-answer]').forEach(btn => {
                            btn.addEventListener('click', () => checkAnswer(btn.dataset.answer === 'brilla'));
                        });
                    }
                },
                {
                    html: '<h2>Completa: "El ___ vuela"</h2><button data-answer="pajaro">pájaro</button><button data-answer="pez">pez</button>',
                    init: () => {
                        document.querySelectorAll('button[data-answer]').forEach(btn => {
                            btn.addEventListener('click', () => checkAnswer(btn.dataset.answer === 'pajaro'));
                        });
                    }
                },
                {
                    html: '<h2>Completa: "La ___ es roja"</h2><button data-answer="manzana">manzana</button><button data-answer="naranja">naranja</button>',
                    init: () => {
                        document.querySelectorAll('button[data-answer]').forEach(btn => {
                            btn.addEventListener('click', () => checkAnswer(btn.dataset.answer === 'manzana'));
                        });
                    }
                }
            ];
        case 5:
            return [
                {
                    html: '<h2>Lee la historia:</h2><p>"Steve caminó por el bosque. Encontró un diamante brillante. Estaba muy feliz."</p><p>¿Qué encontró Steve?</p><button data-answer="diamante">Un diamante</button><button data-answer="oro">Oro</button>',
                    init: () => {
                        document.querySelectorAll('button[data-answer]').forEach(btn => {
                            btn.addEventListener('click', () => checkAnswer(btn.dataset.answer === 'diamante'));
                        });
                    }
                },
                {
                    html: '<h2>Lee la historia:</h2><p>"Alex construyó una casa grande. Puso ventanas y una puerta. La casa quedó hermosa."</p><p>¿Qué construyó Alex?</p><button data-answer="casa">Una casa</button><button data-answer="puente">Un puente</button>',
                    init: () => {
                        document.querySelectorAll('button[data-answer]').forEach(btn => {
                            btn.addEventListener('click', () => checkAnswer(btn.dataset.answer === 'casa'));
                        });
                    }
                },
                {
                    html: '<h2>Lee la historia:</h2><p>"El creeper caminaba de noche. Vio una luz y se acercó. Era una antorcha."</p><p>¿Qué era la luz?</p><button data-answer="antorcha">Una antorcha</button><button data-answer="estrella">Una estrella</button>',
                    init: () => {
                        document.querySelectorAll('button[data-answer]').forEach(btn => {
                            btn.addEventListener('click', () => checkAnswer(btn.dataset.answer === 'antorcha'));
                        });
                    }
                },
                {
                    html: '<h2>Lee la historia:</h2><p>"En el río había peces. Steve pescó uno grande. Lo cocinó en su fogata."</p><p>¿Dónde había peces?</p><button data-answer="rio">En el río</button><button data-answer="mar">En el mar</button>',
                    init: () => {
                        document.querySelectorAll('button[data-answer]').forEach(btn => {
                            btn.addEventListener('click', () => checkAnswer(btn.dataset.answer === 'rio'));
                        });
                    }
                },
                {
                    html: '<h2>Lee la historia:</h2><p>"Alex plantó trigo. Esperó varios días. El trigo creció y lo cosechó."</p><p>¿Qué plantó Alex?</p><button data-answer="trigo">Trigo</button><button data-answer="flores">Flores</button>',
                    init: () => {
                        document.querySelectorAll('button[data-answer]').forEach(btn => {
                            btn.addEventListener('click', () => checkAnswer(btn.dataset.answer === 'trigo'));
                        });
                    }
                }
            ];
    }
}

// Verificar respuesta
function checkAnswer(isCorrect) {
    const feedback = document.getElementById('feedback');
    if (isCorrect) {
        correctAnswers++;
        xp += 10;
        minerals += 1;
        feedback.innerHTML = '¡Correcto! +10 XP +1 Mineral';
        feedback.className = 'correct';
        playSound(true);
        updateStats();
        
        setTimeout(() => {
            currentActivity++;
            loadActivity();
        }, 2000);
    } else {
        feedback.innerHTML = '¡Inténtalo de nuevo!';
        feedback.className = 'wrong';
        playSound(false);
    }
}

// Finalizar nivel
function finishLevel() {
    const percentage = correctAnswers / totalActivities;
    progress[`level${currentLevel}`] = percentage;
    
    if (percentage >= 0.7) {
        document.getElementById('activity').innerHTML = `
            <h2>¡Nivel Completado!</h2>
            <p>Acertaste ${correctAnswers} de ${totalActivities}</p>
            <p>Has ganado ${correctAnswers * 10} XP y ${correctAnswers} Minerales</p>
            <button id="next-level-btn" class="main-button">Siguiente Nivel</button>
        `;
        document.getElementById('next-level-btn').addEventListener('click', () => {
            currentLevel++;
            if (currentLevel > 5) currentLevel = 5;
            currentActivity = 0;
            correctAnswers = 0;
            loadActivity();
        });
    } else {
        document.getElementById('activity').innerHTML = `
            <h2>¡Intenta de nuevo!</h2>
            <p>Acertaste ${correctAnswers} de ${totalActivities}</p>
            <p>Necesitas al menos 70% para avanzar</p>
            <button id="retry-btn" class="main-button">Reintentar Nivel</button>
        `;
        document.getElementById('retry-btn').addEventListener('click', () => {
            currentActivity = 0;
            correctAnswers = 0;
            loadActivity();
        });
    }
    
    saveProgress();
}

// Reproducir sonido
function playSound(correct) {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    
    if (correct) {
        oscillator.frequency.value = 523.25;
        oscillator.type = 'sine';
    } else {
        oscillator.frequency.value = 196;
        oscillator.type = 'sawtooth';
    }
    
    gainNode.gain.setValueAtTime(0.3, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.5);
    
    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.5);
}

// Leer en voz alta
function speakActivity() {
    const activityText = document.getElementById('activity').textContent;
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(activityText);
        utterance.lang = 'es-ES';
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
    }
}

// Mostrar progreso
function showProgress() {
    document.getElementById('game-screen').classList.remove('active');
    document.getElementById('progress-screen').classList.add('active');
    
    let html = '<h3>Niveles Completados:</h3>';
    for (let i = 1; i <= 5; i++) {
        const percentage = Math.round(progress[`level${i}`] * 100);
        html += `<p>Nivel ${i}: ${percentage}%</p>`;
    }
    document.getElementById('progress-content').innerHTML = html;
}

// Mostrar perfil
function showProfile() {
    document.getElementById('game-screen').classList.remove('active');
    document.getElementById('profile-screen').classList.add('active');
    
    document.getElementById('profile-avatar-name').textContent = selectedAvatar;
    document.getElementById('profile-xp').textContent = xp;
    document.getElementById('profile-minerals').textContent = minerals;
    document.getElementById('profile-level').textContent = currentLevel;
    
    const avatarDiv = document.querySelector('.profile-avatar');
    avatarDiv.className = `profile-avatar avatar-${selectedAvatar}`;
}

// Repetir nivel
function repeatLevel() {
    currentActivity = 0;
    correctAnswers = 0;
    loadActivity();
}

// Volver al juego
function backToGame() {
    document.getElementById('progress-screen').classList.remove('active');
    document.getElementById('profile-screen').classList.remove('active');
    document.getElementById('game-screen').classList.add('active');
}

// Volver a inicio
function goHome() {
    document.getElementById('game-screen').classList.remove('active');
    document.getElementById('start-screen').classList.add('active');
    saveProgress();
}
